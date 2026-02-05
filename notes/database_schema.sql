-- CIRF Research Database Schema
-- Cultural Innovation Resilience Framework Analysis

-- ===== MAIN TABLES =====

-- Primary table for cultural enterprises
CREATE TABLE cultural_enterprises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Source Information
    source_type TEXT NOT NULL CHECK (source_type IN ('academic', 'government', 'organization', 'news_media', 'report', 'case_study')),
    source_url TEXT,
    citation TEXT,
    doi TEXT,
    data_quality_score REAL CHECK (data_quality_score >= 0 AND data_quality_score <= 1),
    extraction_confidence REAL CHECK (extraction_confidence >= 0 AND extraction_confidence <= 1),
    
    -- Enterprise Basic Information
    enterprise_name TEXT NOT NULL,
    enterprise_type TEXT CHECK (enterprise_type IN ('social_enterprise', 'cooperative', 'private_business', 'nonprofit', 'community_organization', 'hybrid')),
    sector TEXT NOT NULL,
    subsector TEXT,
    business_model TEXT,
    
    -- Geographic Context
    country TEXT NOT NULL,
    region TEXT,
    city TEXT,
    cultural_context TEXT, -- e.g., 'indigenous', 'ethnic_minority', 'rural_traditional'
    community_type TEXT,
    population_size INTEGER,
    
    -- Temporal Information
    start_date DATE,
    end_date DATE,
    evaluation_date DATE NOT NULL,
    enterprise_age_at_evaluation INTEGER,
    data_collection_date DATE DEFAULT CURRENT_DATE,
    
    -- Outcome Classification
    outcome_category TEXT NOT NULL CHECK (outcome_category IN ('success', 'failure', 'mixed', 'unclear', 'ongoing')),
    outcome_confidence REAL CHECK (outcome_confidence >= 0 AND outcome_confidence <= 1),
    outcome_evidence TEXT,
    success_definition TEXT, -- How success was defined in source
    
    -- Financial Metrics (when available)
    initial_investment REAL,
    annual_revenue REAL,
    revenue_year INTEGER,
    employment_count INTEGER,
    employment_year INTEGER,
    customer_base_size INTEGER,
    market_reach TEXT CHECK (market_reach IN ('local', 'regional', 'national', 'international')),
    
    -- CIRF Component Scores (0-1 scale with confidence intervals)
    -- Operational Pillars (1-4)
    cirf_1_economic_value REAL CHECK (cirf_1_economic_value >= 0 AND cirf_1_economic_value <= 1),
    cirf_1_confidence REAL CHECK (cirf_1_confidence >= 0 AND cirf_1_confidence <= 1),
    
    cirf_2_cultural_integrity REAL CHECK (cirf_2_cultural_integrity >= 0 AND cirf_2_cultural_integrity <= 1),
    cirf_2_confidence REAL CHECK (cirf_2_confidence >= 0 AND cirf_2_confidence <= 1),
    
    cirf_3_adaptability REAL CHECK (cirf_3_adaptability >= 0 AND cirf_3_adaptability <= 1),
    cirf_3_confidence REAL CHECK (cirf_3_confidence >= 0 AND cirf_3_confidence <= 1),
    
    cirf_4_social_empowerment REAL CHECK (cirf_4_social_empowerment >= 0 AND cirf_4_social_empowerment <= 1),
    cirf_4_confidence REAL CHECK (cirf_4_confidence >= 0 AND cirf_4_confidence <= 1),
    
    -- Community Control Filters (5-9)
    cirf_5_community_benefit REAL CHECK (cirf_5_community_benefit >= 0 AND cirf_5_community_benefit <= 1),
    cirf_5_confidence REAL CHECK (cirf_5_confidence >= 0 AND cirf_5_confidence <= 1),
    
    cirf_6_cultural_protection REAL CHECK (cirf_6_cultural_protection >= 0 AND cirf_6_cultural_protection <= 1),
    cirf_6_confidence REAL CHECK (cirf_6_confidence >= 0 AND cirf_6_confidence <= 1),
    
    cirf_7_community_relevance REAL CHECK (cirf_7_community_relevance >= 0 AND cirf_7_community_relevance <= 1),
    cirf_7_confidence REAL CHECK (cirf_7_confidence >= 0 AND cirf_7_confidence <= 1),
    
    cirf_8_sustainable_development REAL CHECK (cirf_8_sustainable_development >= 0 AND cirf_8_sustainable_development <= 1),
    cirf_8_confidence REAL CHECK (cirf_8_confidence >= 0 AND cirf_8_confidence <= 1),
    
    cirf_9_dignity_empowerment REAL CHECK (cirf_9_dignity_empowerment >= 0 AND cirf_9_dignity_empowerment <= 1),
    cirf_9_confidence REAL CHECK (cirf_9_confidence >= 0 AND cirf_9_confidence <= 1),
    
    -- Resilience Capacities (10-13)
    cirf_10_protective_capacity REAL CHECK (cirf_10_protective_capacity >= 0 AND cirf_10_protective_capacity <= 1),
    cirf_10_confidence REAL CHECK (cirf_10_confidence >= 0 AND cirf_10_confidence <= 1),
    
    cirf_11_adaptive_capacity REAL CHECK (cirf_11_adaptive_capacity >= 0 AND cirf_11_adaptive_capacity <= 1),
    cirf_11_confidence REAL CHECK (cirf_11_confidence >= 0 AND cirf_11_confidence <= 1),
    
    cirf_12_transformative_capacity REAL CHECK (cirf_12_transformative_capacity >= 0 AND cirf_12_transformative_capacity <= 1),
    cirf_12_confidence REAL CHECK (cirf_12_confidence >= 0 AND cirf_12_confidence <= 1),
    
    cirf_13_generative_capacity REAL CHECK (cirf_13_generative_capacity >= 0 AND cirf_13_generative_capacity <= 1),
    cirf_13_confidence REAL CHECK (cirf_13_confidence >= 0 AND cirf_13_confidence <= 1),
    
    -- Summary Metrics
    total_cirf_score REAL, -- Sum of all component scores
    cirf_percentage REAL, -- Percentage of maximum possible score
    complete_components INTEGER, -- Number of components with score > 0.5
    
    -- Analysis Metadata
    analysis_date DATE DEFAULT CURRENT_DATE,
    analyst_id TEXT,
    validation_status TEXT CHECK (validation_status IN ('pending', 'validated', 'needs_review', 'rejected')),
    automated_analysis BOOLEAN DEFAULT FALSE,
    manual_review_required BOOLEAN DEFAULT TRUE,
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== SUPPORTING TABLES =====

