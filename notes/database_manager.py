"""
Database Manager for CIRF Research Project
Handles database connection, initialization, and basic operations
"""

import sqlite3
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from pathlib import Path
import logging
from typing import Optional, List, Dict, Any
import os
from datetime import datetime

class CIRFDatabaseManager:
    """
    Manages database operations for CIRF research project
    """
    
    def __init__(self, db_path: str = "cirf_research.db", db_type: str = "sqlite"):
        """
        Initialize database manager
        
        Args:
            db_path: Path to SQLite database or connection string for PostgreSQL
            db_type: Database type ('sqlite' or 'postgresql')
        """
        self.db_path = db_path
        self.db_type = db_type
        self.engine = None
        self.Session = None
        
        # Set up logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Initialize database connection
        self._initialize_connection()
    
    def _initialize_connection(self):
        """Initialize database connection and session"""
        try:
            if self.db_type == "sqlite":
                # Create database directory if it doesn't exist
                db_dir = Path(self.db_path).parent
                db_dir.mkdir(parents=True, exist_ok=True)
                
                connection_string = f"sqlite:///{self.db_path}"
                self.engine = create_engine(connection_string, echo=False)
                
            elif self.db_type == "postgresql":
                # Expecting connection string format: postgresql://user:password@host:port/database
                self.engine = create_engine(self.db_path, echo=False)
            
            else:
                raise ValueError(f"Unsupported database type: {self.db_type}")
            
            # Create session factory
            self.Session = sessionmaker(bind=self.engine)
            
            self.logger.info(f"Database connection initialized: {self.db_type}")
            
        except Exception as e:
            self.logger.error(f"Failed to initialize database connection: {e}")
            raise
    
    def initialize_schema(self, schema_file: str = "schema.sql"):
        """
        Initialize database schema from SQL file
        
        Args:
            schema_file: Path to SQL schema file
        """
        try:
            # Read schema file
            if os.path.exists(schema_file):
                with open(schema_file, 'r') as f:
                    schema_sql = f.read()
            else:
                # Use embedded schema if file doesn't exist
                schema_sql = self._get_embedded_schema()
            
            # Execute schema creation
            with self.engine.connect() as conn:
                # Split by semicolon and execute each statement
                statements = [stmt.strip() for stmt in schema_sql.split(';') if stmt.strip()]
                
                for statement in statements:
                    try:
                        conn.execute(text(statement))
                        conn.commit()
                    except Exception as e:
                        # Log but continue - some statements might fail if tables already exist
                        self.logger.warning(f"Schema statement failed (might be expected): {e}")
            
            self.logger.info("Database schema initialized successfully")
            
        except Exception as e:
            self.logger.error(f"Failed to initialize schema: {e}")
            raise
    
    def _get_embedded_schema(self) -> str:
        """Return embedded SQL schema as fallback"""
        return '''
        CREATE TABLE IF NOT EXISTS cultural_enterprises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            enterprise_name TEXT NOT NULL,
            source_type TEXT,
            country TEXT,
            sector TEXT,
            outcome_category TEXT,
            total_cirf_score REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS component_evidence (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            enterprise_id INTEGER,
            component_id INTEGER,
            evidence_text TEXT,
            confidence_score REAL,
            FOREIGN KEY (enterprise_id) REFERENCES cultural_enterprises (id)
        );
        '''
    
    def insert_enterprise(self, enterprise_data: Dict[str, Any]) -> int:
        """
        Insert new cultural enterprise record
        
        Args:
            enterprise_data: Dictionary containing enterprise data
            
        Returns:
            ID of inserted record
        """
        try:
            with self.engine.connect() as conn:
                # Prepare insert statement
                columns = ', '.join(enterprise_data.keys())
                placeholders = ', '.join([f':{key}' for key in enterprise_data.keys()])
                
                sql = f"""
                INSERT INTO cultural_enterprises ({columns})
                VALUES ({placeholders})
                """
                
                result = conn.execute(text(sql), enterprise_data)
                conn.commit()
                
                # Get the last inserted ID
                if self.db_type == "sqlite":
                    enterprise_id = result.lastrowid
                else:
                    enterprise_id = result.inserted_primary_key[0]
                
                self.logger.info(f"Inserted enterprise with ID: {enterprise_id}")
                return enterprise_id
                
        except Exception as e:
            self.logger.error(f"Failed to insert enterprise: {e}")
            raise
    
    def update_cirf_scores(self, enterprise_id: int, cirf_scores: Dict[str, float]):
        """
        Update CIRF component scores for an enterprise
        
        Args:
            enterprise_id: ID of the enterprise
            cirf_scores: Dictionary of CIRF component scores
        """
        try:
            with self.engine.connect() as conn:
                # Build update statement
                set_clauses = []
                for component, score in cirf_scores.items():
                    set_clauses.append(f"{component} = :{component}")
                
                sql = f"""
                UPDATE cultural_enterprises 
                SET {', '.join(set_clauses)}, updated_at = CURRENT_TIMESTAMP
                WHERE id = :enterprise_id
                """
                
                # Add enterprise_id to parameters
                params = {**cirf_scores, 'enterprise_id': enterprise_id}
                
                conn.execute(text(sql), params)
                conn.commit()
                
                self.logger.info(f"Updated CIRF scores for enterprise {enterprise_id}")
                
        except Exception as e:
            self.logger.error(f"Failed to update CIRF scores: {e}")
            raise
    
    def get_enterprises(self, filters: Optional[Dict[str, Any]] = None) -> pd.DataFrame:
        """
        Retrieve enterprises with optional filters
        
        Args:
            filters: Dictionary of filter conditions
            
        Returns:
            DataFrame containing enterprise data
        """
        try:
            sql = "SELECT * FROM cultural_enterprises"
            params = {}
            
            if filters:
                where_clauses = []
                for key, value in filters.items():
                    if isinstance(value, list):
                        # Handle IN clause
                        placeholders = ', '.join([f':{key}_{i}' for i in range(len(value))])
                        where_clauses.append(f"{key} IN ({placeholders})")
                        for i, v in enumerate(value):
                            params[f"{key}_{i}"] = v
                    else:
                        where_clauses.append(f"{key} = :{key}")
                        params[key] = value
                
                sql += " WHERE " + " AND ".join(where_clauses)
            
            df = pd.read_sql_query(text(sql), self.engine, params=params)
            return df
            
        except Exception as e:
            self.logger.error(f"Failed to retrieve enterprises: {e}")
            raise
    
    def get_summary_statistics(self) -> Dict[str, Any]:
        """
        Get summary statistics of the dataset
        
        Returns:
            Dictionary containing summary statistics
        """
        try:
            with self.engine.connect() as conn:
                # Basic counts
                total_count = conn.execute(text(
                    "SELECT COUNT(*) FROM cultural_enterprises"
                )).scalar()
                
                # Outcome distribution
                outcome_dist = pd.read_sql_query(text(
                    "SELECT outcome_category, COUNT(*) as count FROM cultural_enterprises GROUP BY outcome_category"
                ), conn)
                
                # Country distribution
                country_dist = pd.read_sql_query(text(
                    "SELECT country, COUNT(*) as count FROM cultural_enterprises GROUP BY country ORDER BY count DESC LIMIT 10"
                ), conn)
                
                # Sector distribution
                sector_dist = pd.read_sql_query(text(
                    "SELECT sector, COUNT(*) as count FROM cultural_enterprises GROUP BY sector ORDER BY count DESC LIMIT 10"
                ), conn)
                
                return {
                    'total_enterprises': total_count,
                    'outcome_distribution': outcome_dist.to_dict('records'),
                    'top_countries': country_dist.to_dict('records'),
                    'top_sectors': sector_dist.to_dict('records'),
                    'last_updated': datetime.now().isoformat()
                }
                
        except Exception as e:
            self.logger.error(f"Failed to get summary statistics: {e}")
            raise
    
    def export_to_csv(self, output_path: str, table_name: str = "cultural_enterprises"):
        """
        Export table data to CSV
        
        Args:
            output_path: Path for output CSV file
            table_name: Name of table to export
        """
        try:
            df = pd.read_sql_query(f"SELECT * FROM {table_name}", self.engine)
            df.to_csv(output_path, index=False)
            self.logger.info(f"Exported {len(df)} records to {output_path}")
            
        except Exception as e:
            self.logger.error(f"Failed to export to CSV: {e}")
            raise
    
    def backup_database(self, backup_path: str):
        """
        Create database backup
        
        Args:
            backup_path: Path for backup file
        """
        try:
            if self.db_type == "sqlite":
                # For SQLite, copy the file
                import shutil
                shutil.copy2(self.db_path, backup_path)
            else:
                # For PostgreSQL, export all tables
                tables = ['cultural_enterprises', 'component_evidence', 'validation_reviews', 
                         'source_documents', 'collection_sessions']
                
                backup_dir = Path(backup_path)
                backup_dir.mkdir(parents=True, exist_ok=True)
                
                for table in tables:
                    try:
                        df = pd.read_sql_query(f"SELECT * FROM {table}", self.engine)
                        df.to_csv(backup_dir / f"{table}.csv", index=False)
                    except Exception as e:
                        self.logger.warning(f"Could not backup table {table}: {e}")
            
            self.logger.info(f"Database backup created: {backup_path}")
            
        except Exception as e:
            self.logger.error(f"Failed to create backup: {e}")
            raise
    
    def close(self):
        """Close database connection"""
        if self.engine:
            self.engine.dispose()
            self.logger.info("Database connection closed")


# Usage example
if __name__ == "__main__":
    # Initialize database manager
    db_manager = CIRFDatabaseManager("cirf_research.db")
    
    # Initialize schema
    db_manager.initialize_schema()
    
    # Example: Insert a test enterprise
    test_enterprise = {
        'enterprise_name': 'Test Cultural Enterprise',
        'source_type': 'case_study',
        'country': 'Canada',
        'sector': 'traditional_crafts',
        'outcome_category': 'success',
        'data_quality_score': 0.8
    }
    
    enterprise_id = db_manager.insert_enterprise(test_enterprise)
    
    # Example: Update CIRF scores
    cirf_scores = {
        'cirf_1_economic_value': 0.7,
        'cirf_2_cultural_integrity': 0.9,
        'cirf_3_adaptability': 0.6
    }
    
    db_manager.update_cirf_scores(enterprise_id, cirf_scores)
    
    # Get summary statistics
    stats = db_manager.get_summary_statistics()
    print("Database Summary:", stats)
    
    # Close connection
    db_manager.close()
