"""
Web Scraping Infrastructure for CIRF Research Project
Handles data collection from various online sources
"""

import requests
from bs4 import BeautifulSoup
import time
import logging
from typing import Dict, List, Optional, Any, Union
from urllib.parse import urljoin, urlparse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import json
import os
from datetime import datetime, timedelta
import random
from dataclasses import dataclass
import re
from pathlib import Path

@dataclass
class ScrapingConfig:
    """Configuration for web scraping operations"""
    request_delay: float = 1.0  # Delay between requests in seconds
    max_retries: int = 3
    timeout: int = 30
    user_agent: str = "CIRF-Research-Bot/1.0"
    respect_robots_txt: bool = True
    max_pages_per_source: int = 100
    output_dir: str = "scraped_data"

class CIRFWebScraper:
    """
    Web scraper for collecting cultural entrepreneurship data
    """
    
    def __init__(self, config: Optional[ScrapingConfig] = None):
        """
        Initialize web scraper
        
        Args:
            config: Scraping configuration object
        """
        self.config = config or ScrapingConfig()
        
        # Set up logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Initialize session with headers
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': self.config.user_agent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        })
        
        # Create output directory
        Path(self.config.output_dir).mkdir(parents=True, exist_ok=True)
        
        # Track requests for rate limiting
        self.last_request_time = {}
        
    def _get_domain(self, url: str) -> str:
        """Extract domain from URL"""
        return urlparse(url).netloc
    
    def _rate_limit(self, url: str):
        """Implement rate limiting per domain"""
        domain = self._get_domain(url)
        
        if domain in self.last_request_time:
            elapsed = time.time() - self.last_request_time[domain]
            if elapsed < self.config.request_delay:
                sleep_time = self.config.request_delay - elapsed
                time.sleep(sleep_time)
        
        self.last_request_time[domain] = time.time()
    
    def fetch_page(self, url: str, use_selenium: bool = False) -> Optional[BeautifulSoup]:
        """
        Fetch and parse a web page
        
        Args:
            url: URL to fetch
            use_selenium: Whether to use Selenium for JavaScript-heavy pages
            
        Returns:
            BeautifulSoup object or None if failed
        """
        for attempt in range(self.config.max_retries):
            try:
                self._rate_limit(url)
                
                if use_selenium:
                    return self._fetch_with_selenium(url)
                else:
                    return self._fetch_with_requests(url)
                    
            except Exception as e:
                self.logger.warning(f"Attempt {attempt + 1} failed for {url}: {e}")
                if attempt < self.config.max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
        
        self.logger.error(f"Failed to fetch {url} after {self.config.max_retries} attempts")
        return None
    
    def _fetch_with_requests(self, url: str) -> BeautifulSoup:
        """Fetch page using requests library"""
        response = self.session.get(url, timeout=self.config.timeout)
        response.raise_for_status()
        
        # Log successful fetch
        self.logger.info(f"Fetched: {url} (Status: {response.status_code})")
        
        return BeautifulSoup(response.content, 'html.parser')
    
    def _fetch_with_selenium(self, url: str) -> BeautifulSoup:
        """Fetch page using Selenium WebDriver"""
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument(f'--user-agent={self.config.user_agent}')
        
        driver = webdriver.Chrome(options=chrome_options)
        
        try:
            driver.get(url)
            WebDriverWait(driver, self.config.timeout).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            html = driver.page_source
            self.logger.info(f"Fetched with Selenium: {url}")
            
            return BeautifulSoup(html, 'html.parser')
            
        finally:
            driver.quit()
    
    def extract_enterprise_data(self, soup: BeautifulSoup, url: str, source_type: str) -> Dict[str, Any]:
        """
        Extract cultural entrepreneurship data from parsed HTML
        
        Args:
            soup: BeautifulSoup object
            url: Source URL
            source_type: Type of source (academic, news, report, etc.)
            
        Returns:
            Dictionary containing extracted data
        """
        data = {
            'source_url': url,
            'source_type': source_type,
            'extraction_date': datetime.now().isoformat(),
            'raw_content': str(soup),
            'title': self._extract_title(soup),
            'content_text': self._extract_text_content(soup),
            'meta_data': self._extract_metadata(soup),
        }
        
        # Source-specific extraction
        if source_type == 'academic':
            data.update(self._extract_academic_data(soup))
        elif source_type == 'news_media':
            data.update(self._extract_news_data(soup))
        elif source_type == 'government':
            data.update(self._extract_government_data(soup))
        elif source_type == 'organization':
            data.update(self._extract_organization_data(soup))
        
        return data
    
    def _extract_title(self, soup: BeautifulSoup) -> str:
        """Extract page title"""
        title_tag = soup.find('title')
        if title_tag:
            return title_tag.get_text().strip()
        
        h1_tag = soup.find('h1')
        if h1_tag:
            return h1_tag.get_text().strip()
        
        return "No title found"
    
    def _extract_text_content(self, soup: BeautifulSoup) -> str:
        """Extract main text content from page"""
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
        
        # Get text content
        text = soup.get_text()
        
        # Clean up text
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = ' '.join(chunk for chunk in chunks if chunk)
        
        return text
    
    def _extract_metadata(self, soup: BeautifulSoup) -> Dict[str, str]:
        """Extract metadata from page"""
        metadata = {}
        
        # Meta tags
        for meta in soup.find_all('meta'):
            if meta.get('name'):
                metadata[meta.get('name')] = meta.get('content', '')
            elif meta.get('property'):
                metadata[meta.get('property')] = meta.get('content', '')
        
        # Common structured data
        for script in soup.find_all('script', type='application/ld+json'):
            try:
                structured_data = json.loads(script.string)
                metadata['structured_data'] = structured_data
                break
            except (json.JSONDecodeError, AttributeError):
                continue
        
        return metadata
    
    def _extract_academic_data(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Extract data specific to academic sources"""
        data = {}
        
        # Look for DOI
        doi_patterns = [
            r'doi\.org/([^\s<>"]+)',
            r'DOI:\s*([^\s<>"]+)',
            r'doi:\s*([^\s<>"]+)'
        ]
        
        for pattern in doi_patterns:
            match = re.search(pattern, str(soup), re.IGNORECASE)
            if match:
                data['doi'] = match.group(1)
                break
        
        # Look for authors
        author_selectors = [
            '.author', '.authors', '[class*="author"]',
            '.byline', '[class*="byline"]'
        ]
        
        for selector in author_selectors:
            authors = soup.select(selector)
            if authors:
                data['authors'] = [author.get_text().strip() for author in authors]
                break
        
        # Look for publication date
        date_selectors = [
            '.publication-date', '.pub-date', '[class*="date"]',
            'time[datetime]', '.date'
        ]
        
        for selector in date_selectors:
            date_elem = soup.select_one(selector)
            if date_elem:
                data['publication_date'] = date_elem.get_text().strip()
                break
        
        # Look for abstract
        abstract_selectors = [
            '.abstract', '#abstract', '[class*="abstract"]',
            '.summary', '#summary'
        ]
        
        for selector in abstract_selectors:
            abstract_elem = soup.select_one(selector)
            if abstract_elem:
                data['abstract'] = abstract_elem.get_text().strip()
                break
        
        return data
    
    def _extract_news_data(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Extract data specific to news sources"""
        data = {}
        
        # Look for article date
        date_selectors = [
            'time[datetime]', '.date', '.published', '.timestamp',
            '[class*="date"]', '[class*="time"]'
        ]
        
        for selector in date_selectors:
            date_elem = soup.select_one(selector)
            if date_elem:
                data['publication_date'] = date_elem.get('datetime') or date_elem.get_text().strip()
                break
        
        # Look for author
        author_selectors = [
            '.author', '.byline', '[rel="author"]',
            '[class*="author"]', '[class*="byline"]'
        ]
        
        for selector in author_selectors:
            author_elem = soup.select_one(selector)
            if author_elem:
                data['author'] = author_elem.get_text().strip()
                break
        
        return data
    
    def _extract_government_data(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Extract data specific to government sources"""
        data = {}
        
        # Look for publication information
        pub_selectors = [
            '.publication-info', '.document-info', '.report-info'
        ]
        
        for selector in pub_selectors:
            pub_elem = soup.select_one(selector)
            if pub_elem:
                data['publication_info'] = pub_elem.get_text().strip()
                break
        
        return data
    
    def _extract_organization_data(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Extract data specific to organization sources"""
        data = {}
        
        # Look for organization name
        org_selectors = [
            '.organization', '.org-name', '.site-title',
            'header .logo', '.brand'
        ]
        
        for selector in org_selectors:
            org_elem = soup.select_one(selector)
            if org_elem:
                data['organization'] = org_elem.get_text().strip()
                break
        
        return data
    
    def search_google_scholar(self, query: str, num_results: int = 20) -> List[Dict[str, Any]]:
        """
        Search Google Scholar for academic papers
        
        Args:
            query: Search query
            num_results: Number of results to retrieve
            
        Returns:
            List of paper metadata
        """
        results = []
        
        try:
            from scholarly import scholarly
            
            search_query = scholarly.search_pubs(query)
            
            for i, paper in enumerate(search_query):
                if i >= num_results:
                    break
                
                result = {
                    'title': paper.get('title', ''),
                    'authors': paper.get('author', []),
                    'year': paper.get('year', ''),
                    'venue': paper.get('venue', ''),
                    'abstract': paper.get('abstract', ''),
                    'url': paper.get('url', ''),
                    'citations': paper.get('citations', 0),
                    'source_type': 'academic'
                }
                
                results.append(result)
                time.sleep(self.config.request_delay)
            
            self.logger.info(f"Found {len(results)} papers for query: {query}")
            
        except Exception as e:
            self.logger.error(f"Google Scholar search failed: {e}")
        
        return results
    
    def scrape_url_list(self, urls: List[str], source_type: str) -> List[Dict[str, Any]]:
        """
        Scrape a list of URLs
        
        Args:
            urls: List of URLs to scrape
            source_type: Type of source
            
        Returns:
            List of extracted data
        """
        results = []
        
        for i, url in enumerate(urls):
            self.logger.info(f"Scraping {i+1}/{len(urls)}: {url}")
            
            soup = self.fetch_page(url)
            if soup:
                data = self.extract_enterprise_data(soup, url, source_type)
                results.append(data)
            
            # Add some randomization to avoid being blocked
            time.sleep(random.uniform(0.5, 2.0))
        
        return results
    
    def save_results(self, results: List[Dict[str, Any]], filename: str):
        """
        Save scraping results to file
        
        Args:
            results: List of scraped data
            filename: Output filename
        """
        output_path = Path(self.config.output_dir) / filename
        
        # Save as JSON
        with open(output_path.with_suffix('.json'), 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False, default=str)
        
        # Save as CSV (flattened structure)
        df = pd.json_normalize(results)
        df.to_csv(output_path.with_suffix('.csv'), index=False)
        
        self.logger.info(f"Saved {len(results)} results to {output_path}")
    
    def generate_search_urls(self, search_terms: List[str], sites: List[str]) -> List[str]:
        """
        Generate search URLs for different sites
        
        Args:
            search_terms: List of search terms
            sites: List of websites to search
            
        Returns:
            List of search URLs
        """
        urls = []
        
        for term in search_terms:
            for site in sites:
                if 'google.com' in site:
                    # Google search with site restriction
                    url = f"https://www.google.com/search?q={term}+site:{site}"
                elif 'scholar.google.com' in site:
                    # Google Scholar search
                    url = f"https://scholar.google.com/scholar?q={term}"
                else:
                    # Generic site search (would need site-specific implementation)
                    continue
                
                urls.append(url)
        
        return urls


# Example usage and configuration
class CIRFSearchTerms:
    """Predefined search terms for CIRF research"""
    
    PRIMARY_TERMS = [
        "cultural entrepreneurship",
        "indigenous business",
        "cultural enterprise",
        "traditional craft business",
        "cultural tourism business",
        "ethnic minority business",
        "social enterprise cultural",
        "community cultural enterprise"
    ]
    
    OUTCOME_MODIFIERS = [
        "success", "successful", "failure", "failed",
        "case study", "analysis", "evaluation"
    ]
    
    SECTORS = [
        "tourism", "crafts", "artisan", "heritage",
        "festival", "cooperative", "creative industries"
    ]
    
    @classmethod
    def generate_compound_terms(cls) -> List[str]:
        """Generate compound search terms"""
        terms = []
        
        for primary in cls.PRIMARY_TERMS:
            terms.append(primary)
            
            for modifier in cls.OUTCOME_MODIFIERS:
                terms.append(f"{primary} {modifier}")
            
            for sector in cls.SECTORS:
                terms.append(f"{primary} {sector}")
        
        return terms


# Usage example
if __name__ == "__main__":
    # Initialize scraper
    config = ScrapingConfig(
        request_delay=2.0,
        max_retries=3,
        output_dir="cirf_scraped_data"
    )
    
    scraper = CIRFWebScraper(config)
    
    # Example: Search Google Scholar
    search_terms = CIRFSearchTerms.generate_compound_terms()[:5]  # Test with first 5 terms
    
    all_results = []
    for term in search_terms:
        results = scraper.search_google_scholar(term, num_results=10)
        all_results.extend(results)
        time.sleep(5)  # Be respectful to Google Scholar
    
    # Save results
    if all_results:
        scraper.save_results(all_results, "scholar_results")
        print(f"Collected {len(all_results)} academic papers")
    
    # Example: Scrape specific URLs (if you have them)
    # urls = ["https://example.com/cultural-enterprise-case-study"]
    # results = scraper.scrape_url_list(urls, "case_study")
    # scraper.save_results(results, "case_study_results")