-- Evidence supporting CIRF component scores
CREATE TABLE component_evidence (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enterprise_id INTEGER NOT NULL,
    component_id INTEGER NOT NULL CHECK (component_id >= 1 AND component_id <= 13),
    evidence_text TEXT NOT NULL,
    evidence_type TEXT CHECK (evidence_type IN ('direct_quote', 'numerical_data', 'descriptive_text', 'expert_opinion', 'outcome_measure')),
    confidence_score REAL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    source_location TEXT, -- Page number, section, etc.
    extraction_method TEXT CHECK (extraction_method IN ('manual', 'nlp', 'hybrid')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enterprise_id) REFERENCES cultural_enterprises (id) ON DELETE CASCADE
);

-- Manual validation reviews
CREATE TABLE validation_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enterprise_id INTEGER NOT NULL,
    reviewer_id TEXT NOT NULL,
    review_date DATE DEFAULT CURRENT_DATE,
    
    -- Component scores from reviewer
    reviewer_cirf_scores TEXT, -- JSON object with all 13 scores
    
    -- Review assessment
    data_quality_assessment INTEGER CHECK (data_quality_assessment >= 1 AND data_quality_assessment <= 5),
    outcome_agreement BOOLEAN,
    major_discrepancies TEXT,
    confidence_in_analysis INTEGER CHECK (confidence_in_analysis >= 1 AND confidence_in_analysis <= 5),
    
    -- Reviewer notes
    notes TEXT,
    recommendations TEXT,
    
    -- Review status
    review_status TEXT CHECK (review_status IN ('draft', 'complete', 'needs_revision')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enterprise_id) REFERENCES cultural_enterprises (id) ON DELETE CASCADE
);

