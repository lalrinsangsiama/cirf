# Cultural Innovation Resilience Framework (CIRF) Analysis System
# Complete Python Implementation for Doctoral Research

import os
import sys
import logging
import sqlite3
import pandas as pd
import numpy as np
import requests
from datetime import datetime, timedelta
import json
import time
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Any
from dataclasses import dataclass, asdict
from collections import defaultdict, Counter

# Core libraries for web scraping and data processing
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

# NLP and ML libraries
import nltk
from textblob import TextBlob
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
import spacy

# Visualization libraries
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import streamlit as st

# Statistical analysis
from scipy import stats
from scipy.stats import chi2_contingency
import statistics

# API access (when available)
try:
    from scholarly import scholarly
except ImportError:
    scholarly = None

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('cirf_analysis.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# ===================================================================
# DATA STRUCTURES AND CONFIGURATION
# ===================================================================

@dataclass
class CIRFScore:
    """Data structure for CIRF component scores"""
    economic_value: float = 0.0
    cultural_integrity: float = 0.0
    adaptability: float = 0.0
    social_empowerment: float = 0.0
    community_benefit: float = 0.0
    cultural_protection: float = 0.0
    community_relevance: float = 0.0
    sustainable_development: float = 0.0
    dignity_empowerment: float = 0.0
    protective_capacity: float = 0.0
    adaptive_capacity: float = 0.0
    transformative_capacity: float = 0.0
    generative_capacity: float = 0.0
    total_score: float = 0.0
    percentage: float = 0.0
    confidence: float = 0.0

@dataclass
class FailureCase:
    """Data structure for failure case records"""
    id: Optional[int] = None
    source_type: str = ""
    citation: str = ""
    title: str = ""
    authors: str = ""
    publication_date: Optional[datetime] = None
    url: str = ""
    location_country: str = ""
    location_region: str = ""
    cultural_context: str = ""
    sector: str = ""
    failure_date: Optional[datetime] = None
    failure_type: str = ""
    description: str = ""
    detailed_analysis: str = ""
    evidence_quality: int = 0
    cirf_scores: Optional[CIRFScore] = None
    notes: str = ""
    extraction_date: datetime = None

class CIRFConfig:
    """Configuration class for CIRF analysis"""
    
    # Search terms for data collection
    PRIMARY_TERMS = [
        "cultural entrepreneurship failure",
        "indigenous business closure",
        "traditional craft business failed",
        "cultural tourism failure",
        "ethnic minority business bankruptcy",
        "social enterprise collapse cultural",
        "community enterprise failure",
        "cultural heritage business closed"
    ]
    
    GEOGRAPHIC_MODIFIERS = [
        "Canada", "Australia", "New Zealand", "United States",
        "Africa", "Asia", "Europe", "Latin America"
    ]
    
    SECTOR_MODIFIERS = [
        "tourism", "crafts", "artisan", "heritage", "museum",
        "festival", "cooperative", "social enterprise"
    ]
    
    # CIRF Component Keywords
    COMPONENT_KEYWORDS = {
        "economic_value": [
            "revenue", "profit", "income", "sales", "market", "financial", 
            "sustainable", "viable", "economic", "commercial", "business model"
        ],
        "cultural_integrity": [
            "authentic", "traditional", "heritage", "cultural", "preserve", 
            "respect", "accurate", "genuine", "original", "indigenous"
        ],
        "adaptability": [
            "flexible", "adapt", "change", "respond", "evolve", "modify", 
            "adjust", "responsive", "adaptable", "pivot"
        ],
        "social_empowerment": [
            "community", "capacity", "skills", "leadership", "participation", 
            "empowerment", "training", "education", "development"
        ],
        "community_benefit": [
            "benefit", "positive", "improve", "help", "support", "local", 
            "community", "impact", "contribution", "value"
        ],
        "cultural_protection": [
            "protect", "safeguard", "preserve", "maintain", "heritage", 
            "tradition", "conservation", "cultural protection"
        ],
        "community_relevance": [
            "relevant", "appropriate", "needed", "wanted", "aligned", 
            "suitable", "meaningful", "significant", "important"
        ],
        "sustainable_development": [
            "sustainable", "long-term", "environmental", "future", "viable", 
            "sustainability", "green", "eco-friendly"
        ],
        "dignity_empowerment": [
            "dignity", "respect", "self-determination", "autonomy", "control", 
            "empowerment", "independence", "self-reliance"
        ],
        "protective_capacity": [
            "protect", "defend", "safeguard", "secure", "shield", "guard",
            "protection", "safety", "security"
        ],
        "adaptive_capacity": [
            "adapt", "flexible", "responsive", "adjust", "modify", "resilient",
            "adaptation", "flexibility", "agility"
        ],
        "transformative_capacity": [
            "transform", "innovate", "change", "evolve", "develop", "create",
            "innovation", "transformation", "evolution"
        ],
        "generative_capacity": [
            "generate", "create", "produce", "develop", "build", "establish",
            "generation", "creation", "productivity"
        ]
    }

# ===================================================================
# DATABASE MANAGEMENT
# ===================================================================

class CIRFDatabase:
    """Database management for CIRF analysis"""
    
    def __init__(self, db_path: str = "cirf_analysis.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize database with proper schema"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            
            # Create main failures table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS failures (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    source_type TEXT,
                    citation TEXT,
                    title TEXT,
                    authors TEXT,
                    publication_date DATE,
                    url TEXT,
                    location_country TEXT,
                    location_region TEXT,
                    cultural_context TEXT,
                    sector TEXT,
                    failure_date DATE,
                    failure_type TEXT,
                    description TEXT,
                    detailed_analysis TEXT,
                    evidence_quality INTEGER,
                    cirf_1 REAL,  -- Economic Value Creation
                    cirf_2 REAL,  -- Cultural Integrity
                    cirf_3 REAL,  -- Adaptability
                    cirf_4 REAL,  -- Social Empowerment
                    cirf_5 REAL,  -- Community Benefit
                    cirf_6 REAL,  -- Cultural Protection
                    cirf_7 REAL,  -- Community Relevance
                    cirf_8 REAL,  -- Sustainable Development
                    cirf_9 REAL,  -- Dignity & Empowerment
                    cirf_10 REAL, -- Protective Capacity
                    cirf_11 REAL, -- Adaptive Capacity
                    cirf_12 REAL, -- Transformative Capacity
                    cirf_13 REAL, -- Generative Capacity
                    total_score REAL,
                    percentage REAL,
                    confidence_score REAL,
                    notes TEXT,
                    extraction_date DATE,
                    UNIQUE(url, title)
                )
            ''')
            
            # Create search log table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS search_log (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    search_term TEXT,
                    source TEXT,
                    timestamp DATE,
                    results_found INTEGER,
                    status TEXT
                )
            ''')
            
            # Create analysis metadata table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS analysis_metadata (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    analysis_type TEXT,
                    parameters TEXT,
                    results TEXT,
                    timestamp DATE
                )
            ''')
            
            conn.commit()
            logger.info("Database initialized successfully")
    
    def insert_failure(self, failure: FailureCase) -> Optional[int]:
        """Insert a failure case into the database"""
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                
                cirf_values = []
                if failure.cirf_scores:
                    cirf_dict = asdict(failure.cirf_scores)
                    cirf_values = [cirf_dict[f'cirf_{i}'] if f'cirf_{i}' in cirf_dict 
                                 else getattr(failure.cirf_scores, list(cirf_dict.keys())[i-1])
                                 for i in range(1, 14)]
                else:
                    cirf_values = [0.0] * 13
                
                cursor.execute('''
                    INSERT OR REPLACE INTO failures (
                        source_type, citation, title, authors, publication_date, url,
                        location_country, location_region, cultural_context, sector,
                        failure_date, failure_type, description, detailed_analysis,
                        evidence_quality, cirf_1, cirf_2, cirf_3, cirf_4, cirf_5,
                        cirf_6, cirf_7, cirf_8, cirf_9, cirf_10, cirf_11, cirf_12,
                        cirf_13, total_score, percentage, confidence_score, notes,
                        extraction_date
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    failure.source_type, failure.citation, failure.title, failure.authors,
                    failure.publication_date, failure.url, failure.location_country,
                    failure.location_region, failure.cultural_context, failure.sector,
                    failure.failure_date, failure.failure_type, failure.description,
                    failure.detailed_analysis, failure.evidence_quality,
                    *cirf_values,
                    failure.cirf_scores.total_score if failure.cirf_scores else 0.0,
                    failure.cirf_scores.percentage if failure.cirf_scores else 0.0,
                    failure.cirf_scores.confidence if failure.cirf_scores else 0.0,
                    failure.notes, failure.extraction_date or datetime.now()
                ))
                
                return cursor.lastrowid
                
        except Exception as e:
            logger.error(f"Error inserting failure case: {e}")
            return None
    
    def get_all_failures(self) -> pd.DataFrame:
        """Retrieve all failure cases as DataFrame"""
        with sqlite3.connect(self.db_path) as conn:
            return pd.read_sql_query("SELECT * FROM failures", conn)
    
    def get_statistics(self) -> Dict[str, Any]:
        """Get basic statistics about the dataset"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            
            stats = {}
            
            # Total count
            cursor.execute("SELECT COUNT(*) FROM failures")
            stats['total_cases'] = cursor.fetchone()[0]
            
            # By country
            cursor.execute("SELECT location_country, COUNT(*) FROM failures GROUP BY location_country ORDER BY COUNT(*) DESC")
            stats['by_country'] = dict(cursor.fetchall())
            
            # By sector
            cursor.execute("SELECT sector, COUNT(*) FROM failures GROUP BY sector ORDER BY COUNT(*) DESC")
            stats['by_sector'] = dict(cursor.fetchall())
            
            # Average scores
            cirf_columns = [f"cirf_{i}" for i in range(1, 14)]
            for col in cirf_columns:
                cursor.execute(f"SELECT AVG({col}) FROM failures WHERE {col} IS NOT NULL")
                result = cursor.fetchone()[0]
                stats[f'avg_{col}'] = result if result else 0.0
            
            return stats

# ===================================================================
# WEB SCRAPING AND DATA COLLECTION
# ===================================================================

class ScholarScraper:
    """Google Scholar scraper using scholarly library"""
    
    def __init__(self):
        self.results = []
    
    def search_papers(self, query: str, max_results: int = 50) -> List[Dict]:
        """Search Google Scholar for papers"""
        if not scholarly:
            logger.warning("Scholarly library not available")
            return []
        
        try:
            search_query = scholarly.search_pubs(query)
            results = []
            
            for i, paper in enumerate(search_query):
                if i >= max_results:
                    break
                
                try:
                    filled_paper = scholarly.fill(paper)
                    result = {
                        'title': filled_paper.get('title', ''),
                        'authors': ', '.join(filled_paper.get('author', [])),
                        'year': filled_paper.get('year', ''),
                        'url': filled_paper.get('url', ''),
                        'abstract': filled_paper.get('abstract', ''),
                        'citation': filled_paper.get('citation', ''),
                        'source': 'Google Scholar'
                    }
                    results.append(result)
                    
                except Exception as e:
                    logger.warning(f"Error processing paper: {e}")
                    continue
                
                # Rate limiting
                time.sleep(1)
            
            return results
            
        except Exception as e:
            logger.error(f"Error searching Google Scholar: {e}")
            return []

class ResearchGateScraper:
    """ResearchGate web scraper"""
    
    def __init__(self):
        self.setup_driver()
    
    def setup_driver(self):
        """Setup Selenium WebDriver"""
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
        except Exception as e:
            logger.warning(f"Could not initialize Chrome driver: {e}")
            self.driver = None
    
    def search_papers(self, query: str, max_results: int = 50) -> List[Dict]:
        """Search ResearchGate for papers"""
        if not self.driver:
            return []
        
        try:
            search_url = f"https://www.researchgate.net/search?q={query.replace(' ', '%20')}"
            self.driver.get(search_url)
            
            # Wait for results to load
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "nova-legacy-e-text"))
            )
            
            results = []
            paper_elements = self.driver.find_elements(By.CSS_SELECTOR, ".nova-legacy-o-stack__item")
            
            for i, element in enumerate(paper_elements[:max_results]):
                try:
                    title_elem = element.find_element(By.CSS_SELECTOR, ".nova-legacy-v-publication-item__title a")
                    title = title_elem.text
                    url = title_elem.get_attribute("href")
                    
                    authors_elem = element.find_elements(By.CSS_SELECTOR, ".nova-legacy-v-person-inline-item__fullname")
                    authors = ', '.join([auth.text for auth in authors_elem])
                    
                    abstract_elem = element.find_elements(By.CSS_SELECTOR, ".nova-legacy-e-text--color-grey-600")
                    abstract = abstract_elem[0].text if abstract_elem else ""
                    
                    result = {
                        'title': title,
                        'authors': authors,
                        'url': url,
                        'abstract': abstract,
                        'source': 'ResearchGate'
                    }
                    results.append(result)
                    
                except Exception as e:
                    logger.warning(f"Error extracting paper data: {e}")
                    continue
            
            return results
            
        except Exception as e:
            logger.error(f"Error scraping ResearchGate: {e}")
            return []
        
        finally:
            if self.driver:
                self.driver.quit()

class DataCollector:
    """Main data collection orchestrator"""
    
    def __init__(self, database: CIRFDatabase):
        self.database = database
        self.scholar_scraper = ScholarScraper()
        self.rg_scraper = ResearchGateScraper()
        self.collected_papers = []
    
    def generate_search_queries(self) -> List[str]:
        """Generate comprehensive search queries"""
        queries = []
        
        # Base terms
        for term in CIRFConfig.PRIMARY_TERMS:
            queries.append(term)
            
            # Add geographic modifiers
            for geo in CIRFConfig.GEOGRAPHIC_MODIFIERS:
                queries.append(f"{term} {geo}")
            
            # Add sector modifiers
            for sector in CIRFConfig.SECTOR_MODIFIERS:
                queries.append(f"{term} {sector}")
        
        # Combined queries
        for term in CIRFConfig.PRIMARY_TERMS[:3]:  # Limit to avoid too many queries
            for geo in CIRFConfig.GEOGRAPHIC_MODIFIERS[:5]:
                for sector in CIRFConfig.SECTOR_MODIFIERS[:3]:
                    queries.append(f"{term} {geo} {sector}")
        
        return list(set(queries))  # Remove duplicates
    
    def collect_data(self, max_queries: int = 50) -> List[Dict]:
        """Collect data from all sources"""
        queries = self.generate_search_queries()[:max_queries]
        all_results = []
        
        for i, query in enumerate(queries):
            logger.info(f"Processing query {i+1}/{len(queries)}: {query}")
            
            # Google Scholar
            scholar_results = self.scholar_scraper.search_papers(query, max_results=20)
            all_results.extend(scholar_results)
            
            # ResearchGate
            rg_results = self.rg_scraper.search_papers(query, max_results=20)
            all_results.extend(rg_results)
            
            # Log search
            with sqlite3.connect(self.database.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO search_log (search_term, source, timestamp, results_found, status)
                    VALUES (?, ?, ?, ?, ?)
                ''', (query, 'Combined', datetime.now(), len(scholar_results) + len(rg_results), 'Success'))
                conn.commit()
            
            # Rate limiting
            time.sleep(2)
        
        # Remove duplicates based on title and URL
        seen = set()
        unique_results = []
        for result in all_results:
            identifier = (result.get('title', '').lower(), result.get('url', ''))
            if identifier not in seen:
                seen.add(identifier)
                unique_results.append(result)
        
        logger.info(f"Collected {len(unique_results)} unique papers")
        return unique_results

# ===================================================================
# NLP ANALYSIS AND CIRF SCORING
# ===================================================================

class CIRFAnalyzer:
    """NLP-based CIRF component analysis"""
    
    def __init__(self):
        self.setup_nlp()
        self.component_keywords = CIRFConfig.COMPONENT_KEYWORDS
    
    def setup_nlp(self):
        """Setup NLP tools"""
        try:
            # Download required NLTK data
            nltk.download('punkt', quiet=True)
            nltk.download('stopwords', quiet=True)
            nltk.download('vader_lexicon', quiet=True)
            
            # Load spaCy model if available
            try:
                self.nlp = spacy.load("en_core_web_sm")
            except OSError:
                logger.warning("spaCy model not available, using basic tokenization")
                self.nlp = None
        except Exception as e:
            logger.warning(f"NLP setup incomplete: {e}")
            self.nlp = None
    
    def extract_key_info(self, text: str) -> Dict[str, str]:
        """Extract key information from text"""
        info = {
            'business_name': '',
            'location': '',
            'sector': '',
            'failure_type': '',
            'timeline': '',
            'reasons': ''
        }
        
        # Simple pattern matching for key information
        text_lower = text.lower()
        
        # Extract potential business names (capitalized phrases)
        business_patterns = re.findall(r'\b[A-Z][a-z]+ (?:[A-Z][a-z]+ )*(?:Enterprise|Company|Co\.|Ltd|Inc|Corporation|Corp|Business|Venture|Project|Initiative)', text)
        if business_patterns:
            info['business_name'] = business_patterns[0]
        
        # Extract locations (countries, cities)
        location_patterns = []
        for geo in CIRFConfig.GEOGRAPHIC_MODIFIERS:
            if geo.lower() in text_lower:
                location_patterns.append(geo)
        info['location'] = ', '.join(location_patterns)
        
        # Extract sectors
        sector_patterns = []
        for sector in CIRFConfig.SECTOR_MODIFIERS:
            if sector.lower() in text_lower:
                sector_patterns.append(sector)
        info['sector'] = ', '.join(sector_patterns)
        
        # Extract failure indicators
        failure_indicators = [
            'bankruptcy', 'closure', 'failed', 'collapse', 'shutdown', 
            'terminated', 'discontinued', 'abandoned', 'unsuccessful'
        ]
        found_failures = [f for f in failure_indicators if f in text_lower]
        info['failure_type'] = ', '.join(found_failures)
        
        return info
    
    def analyze_component(self, text: str, component: str) -> Tuple[float, float]:
        """Analyze a specific CIRF component in text"""
        if component not in self.component_keywords:
            return 0.0, 0.0
        
        keywords = self.component_keywords[component]
        text_lower = text.lower()
        
        # Count keyword occurrences
        keyword_count = 0
        total_words = len(text.split())
        
        for keyword in keywords:
            keyword_count += text_lower.count(keyword.lower())
        
        # Calculate base score
        keyword_density = keyword_count / max(total_words, 1)
        
        # Analyze sentiment around keywords
        sentences = nltk.sent_tokenize(text)
        relevant_sentences = []
        
        for sentence in sentences:
            sentence_lower = sentence.lower()
            if any(keyword.lower() in sentence_lower for keyword in keywords):
                relevant_sentences.append(sentence)
        
        # Sentiment analysis on relevant sentences
        if relevant_sentences:
            sentiment_scores = []
            for sentence in relevant_sentences:
                blob = TextBlob(sentence)
                sentiment_scores.append(blob.sentiment.polarity)
            
            avg_sentiment = np.mean(sentiment_scores) if sentiment_scores else 0.0
        else:
            avg_sentiment = 0.0
        
        # Determine if component was present and violated
        presence_score = min(keyword_density * 100, 1.0)  # Normalize to 0-1
        
        # If sentiment is negative and keywords are present, likely a violation
        if presence_score > 0.1 and avg_sentiment < -0.1:
            component_score = 0.0  # Component was violated
            confidence = presence_score * 0.8  # High confidence in violation
        elif presence_score > 0.1 and avg_sentiment > 0.1:
            component_score = 1.0  # Component was satisfied
            confidence = presence_score * 0.7  # Moderate confidence
        elif presence_score > 0.05:
            component_score = 0.5  # Unclear/mixed evidence
            confidence = presence_score * 0.5  # Low confidence
        else:
            component_score = 0.5  # No clear evidence
            confidence = 0.2  # Very low confidence
        
        return component_score, confidence
    
    def analyze_text(self, text: str) -> Tuple[CIRFScore, Dict[str, str]]:
        """Comprehensive CIRF analysis of text"""
        if not text:
            return CIRFScore(), {}
        
        # Extract key information
        key_info = self.extract_key_info(text)
        
        # Analyze each CIRF component
        component_names = [
            'economic_value', 'cultural_integrity', 'adaptability', 'social_empowerment',
            'community_benefit', 'cultural_protection', 'community_relevance',
            'sustainable_development', 'dignity_empowerment', 'protective_capacity',
            'adaptive_capacity', 'transformative_capacity', 'generative_capacity'
        ]
        
        scores = {}
        confidences = {}
        
        for component in component_names:
            score, confidence = self.analyze_component(text, component)
            scores[component] = score
            confidences[component] = confidence
        
        # Create CIRF score object
        cirf_score = CIRFScore(
            economic_value=scores['economic_value'],
            cultural_integrity=scores['cultural_integrity'],
            adaptability=scores['adaptability'],
            social_empowerment=scores['social_empowerment'],
            community_benefit=scores['community_benefit'],
            cultural_protection=scores['cultural_protection'],
            community_relevance=scores['community_relevance'],
            sustainable_development=scores['sustainable_development'],
            dignity_empowerment=scores['dignity_empowerment'],
            protective_capacity=scores['protective_capacity'],
            adaptive_capacity=scores['adaptive_capacity'],
            transformative_capacity=scores['transformative_capacity'],
            generative_capacity=scores['generative_capacity']
        )
        
        # Calculate total score and percentage
        cirf_score.total_score = sum(scores.values())
        cirf_score.percentage = (cirf_score.total_score / 13.0) * 100
        cirf_score.confidence = np.mean(list(confidences.values()))
        
        return cirf_score, key_info
    
    def process_paper(self, paper_data: Dict) -> FailureCase:
        """Process a paper and create a FailureCase object"""
        # Combine title and abstract for analysis
        analysis_text = f"{paper_data.get('title', '')} {paper_data.get('abstract', '')}"
        
        # Perform CIRF analysis
        cirf_scores, key_info = self.analyze_text(analysis_text)
        
        # Create FailureCase object
        failure_case = FailureCase(
            source_type=paper_data.get('source', 'Unknown'),
            citation=paper_data.get('citation', ''),
            title=paper_data.get('title', ''),
            authors=paper_data.get('authors', ''),
            url=paper_data.get('url', ''),
            location_country=key_info.get('location', ''),
            sector=key_info.get('sector', ''),
            failure_type=key_info.get('failure_type', ''),
            description=paper_data.get('abstract', ''),
            detailed_analysis=analysis_text,
            cirf_scores=cirf_scores,
            extraction_date=datetime.now()
        )
        
        # Determine evidence quality based on abstract length and keyword presence
        if len(analysis_text) > 500 and any(keyword in analysis_text.lower() for keyword in ['failure', 'collapse', 'closure']):
            failure_case.evidence_quality = 3  # High quality
        elif len(analysis_text) > 200:
            failure_case.evidence_quality = 2  # Medium quality
        else:
            failure_case.evidence_quality = 1  # Low quality
        
        return failure_case

# ===================================================================
# STATISTICAL ANALYSIS
# ===================================================================

class StatisticalAnalyzer:
    """Statistical analysis of CIRF data"""
    
    def __init__(self, database: CIRFDatabase):
        self.database = database
    
    def component_frequency_analysis(self) -> Dict[str, Any]:
        """Analyze frequency of component violations"""
        df = self.database.get_all_failures()
        
        if df.empty:
            return {}
        
        component_cols = [f'cirf_{i}' for i in range(1, 14)]
        component_names = [
            'Economic Value', 'Cultural Integrity', 'Adaptability', 'Social Empowerment',
            'Community Benefit', 'Cultural Protection', 'Community Relevance',
            'Sustainable Development', 'Dignity & Empowerment', 'Protective Capacity',
            'Adaptive Capacity', 'Transformative Capacity', 'Generative Capacity'
        ]
        
        results = {}
        
        for i, (col, name) in enumerate(zip(component_cols, component_names)):
            if col in df.columns:
                # Calculate violation frequency (score = 0)
                violations = (df[col] == 0.0).sum()
                total = len(df[df[col].notna()])
                
                results[name] = {
                    'violations': int(violations),
                    'total_cases': int(total),
                    'violation_rate': float(violations / total) if total > 0 else 0.0,
                    'average_score': float(df[col].mean()) if col in df.columns else 0.0,
                    'std_deviation': float(df[col].std()) if col in df.columns else 0.0
                }
        
        return results
    
    def geographic_analysis(self) -> Dict[str, Any]:
        """Analyze geographic patterns in failures"""
        df = self.database.get_all_failures()
        
        if df.empty:
            return {}
        
        # Country analysis
        country_stats = df.groupby('location_country').agg({
            'total_score': ['mean', 'std', 'count'],
            'percentage': ['mean', 'std']
        }).round(2)
        
        # Sector analysis by country
        sector_country = df.groupby(['location_country', 'sector']).size().unstack(fill_value=0)
        
        return {
            'country_statistics': country_stats.to_dict(),
            'sector_by_country': sector_country.to_dict(),
            'total_countries': len(df['location_country'].unique()),
            'most_common_countries': df['location_country'].value_counts().head(10).to_dict()
        }
    
    def sector_analysis(self) -> Dict[str, Any]:
        """Analyze sector-specific patterns"""
        df = self.database.get_all_failures()
        
        if df.empty:
            return {}
        
        sector_stats = df.groupby('sector').agg({
            'total_score': ['mean', 'std', 'count'],
            'percentage': ['mean', 'std'],
            'evidence_quality': 'mean'
        }).round(2)
        
        # Component analysis by sector
        component_cols = [f'cirf_{i}' for i in range(1, 14)]
        sector_component_means = df.groupby('sector')[component_cols].mean()
        
        return {
            'sector_statistics': sector_stats.to_dict(),
            'component_by_sector': sector_component_means.to_dict(),
            'total_sectors': len(df['sector'].unique()),
            'most_common_sectors': df['sector'].value_counts().head(10).to_dict()
        }
    
    def correlation_analysis(self) -> Dict[str, Any]:
        """Analyze correlations between CIRF components"""
        df = self.database.get_all_failures()
        
        if df.empty:
            return {}
        
        component_cols = [f'cirf_{i}' for i in range(1, 14)]
        available_cols = [col for col in component_cols if col in df.columns]
        
        if len(available_cols) < 2:
            return {}
        
        correlation_matrix = df[available_cols].corr()
        
        # Find strongest correlations
        corr_pairs = []
        for i in range(len(available_cols)):
            for j in range(i+1, len(available_cols)):
                corr_value = correlation_matrix.iloc[i, j]
                if not np.isnan(corr_value):
                    corr_pairs.append({
                        'component_1': available_cols[i],
                        'component_2': available_cols[j],
                        'correlation': float(corr_value)
                    })
        
        # Sort by absolute correlation value
        corr_pairs.sort(key=lambda x: abs(x['correlation']), reverse=True)
        
        return {
            'correlation_matrix': correlation_matrix.to_dict(),
            'strongest_correlations': corr_pairs[:10],
            'average_correlation': float(correlation_matrix.values[np.triu_indices_from(correlation_matrix.values, k=1)].mean())
        }
    
    def temporal_analysis(self) -> Dict[str, Any]:
        """Analyze temporal trends in failures"""
        df = self.database.get_all_failures()
        
        if df.empty:
            return {}
        
        # Convert dates
        df['extraction_date'] = pd.to_datetime(df['extraction_date'])
        df['year'] = df['extraction_date'].dt.year
        df['month'] = df['extraction_date'].dt.month
        
        temporal_stats = {
            'by_year': df.groupby('year')['total_score'].agg(['mean', 'count']).to_dict(),
            'by_month': df.groupby('month')['total_score'].agg(['mean', 'count']).to_dict(),
            'data_collection_timeline': {
                'start_date': str(df['extraction_date'].min()),
                'end_date': str(df['extraction_date'].max()),
                'total_days': (df['extraction_date'].max() - df['extraction_date'].min()).days
            }
        }
        
        return temporal_stats
    
    def cluster_analysis(self) -> Dict[str, Any]:
        """Perform cluster analysis on failure patterns"""
        df = self.database.get_all_failures()
        
        if df.empty:
            return {}
        
        component_cols = [f'cirf_{i}' for i in range(1, 14)]
        available_cols = [col for col in component_cols if col in df.columns]
        
        if len(available_cols) < 3:
            return {}
        
        # Prepare data for clustering
        cluster_data = df[available_cols].fillna(0.5)  # Fill missing with neutral value
        
        if len(cluster_data) < 4:
            return {}
        
        # Perform K-means clustering
        n_clusters = min(5, len(cluster_data) // 2)  # Ensure reasonable cluster size
        
        try:
            kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
            cluster_labels = kmeans.fit_predict(cluster_data)
            
            df['cluster'] = cluster_labels
            
            # Analyze clusters
            cluster_stats = {}
            for cluster_id in range(n_clusters):
                cluster_mask = df['cluster'] == cluster_id
                cluster_df = df[cluster_mask]
                
                cluster_stats[f'cluster_{cluster_id}'] = {
                    'size': int(cluster_mask.sum()),
                    'avg_total_score': float(cluster_df['total_score'].mean()),
                    'dominant_countries': cluster_df['location_country'].value_counts().head(3).to_dict(),
                    'dominant_sectors': cluster_df['sector'].value_counts().head(3).to_dict(),
                    'component_averages': cluster_df[available_cols].mean().to_dict()
                }
            
            return {
                'n_clusters': n_clusters,
                'cluster_statistics': cluster_stats,
                'silhouette_score': float(stats.pearsonr(range(len(cluster_labels)), cluster_labels)[0]) if len(set(cluster_labels)) > 1 else 0.0
            }
            
        except Exception as e:
            logger.error(f"Error in cluster analysis: {e}")
            return {}

# ===================================================================
# VISUALIZATION AND DASHBOARD
# ===================================================================

class CIRFVisualizer:
    """Visualization tools for CIRF analysis"""
    
    def __init__(self, database: CIRFDatabase):
        self.database = database
        self.setup_style()
    
    def setup_style(self):
        """Setup matplotlib style"""
        plt.style.use('default')
        sns.set_palette("husl")
    
    def component_violation_chart(self, analysis_data: Dict) -> go.Figure:
        """Create component violation frequency chart"""
        if not analysis_data:
            return go.Figure()
        
        components = list(analysis_data.keys())
        violation_rates = [analysis_data[comp]['violation_rate'] * 100 for comp in components]
        
        fig = go.Figure(data=[
            go.Bar(
                x=components,
                y=violation_rates,
                marker_color='rgba(255, 99, 132, 0.8)',
                text=[f"{rate:.1f}%" for rate in violation_rates],
                textposition='auto'
            )
        ])
        
        fig.update_layout(
            title="CIRF Component Violation Rates",
            xaxis_title="CIRF Components",
            yaxis_title="Violation Rate (%)",
            xaxis_tickangle=-45,
            height=600
        )
        
        return fig
    
    def geographic_distribution_map(self, geo_data: Dict) -> go.Figure:
        """Create geographic distribution map"""
        if not geo_data or 'most_common_countries' not in geo_data:
            return go.Figure()
        
        countries = list(geo_data['most_common_countries'].keys())
        counts = list(geo_data['most_common_countries'].values())
        
        fig = go.Figure(data=go.Choropleth(
            locations=countries,
            z=counts,
            locationmode='country names',
            colorscale='Reds',
            colorbar_title="Number of Cases"
        ))
        
        fig.update_layout(
            title="Geographic Distribution of Cultural Entrepreneurship Failures",
            geo=dict(showframe=False, showcoastlines=True)
        )
        
        return fig
    
    def correlation_heatmap(self, corr_data: Dict) -> go.Figure:
        """Create correlation heatmap"""
        if not corr_data or 'correlation_matrix' not in corr_data:
            return go.Figure()
        
        corr_matrix = pd.DataFrame(corr_data['correlation_matrix'])
        
        fig = go.Figure(data=go.Heatmap(
            z=corr_matrix.values,
            x=corr_matrix.columns,
            y=corr_matrix.index,
            colorscale='RdBu',
            zmid=0
        ))
        
        fig.update_layout(
            title="CIRF Component Correlation Matrix",
            xaxis_title="CIRF Components",
            yaxis_title="CIRF Components"
        )
        
        return fig
    
    def sector_analysis_chart(self, sector_data: Dict) -> go.Figure:
        """Create sector analysis chart"""
        if not sector_data or 'most_common_sectors' not in sector_data:
            return go.Figure()
        
        sectors = list(sector_data['most_common_sectors'].keys())
        counts = list(sector_data['most_common_sectors'].values())
        
        fig = go.Figure(data=[
            go.Pie(
                labels=sectors,
                values=counts,
                hole=0.3
            )
        ])
        
        fig.update_layout(
            title="Distribution of Failures by Sector",
            height=600
        )
        
        return fig

# ===================================================================
# MAIN ORCHESTRATOR
# ===================================================================

class CIRFResearchSystem:
    """Main system orchestrator for CIRF research"""
    
    def __init__(self, db_path: str = "cirf_analysis.db"):
        self.database = CIRFDatabase(db_path)
        self.analyzer = CIRFAnalyzer()
        self.collector = DataCollector(self.database)
        self.stats_analyzer = StatisticalAnalyzer(self.database)
        self.visualizer = CIRFVisualizer(self.database)
        
        logger.info("CIRF Research System initialized")
    
    def run_data_collection(self, max_queries: int = 50) -> Dict[str, Any]:
        """Run complete data collection process"""
        logger.info("Starting data collection...")
        
        # Collect papers
        papers = self.collector.collect_data(max_queries)
        
        # Process papers through CIRF analysis
        processed_count = 0
        failed_count = 0
        
        for paper in papers:
            try:
                failure_case = self.analyzer.process_paper(paper)
                case_id = self.database.insert_failure(failure_case)
                
                if case_id:
                    processed_count += 1
                else:
                    failed_count += 1
                    
            except Exception as e:
                logger.error(f"Error processing paper: {e}")
                failed_count += 1
        
        results = {
            'papers_collected': len(papers),
            'successfully_processed': processed_count,
            'failed_processing': failed_count,
            'total_in_database': self.database.get_statistics()['total_cases']
        }
        
        logger.info(f"Data collection completed: {results}")
        return results
    
    def run_comprehensive_analysis(self) -> Dict[str, Any]:
        """Run comprehensive statistical analysis"""
        logger.info("Starting comprehensive analysis...")
        
        analysis_results = {
            'component_analysis': self.stats_analyzer.component_frequency_analysis(),
            'geographic_analysis': self.stats_analyzer.geographic_analysis(),
            'sector_analysis': self.stats_analyzer.sector_analysis(),
            'correlation_analysis': self.stats_analyzer.correlation_analysis(),
            'temporal_analysis': self.stats_analyzer.temporal_analysis(),
            'cluster_analysis': self.stats_analyzer.cluster_analysis(),
            'database_statistics': self.database.get_statistics()
        }
        
        logger.info("Comprehensive analysis completed")
        return analysis_results
    
    def generate_report(self, analysis_results: Dict) -> str:
        """Generate comprehensive research report"""
        report = []
        
        report.append("# CULTURAL INNOVATION RESILIENCE FRAMEWORK (CIRF) ANALYSIS REPORT\n")
        report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        # Database statistics
        stats = analysis_results.get('database_statistics', {})
        report.append("## DATASET OVERVIEW")
        report.append(f"Total failure cases analyzed: {stats.get('total_cases', 0)}")
        report.append(f"Countries represented: {len(stats.get('by_country', {}))}")
        report.append(f"Sectors analyzed: {len(stats.get('by_sector', {}))}")
        
        # Component analysis
        comp_analysis = analysis_results.get('component_analysis', {})
        if comp_analysis:
            report.append("\n## CIRF COMPONENT VIOLATION ANALYSIS")
            
            # Sort components by violation rate
            sorted_components = sorted(comp_analysis.items(), 
                                     key=lambda x: x[1].get('violation_rate', 0), 
                                     reverse=True)
            
            report.append("### Most Frequently Violated Components:")
            for comp_name, comp_data in sorted_components[:5]:
                rate = comp_data.get('violation_rate', 0) * 100
                report.append(f"- {comp_name}: {rate:.1f}% violation rate")
        
        # Geographic analysis
        geo_analysis = analysis_results.get('geographic_analysis', {})
        if geo_analysis and 'most_common_countries' in geo_analysis:
            report.append("\n## GEOGRAPHIC DISTRIBUTION")
            report.append("### Countries with Most Documented Failures:")
            for country, count in list(geo_analysis['most_common_countries'].items())[:5]:
                report.append(f"- {country}: {count} cases")
        
        # Sector analysis
        sector_analysis = analysis_results.get('sector_analysis', {})
        if sector_analysis and 'most_common_sectors' in sector_analysis:
            report.append("\n## SECTOR ANALYSIS")
            report.append("### Most Vulnerable Sectors:")
            for sector, count in list(sector_analysis['most_common_sectors'].items())[:5]:
                report.append(f"- {sector}: {count} cases")
        
        # Correlation analysis
        corr_analysis = analysis_results.get('correlation_analysis', {})
        if corr_analysis and 'strongest_correlations' in corr_analysis:
            report.append("\n## COMPONENT CORRELATIONS")
            report.append("### Strongest Component Correlations:")
            for corr in corr_analysis['strongest_correlations'][:5]:
                report.append(f"- {corr['component_1']} ↔ {corr['component_2']}: {corr['correlation']:.3f}")
        
        # Cluster analysis
        cluster_analysis = analysis_results.get('cluster_analysis', {})
        if cluster_analysis and 'cluster_statistics' in cluster_analysis:
            report.append("\n## FAILURE PATTERN CLUSTERS")
            report.append(f"Identified {cluster_analysis.get('n_clusters', 0)} distinct failure patterns")
        
        return "\n".join(report)
    
    def export_data(self, format: str = 'csv') -> str:
        """Export data in specified format"""
        df = self.database.get_all_failures()
        
        if format.lower() == 'csv':
            filename = f"cirf_analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
            df.to_csv(filename, index=False)
        elif format.lower() == 'excel':
            filename = f"cirf_analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
            df.to_excel(filename, index=False)
        else:
            raise ValueError(f"Unsupported format: {format}")
        
        logger.info(f"Data exported to {filename}")
        return filename

# ===================================================================
# STREAMLIT DASHBOARD
# ===================================================================

def create_dashboard():
    """Create Streamlit dashboard"""
    st.set_page_config(
        page_title="CIRF Analysis Dashboard",
        page_icon="📊",
        layout="wide"
    )
    
    st.title("Cultural Innovation Resilience Framework (CIRF) Analysis Dashboard")
    
    # Initialize system
    @st.cache_resource
    def get_system():
        return CIRFResearchSystem()
    
    system = get_system()
    
    # Sidebar
    st.sidebar.title("Navigation")
    page = st.sidebar.selectbox("Choose a page", [
        "Overview", "Data Collection", "Analysis", "Visualizations", "Export"
    ])
    
    if page == "Overview":
        st.header("System Overview")
        
        # Display current statistics
        stats = system.database.get_statistics()
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Cases", stats.get('total_cases', 0))
        with col2:
            st.metric("Countries", len(stats.get('by_country', {})))
        with col3:
            st.metric("Sectors", len(stats.get('by_sector', {})))
        
        # Recent activity
        st.subheader("Database Statistics")
        if stats.get('by_country'):
            st.write("**Top Countries:**")
            country_df = pd.DataFrame(list(stats['by_country'].items()), 
                                    columns=['Country', 'Cases'])
            st.dataframe(country_df.head(10))
    
    elif page == "Data Collection":
        st.header("Data Collection")
        
        col1, col2 = st.columns(2)
        
        with col1:
            max_queries = st.number_input("Maximum queries to run", 
                                        min_value=1, max_value=100, value=20)
            
            if st.button("Start Data Collection"):
                with st.spinner("Collecting data..."):
                    results = system.run_data_collection(max_queries)
                    st.success("Data collection completed!")
                    st.json(results)
        
        with col2:
            st.subheader("Collection Status")
            # Show recent search log
            try:
                with sqlite3.connect(system.database.db_path) as conn:
                    log_df = pd.read_sql_query(
                        "SELECT * FROM search_log ORDER BY timestamp DESC LIMIT 10", 
                        conn
                    )
                    if not log_df.empty:
                        st.dataframe(log_df)
            except Exception as e:
                st.warning(f"Could not load search log: {e}")
    
    elif page == "Analysis":
        st.header("Statistical Analysis")
        
        if st.button("Run Comprehensive Analysis"):
            with st.spinner("Running analysis..."):
                analysis_results = system.run_comprehensive_analysis()
                
                # Component analysis
                if 'component_analysis' in analysis_results:
                    st.subheader("Component Violation Rates")
                    comp_data = analysis_results['component_analysis']
                    
                    comp_df = pd.DataFrame([
                        {
                            'Component': comp_name,
                            'Violation Rate (%)': comp_data[comp_name]['violation_rate'] * 100,
                            'Average Score': comp_data[comp_name]['average_score']
                        }
                        for comp_name in comp_data.keys()
                    ])
                    
                    st.dataframe(comp_df.sort_values('Violation Rate (%)', ascending=False))
                
                # Geographic analysis
                if 'geographic_analysis' in analysis_results:
                    st.subheader("Geographic Distribution")
                    geo_data = analysis_results['geographic_analysis']
                    if 'most_common_countries' in geo_data:
                        geo_df = pd.DataFrame(list(geo_data['most_common_countries'].items()),
                                            columns=['Country', 'Cases'])
                        st.bar_chart(geo_df.set_index('Country'))
                
                # Store results in session state for visualizations
                st.session_state['analysis_results'] = analysis_results
    
    elif page == "Visualizations":
        st.header("Data Visualizations")
        
        if 'analysis_results' in st.session_state:
            results = st.session_state['analysis_results']
            
            # Component violations chart
            if 'component_analysis' in results:
                st.subheader("Component Violation Rates")
                fig = system.visualizer.component_violation_chart(results['component_analysis'])
                st.plotly_chart(fig, use_container_width=True)
            
            # Geographic map
            if 'geographic_analysis' in results:
                st.subheader("Geographic Distribution")
                fig = system.visualizer.geographic_distribution_map(results['geographic_analysis'])
                st.plotly_chart(fig, use_container_width=True)
            
            # Sector analysis
            if 'sector_analysis' in results:
                st.subheader("Sector Distribution")
                fig = system.visualizer.sector_analysis_chart(results['sector_analysis'])
                st.plotly_chart(fig, use_container_width=True)
            
            # Correlation heatmap
            if 'correlation_analysis' in results:
                st.subheader("Component Correlations")
                fig = system.visualizer.correlation_heatmap(results['correlation_analysis'])
                st.plotly_chart(fig, use_container_width=True)
        
        else:
            st.info("Please run analysis first to generate visualizations.")
    
    elif page == "Export":
        st.header("Data Export")
        
        col1, col2 = st.columns(2)
        
        with col1:
            format_choice = st.selectbox("Export format", ["CSV", "Excel"])
            
            if st.button("Export Data"):
                try:
                    filename = system.export_data(format_choice.lower())
                    st.success(f"Data exported to {filename}")
                    
                    # Provide download link
                    with open(filename, 'rb') as f:
                        st.download_button(
                            label=f"Download {filename}",
                            data=f.read(),
                            file_name=filename,
                            mime='application/octet-stream'
                        )
                except Exception as e:
                    st.error(f"Export failed: {e}")
        
        with col2:
            st.subheader("Generate Report")
            
            if st.button("Generate Analysis Report"):
                if 'analysis_results' in st.session_state:
                    report = system.generate_report(st.session_state['analysis_results'])
                    st.text_area("Report", report, height=400)
                    
                    # Download report
                    st.download_button(
                        label="Download Report",
                        data=report,
                        file_name=f"cirf_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md",
                        mime='text/markdown'
                    )
                else:
                    st.warning("Please run analysis first to generate report.")

# ===================================================================
# MAIN EXECUTION
# ===================================================================

def main():
    """Main execution function"""
    import argparse
    
    parser = argparse.ArgumentParser(description="CIRF Framework Analysis System")
    parser.add_argument("--mode", choices=["collect", "analyze", "dashboard", "full"], 
                       default="dashboard", help="Operation mode")
    parser.add_argument("--queries", type=int, default=20, 
                       help="Number of search queries for data collection")
    parser.add_argument("--db", default="cirf_analysis.db", 
                       help="Database file path")
    
    args = parser.parse_args()
    
    # Initialize system
    system = CIRFResearchSystem(args.db)
    
    if args.mode == "collect":
        logger.info("Running data collection...")
        results = system.run_data_collection(args.queries)
        print(f"Collection results: {results}")
    
    elif args.mode == "analyze":
        logger.info("Running comprehensive analysis...")
        analysis_results = system.run_comprehensive_analysis()
        
        # Generate report
        report = system.generate_report(analysis_results)
        print(report)
        
        # Save report
        report_file = f"cirf_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
        with open(report_file, 'w') as f:
            f.write(report)
        print(f"\nReport saved to: {report_file}")
    
    elif args.mode == "dashboard":
        logger.info("Starting dashboard...")
        create_dashboard()
    
    elif args.mode == "full":
        logger.info("Running full analysis pipeline...")
        
        # Data collection
        collection_results = system.run_data_collection(args.queries)
        print(f"Data collection: {collection_results}")
        
        # Analysis
        analysis_results = system.run_comprehensive_analysis()
        
        # Generate and save report
        report = system.generate_report(analysis_results)
        report_file = f"cirf_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
        with open(report_file, 'w') as f:
            f.write(report)
        
        # Export data
        data_file = system.export_data('csv')
        
        print(f"\nFull analysis completed!")
        print(f"Report: {report_file}")
        print(f"Data: {data_file}")
        print(f"Database: {args.db}")

if __name__ == "__main__":
    # For Streamlit, run: streamlit run this_file.py
    # For command line, run: python this_file.py --mode full
    
    # Check if running in Streamlit
    try:
        import streamlit.runtime.scriptrunner.script_run_context
        create_dashboard()
    except ImportError:
        main()
