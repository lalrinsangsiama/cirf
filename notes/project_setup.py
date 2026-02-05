"""
CIRF Research Project Setup Script
Run this script to initialize your research environment
"""

import os
import sys
from pathlib import Path
import subprocess
import logging
from typing import Dict, Any
import json
import sqlite3

def setup_logging():
    """Set up logging configuration"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('setup.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )
    return logging.getLogger(__name__)

def create_project_structure():
    """Create project directory structure"""
    directories = [
        'data/raw',
        'data/processed',
        'data/external',
        'data/scraped',
        'databases',
        'logs',
        'notebooks',
        'scripts',
        'config',
        'results',
        'backups',
        'documentation'
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
    
    return directories

def create_config_files():
    """Create configuration files"""
    
    # Main configuration file
    config = {
        "database": {
            "type": "sqlite",
            "path": "databases/cirf_research.db",
            "backup_frequency": "daily"
        },
        "scraping": {
            "request_delay": 2.0,
            "max_retries": 3,
            "timeout": 30,
            "user_agent": "CIRF-Research-Bot/1.0",
            "output_dir": "data/scraped"
        },
        "analysis": {
            "nlp_model": "en_core_web_sm",
            "batch_size": 1000,
            "confidence_threshold": 0.7
        },
        "data_collection": {
            "target_sample_size": 1000,
            "pilot_size": 50,
            "phase_2_size": 200,
            "geographic_diversity": ["North America", "Europe", "Asia", "Africa", "Oceania", "South America"],
            "sector_categories": [
                "traditional_crafts", "cultural_tourism", "heritage_preservation",
                "creative_industries", "indigenous_products", "social_enterprises"
            ]
        },
        "validation": {
            "inter_rater_reliability_threshold": 0.8,
            "minimum_data_quality_score": 0.6,
            "manual_review_percentage": 0.1
        }
    }
    
    with open('config/config.json', 'w') as f:
        json.dump(config, f, indent=2)
    
    # Environment variables template
    env_template = """# CIRF Research Environment Variables
# Copy this to .env and fill in your values

# Database Configuration
DATABASE_URL=sqlite:///databases/cirf_research.db
POSTGRES_URL=postgresql://username:password@localhost:5432/cirf_research

# API Keys (add as needed)
CROSSREF_EMAIL=your.email@domain.com
SEMANTIC_SCHOLAR_API_KEY=your_api_key_here

# Project Configuration
PROJECT_ROOT=/path/to/your/project
DATA_DIR=data
LOGS_DIR=logs

# Web Scraping Configuration
USER_AGENT=CIRF-Research-Bot/1.0 (your.email@domain.com)
REQUEST_DELAY=2
MAX_RETRIES=3

# NLP Configuration
SPACY_MODEL=en_core_web_sm
BATCH_SIZE=1000
"""
    
    with open('config/.env.template', 'w') as f:
        f.write(env_template)
    
    # Create empty .env file if it doesn't exist
    if not Path('.env').exists():
        with open('.env', 'w') as f:
            f.write("# Copy values from config/.env.template\n")

def create_sample_scripts():
    """Create sample scripts for common tasks"""
    
    # Data collection script
    data_collection_script = """#!/usr/bin/env python3
\"\"\"
Sample data collection script for CIRF research
\"\"\"

from database_manager import CIRFDatabaseManager
from web_scraper import CIRFWebScraper, ScrapingConfig, CIRFSearchTerms
import json
import time

def main():
    # Initialize components
    db_manager = CIRFDatabaseManager("databases/cirf_research.db")
    scraper_config = ScrapingConfig(output_dir="data/scraped")
    scraper = CIRFWebScraper(scraper_config)
    
    # Get search terms
    search_terms = CIRFSearchTerms.generate_compound_terms()[:10]  # Start with 10 terms
    
    print(f"Starting data collection with {len(search_terms)} search terms...")
    
    # Collect data
    all_results = []
    for i, term in enumerate(search_terms):
        print(f"Processing term {i+1}/{len(search_terms)}: {term}")
        
        # Search Google Scholar
        results = scraper.search_google_scholar(term, num_results=5)
        all_results.extend(results)
        
        # Be respectful - wait between searches
        time.sleep(10)
    
    # Save results
    scraper.save_results(all_results, f"collection_{int(time.time())}")
    
    print(f"Collection complete. Found {len(all_results)} potential sources.")
    
    # Basic statistics
    stats = db_manager.get_summary_statistics()
    print("Current database statistics:")
    print(json.dumps(stats, indent=2))

if __name__ == "__main__":
    main()
"""
    
    with open('scripts/collect_data.py', 'w') as f:
        f.write(data_collection_script)
    
    # Analysis script template
    analysis_script = """#!/usr/bin/env python3
\"\"\"
Sample analysis script for CIRF research
\"\"\"

import pandas as pd
import numpy as np
from database_manager import CIRFDatabaseManager
import matplotlib.pyplot as plt
import seaborn as sns