-- Source documents and materials
CREATE TABLE source_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enterprise_id INTEGER NOT NULL,
    document_type TEXT CHECK (document_type IN ('academic_paper', 'case_study', 'report', 'news_article', 'website', 'interview', 'survey')),
    title TEXT,
    authors TEXT,
    publication_date DATE,
    publisher TEXT,
    url TEXT,
    doi TEXT,
    pdf_path TEXT,
    full_text TEXT,
    abstract TEXT,
    keywords TEXT,
    language TEXT DEFAULT 'en',
    relevance_score REAL CHECK (relevance_score >= 0 AND relevance_score <= 1),
    processing_status TEXT CHECK (processing_status IN ('pending', 'processed', 'error', 'excluded')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enterprise_id) REFERENCES cultural_enterprises (id) ON DELETE CASCADE
);

-- Data collection sessions and batch processing
CREATE TABLE collection_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_name TEXT NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    source_type TEXT,
    search_query TEXT,
    total_results INTEGER,
    successful_extractions INTEGER,
    failed_extractions INTEGER,
    collection_method TEXT,
    notes TEXT,
    status TEXT CHECK (status IN ('running', 'completed', 'failed', 'paused'))
);

-- Enterprise categories and classifications
CREATE TABLE enterprise_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT UNIQUE NOT NULL,
    category_type TEXT CHECK (category_type IN ('sector', 'cultural_context', 'business_model', 'geographic')),
    description TEXT,
    parent_category_id INTEGER,
    FOREIGN KEY (parent_category_id) REFERENCES enterprise_categories (id)
);