def main():
    # Initialize database manager
    db_manager = CIRFDatabaseManager("databases/cirf_research.db")
    
    # Load data
    df = db_manager.get_enterprises()
    
    if df.empty:
        print("No data found in database. Run data collection first.")
        return
    
    print(f"Loaded {len(df)} enterprises for analysis")
    
    # Basic descriptive statistics
    print("\\nOutcome Distribution:")
    print(df['outcome_category'].value_counts())
    
    print("\\nCountry Distribution:")
    print(df['country'].value_counts().head(10))
    
    print("\\nSector Distribution:")
    print(df['sector'].value_counts().head(10))
    
    # If CIRF scores are available
    cirf_columns = [col for col in df.columns if col.startswith('cirf_') and col.endswith('_score')]
    if cirf_columns:
        print(f"\\nCIRF Score Summary (n={len(cirf_columns)} components):")
        print(df[cirf_columns].describe())
    
    # Create basic visualizations
    plt.figure(figsize=(12, 8))
    
    # Outcome distribution
    plt.subplot(2, 2, 1)
    df['outcome_category'].value_counts().plot(kind='bar')
    plt.title('Enterprise Outcomes')
    plt.xticks(rotation=45)
    
    # Country distribution (top 10)
    plt.subplot(2, 2, 2)
    df['country'].value_counts().head(10).plot(kind='bar')
    plt.title('Top 10 Countries')
    plt.xticks(rotation=45)
    
    # Sector distribution
    plt.subplot(2, 2, 3)
    df['sector'].value_counts().head(10).plot(kind='bar')
    plt.title('Top 10 Sectors')
    plt.xticks(rotation=45)
    
    # CIRF scores if available
    if 'total_cirf_score' in df.columns:
        plt.subplot(2, 2, 4)
        df['total_cirf_score'].hist(bins=20)
        plt.title('Total CIRF Score Distribution')
        plt.xlabel('CIRF Score')
        plt.ylabel('Frequency')
    
    plt.tight_layout()
    plt.savefig('results/basic_analysis.png', dpi=300, bbox_inches='tight')
    plt.show()
    
    print("\\nAnalysis complete. Check results/basic_analysis.png for visualizations.")

if __name__ == "__main__":
    main()
"""
    
    with open('scripts/analyze_data.py', 'w') as f:
        f.write(analysis_script)

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("ERROR: Python 3.8 or higher is required")
        return False
    print(f"✓ Python {sys.version} is compatible")
    return True

def install_requirements():
    """Install required packages"""
    try:
        # Check if requirements.txt exists
        if not Path('requirements.txt').exists():
            print("Creating requirements.txt...")
            requirements = [
                "pandas>=2.0.0",
                "numpy>=1.24.0",
                "scikit-learn>=1.3.0",
                "matplotlib>=3.7.0",
                "seaborn>=0.12.0",
                "sqlalchemy>=2.0.0",
                "beautifulsoup4>=4.12.0",
                "requests>=2.31.0",
                "spacy>=3.6.0",
                "python-dotenv>=1.0.0",
                "tqdm>=4.65.0",
                "jupyter>=1.0.0"
            ]
            
            with open('requirements.txt', 'w') as f:
                f.write('\\n'.join(requirements))
        
        print("Installing requirements...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✓ Requirements installed successfully")
        
        # Download spaCy model
        print("Downloading spaCy English model...")
        subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
        print("✓ spaCy model downloaded")
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"ERROR: Failed to install requirements: {e}")
        return False

def initialize_database():
    """Initialize the research database"""
    try:
        # Import after installation
        sys.path.append('.')
        from database_manager import CIRFDatabaseManager
        
        db_manager = CIRFDatabaseManager("databases/cirf_research.db")
        db_manager.initialize_schema()
        
        # Test database connection
        stats = db_manager.get_summary_statistics()
        print("✓ Database initialized successfully")
        print(f"Database stats: {stats}")
        
        db_manager.close()
        return True
        
    except Exception as e:
        print(f"ERROR: Failed to initialize database: {e}")
        return False

def run_tests():
    """Run basic tests to verify setup"""
    try:
        # Test imports
        import pandas as pd
        import numpy as np
        import sklearn
        import spacy
        from bs4 import BeautifulSoup
        import requests
        
        print("✓ All required packages import successfully")
        
        # Test spaCy model
        nlp = spacy.load("en_core_web_sm")
        doc = nlp("This is a test sentence for cultural entrepreneurship analysis.")
        print(f"✓ spaCy model working (found {len(doc.ents)} entities)")
        
        # Test database connection
        import sqlite3
        conn = sqlite3.connect("databases/cirf_research.db")
        cursor = conn.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        conn.close()
        print(f"✓ Database accessible (found {len(tables)} tables)")
        
        return True
        
    except Exception as e:
        print(f"ERROR: Test failed: {e}")
        return False

def create_readme():
    """Create README file with setup instructions"""
    readme_content = """# CIRF Research Project

## Cultural Innovation Resilience Framework Analysis

This project implements a comprehensive system for collecting and analyzing cultural entrepreneurship data to validate the Cultural Innovation Resilience Framework (CIRF).

## Quick Start

1. **Environment Setup**: Run the setup script
   ```bash
   python setup.py
   ```

2. **Configuration**: Edit `config/config.json` and `.env` with your settings

3. **Data Collection**: Start collecting data
   ```bash
   python scripts/collect_data.py
   ```

4. **Analysis**: Run basic analysis
   ```bash
   python scripts/analyze_data.py
   ```

## Project Structure

```
├── config/           # Configuration files
├── data/            # Data storage
│   ├── raw/         # Raw collected data
│   ├── processed/   # Processed data
│   └── scraped/     # Web scraped data
├── databases/       # SQLite databases
├── logs/           # Log files
├── notebooks/      # Jupyter notebooks
├── results/        # Analysis results
├── scripts/        # Utility scripts
└── backups/        # Database backups
```

## Key Components

- **Database Manager**: Handles all database operations
- **Web Scraper**: Collects data from various online sources
- **CIRF Analyzer**: Analyzes cultural entrepreneurship cases using the CIRF framework
- **Statistical Analysis**: Comprehensive statistical validation tools

## Research Phases

1. **Phase 1 (Months 1-3)**: Foundation & Pilot (50 cases)
2. **Phase 2 (Months 4-6)**: Methodology Refinement (200 cases)
3. **Phase 3 (Months 7-12)**: Scaled Data Collection (600+ cases)
4. **Phase 4 (Months 13-18)**: Comprehensive Analysis (1000+ cases)
5. **Phase 5 (Months 19-24)**: Synthesis & Dissertation

## CIRF Framework Components

### Operational Pillars (1-4)
1. Economic Value Creation
2. Cultural Integrity
3. Adaptability
4. Social Empowerment

### Community Control Filters (5-9)
5. Community Benefit
6. Cultural Protection
7. Community Relevance
8. Sustainable Development
9. Dignity & Empowerment

### Resilience Capacities (10-13)
10. Protective Capacity
11. Adaptive Capacity
12. Transformative Capacity
13. Generative Capacity

## Usage Examples

### Collecting Academic Papers
```python
from web_scraper import CIRFWebScraper
scraper = CIRFWebScraper()
results = scraper.search_google_scholar("cultural entrepreneurship success", num_results=20)
```

### Database Operations
```python
from database_manager import CIRFDatabaseManager
db = CIRFDatabaseManager()
enterprises = db.get_enterprises(filters={'country': 'Canada'})
```

### CIRF Analysis
```python
# Coming soon - CIRF scoring and analysis tools
```

## Data Sources

- **Academic**: Google Scholar, CrossRef, Semantic Scholar
- **Government**: Economic development reports, policy documents
- **Organizations**: NGO reports, foundation case studies
- **Media**: Business journals, cultural publications

## Quality Assurance

- Inter-rater reliability testing (target: ≥0.80)
- Data quality scoring
- Manual validation of key cases
- Automated data quality checks

## Contributing

This is a doctoral research project. For questions or collaboration inquiries, contact [your email].

## License

This research project is for academic purposes. Data usage should respect original source licenses and copyright.
"""
    
    with open('README.md', 'w') as f:
        f.write(readme_content)

def main():
    """Main setup function"""
    logger = setup_logging()
    logger.info("Starting CIRF Research Project Setup")
    
    print("🔬 CIRF Research Project Setup")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        return False
    
    # Create project structure
    print("\\n📁 Creating project structure...")
    directories = create_project_structure()
    print(f"✓ Created {len(directories)} directories")
    
    # Create configuration files
    print("\\n⚙️  Creating configuration files...")
    create_config_files()
    print("✓ Configuration files created")
    
    # Create sample scripts
    print("\\n📝 Creating sample scripts...")
    create_sample_scripts()
    print("✓ Sample scripts created")
    
    # Create README
    print("\\n📖 Creating README...")
    create_readme()
    print("✓ README created")
    
    # Install requirements
    print("\\n📦 Installing requirements...")
    if not install_requirements():
        print("❌ Setup failed during package installation")
        return False
    
    # Initialize database
    print("\\n🗄️  Initializing database...")
    if not initialize_database():
        print("❌ Setup failed during database initialization")
        return False
    
    # Run tests
    print("\\n🧪 Running verification tests...")
    if not run_tests():
        print("❌ Setup verification failed")
        return False
    
    print("\\n✅ Setup completed successfully!")
    print("\\nNext steps:")
    print("1. Review and customize config/config.json")
    print("2. Copy config/.env.template to .env and fill in your values")
    print("3. Run 'python scripts/collect_data.py' to start data collection")
    print("4. Check the README.md for detailed usage instructions")
    
    logger.info("CIRF Research Project Setup completed successfully")
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