-- Many-to-many relationship for enterprise categories
CREATE TABLE enterprise_category_mapping (
    enterprise_id INTEGER,
    category_id INTEGER,
    PRIMARY KEY (enterprise_id, category_id),
    FOREIGN KEY (enterprise_id) REFERENCES cultural_enterprises (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES enterprise_categories (id) ON DELETE CASCADE
);

-- ===== INDEXES FOR PERFORMANCE =====

-- Indexes on frequently queried columns
CREATE INDEX idx_enterprises_outcome ON cultural_enterprises (outcome_category);
CREATE INDEX idx_enterprises_country ON cultural_enterprises (country);
CREATE INDEX idx_enterprises_sector ON cultural_enterprises (sector);
CREATE INDEX idx_enterprises_cultural_context ON cultural_enterprises (cultural_context);
CREATE INDEX idx_enterprises_analysis_date ON cultural_enterprises (analysis_date);
CREATE INDEX idx_enterprises_total_cirf ON cultural_enterprises (total_cirf_score);

-- Indexes for evidence table
CREATE INDEX idx_evidence_enterprise ON component_evidence (enterprise_id);
CREATE INDEX idx_evidence_component ON component_evidence (component_id);

-- Indexes for validation reviews
CREATE INDEX idx_reviews_enterprise ON validation_reviews (enterprise_id);
CREATE INDEX idx_reviews_date ON validation_reviews (review_date);

-- ===== VIEWS FOR COMMON QUERIES =====

-- View for complete CIRF analysis
CREATE VIEW enterprise_analysis_summary AS
SELECT 
    id,
    enterprise_name,
    country,
    sector,
    outcome_category,
    total_cirf_score,
    cirf_percentage,
    complete_components,
    data_quality_score,
    validation_status,
    analysis_date
FROM cultural_enterprises
WHERE validation_status IN ('validated', 'needs_review');

-- View for statistical analysis
CREATE VIEW cirf_scores_matrix AS
SELECT 
    id,
    outcome_category,
    cirf_1_economic_value, cirf_2_cultural_integrity, cirf_3_adaptability, cirf_4_social_empowerment,
    cirf_5_community_benefit, cirf_6_cultural_protection, cirf_7_community_relevance, 
    cirf_8_sustainable_development, cirf_9_dignity_empowerment,
    cirf_10_protective_capacity, cirf_11_adaptive_capacity, cirf_12_transformative_capacity, cirf_13_generative_capacity,
    total_cirf_score,
    country,
    sector,
    cultural_context
FROM cultural_enterprises
WHERE validation_status = 'validated';

-- ===== TRIGGERS FOR DATA INTEGRITY =====

-- Update total CIRF score when component scores change
CREATE TRIGGER update_cirf_totals
AFTER UPDATE ON cultural_enterprises
FOR EACH ROW
WHEN (
    NEW.cirf_1_economic_value != OLD.cirf_1_economic_value OR
    NEW.cirf_2_cultural_integrity != OLD.cirf_2_cultural_integrity OR
    NEW.cirf_3_adaptability != OLD.cirf_3_adaptability OR
    NEW.cirf_4_social_empowerment != OLD.cirf_4_social_empowerment OR
    NEW.cirf_5_community_benefit != OLD.cirf_5_community_benefit OR
    NEW.cirf_6_cultural_protection != OLD.cirf_6_cultural_protection OR
    NEW.cirf_7_community_relevance != OLD.cirf_7_community_relevance OR
    NEW.cirf_8_sustainable_development != OLD.cirf_8_sustainable_development OR
    NEW.cirf_9_dignity_empowerment != OLD.cirf_9_dignity_empowerment OR
    NEW.cirf_10_protective_capacity != OLD.cirf_10_protective_capacity OR
    NEW.cirf_11_adaptive_capacity != OLD.cirf_11_adaptive_capacity OR
    NEW.cirf_12_transformative_capacity != OLD.cirf_12_transformative_capacity OR
    NEW.cirf_13_generative_capacity != OLD.cirf_13_generative_capacity
)
BEGIN
    UPDATE cultural_enterprises 
    SET 
        total_cirf_score = COALESCE(NEW.cirf_1_economic_value, 0) + 
                          COALESCE(NEW.cirf_2_cultural_integrity, 0) + 
                          COALESCE(NEW.cirf_3_adaptability, 0) + 
                          COALESCE(NEW.cirf_4_social_empowerment, 0) + 
                          COALESCE(NEW.cirf_5_community_benefit, 0) + 
                          COALESCE(NEW.cirf_6_cultural_protection, 0) + 
                          COALESCE(NEW.cirf_7_community_relevance, 0) + 
                          COALESCE(NEW.cirf_8_sustainable_development, 0) + 
                          COALESCE(NEW.cirf_9_dignity_empowerment, 0) + 
                          COALESCE(NEW.cirf_10_protective_capacity, 0) + 
                          COALESCE(NEW.cirf_11_adaptive_capacity, 0) + 
                          COALESCE(NEW.cirf_12_transformative_capacity, 0) + 
                          COALESCE(NEW.cirf_13_generative_capacity, 0),
        cirf_percentage = (COALESCE(NEW.cirf_1_economic_value, 0) + 
                          COALESCE(NEW.cirf_2_cultural_integrity, 0) + 
                          COALESCE(NEW.cirf_3_adaptability, 0) + 
                          COALESCE(NEW.cirf_4_social_empowerment, 0) + 
                          COALESCE(NEW.cirf_5_community_benefit, 0) + 
                          COALESCE(NEW.cirf_6_cultural_protection, 0) + 
                          COALESCE(NEW.cirf_7_community_relevance, 0) + 
                          COALESCE(NEW.cirf_8_sustainable_development, 0) + 
                          COALESCE(NEW.cirf_9_dignity_empowerment, 0) + 
                          COALESCE(NEW.cirf_10_protective_capacity, 0) + 
                          COALESCE(NEW.cirf_11_adaptive_capacity, 0) + 
                          COALESCE(NEW.cirf_12_transformative_capacity, 0) + 
                          COALESCE(NEW.cirf_13_generative_capacity, 0)) / 13.0 * 100,
        complete_components = (CASE WHEN COALESCE(NEW.cirf_1_economic_value, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_2_cultural_integrity, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_3_adaptability, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_4_social_empowerment, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_5_community_benefit, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_6_cultural_protection, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_7_community_relevance, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_8_sustainable_development, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_9_dignity_empowerment, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_10_protective_capacity, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_11_adaptive_capacity, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_12_transformative_capacity, 0) > 0.5 THEN 1 ELSE 0 END) +
                             (CASE WHEN COALESCE(NEW.cirf_13_generative_capacity, 0) > 0.5 THEN 1 ELSE 0 END),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;

-- Update timestamp trigger
CREATE TRIGGER update_timestamp
AFTER UPDATE ON cultural_enterprises
FOR EACH ROW
BEGIN
    UPDATE cultural_enterprises SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;