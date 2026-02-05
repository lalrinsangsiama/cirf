// 🏗️ PROJECT STRUCTURE
/*
cultural-entrepreneurship-org/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   └── seed.sql
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── admin/
│   │   │   ├── profile/
│   │   │   └── contribute/
│   │   ├── research/
│   │   │   ├── reports/
│   │   │   ├── surveys/
│   │   │   └── data/
│   │   ├── publication/
│   │   │   ├── articles/
│   │   │   ├── profiles/
│   │   │   ├── guides/
│   │   │   └── news/
│   │   ├── community/
│   │   │   ├── forums/
│   │   │   ├── mentorship/
│   │   │   └── events/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── articles/
│   │   │   ├── research/
│   │   │   └── surveys/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                 # Shadcn/UI components
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── research/
│   │   │   ├── SurveyBuilder.tsx
│   │   │   ├── DataVisualization.tsx
│   │   │   └── ReportViewer.tsx
│   │   ├── publication/
│   │   │   ├── ArticleEditor.tsx
│   │   │   ├── ArticleCard.tsx
│   │   │   └── AuthorProfile.tsx
│   │   └── community/
│   │       ├── ForumPost.tsx
│   │       ├── UserProfile.tsx
│   │       └── MentorshipMatch.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── auth/
│   │   ├── utils/
│   │   └── validations/
│   ├── hooks/
│   ├── types/
│   └── constants/
└── public/
    ├── images/
    └── icons/
*/

// 🗄️ DATABASE SCHEMA (Supabase SQL)

-- Users and Authentication
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  linkedin_url TEXT,
  twitter_handle TEXT,
  
  -- User roles and permissions
  role TEXT DEFAULT 'reader' CHECK (role IN ('reader', 'contributor', 'researcher', 'editor', 'admin')),
  verified BOOLEAN DEFAULT FALSE,
  
  -- Professional info for cultural entrepreneurs
  industry_focus TEXT[], -- e.g., ['music', 'visual-arts', 'theater']
  business_stage TEXT CHECK (business_stage IN ('idea', 'startup', 'growth', 'established')),
  years_experience INTEGER,
  
  -- Community features
  is_mentor BOOLEAN DEFAULT FALSE,
  mentorship_areas TEXT[],
  available_for_networking BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Publication System
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB, -- Rich text content as JSON
  featured_image_url TEXT,
  
  -- Categorization
  category TEXT NOT NULL CHECK (category IN ('profiles', 'advice', 'insights', 'guides', 'news')),
  tags TEXT[],
  
  -- Author and editorial
  author_id UUID REFERENCES profiles(id),
  editor_id UUID REFERENCES profiles(id),
  
  -- Publication status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'scheduled', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  
  -- SEO and metadata
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  
  -- Engagement metrics
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  
  -- Reading time estimate
  reading_time_minutes INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Research Platform
CREATE TABLE research_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  abstract TEXT,
  methodology TEXT,
  key_findings JSONB,
  content JSONB,
  
  -- Report metadata  
  report_type TEXT CHECK (report_type IN ('survey', 'market-analysis', 'policy', 'case-study', 'white-paper')),
  research_period_start DATE,
  research_period_end DATE,
  sample_size INTEGER,
  geographic_scope TEXT[],
  
  -- Authors and reviewers
  lead_researcher_id UUID REFERENCES profiles(id),
  co_researchers UUID[],
  peer_reviewers UUID[],
  
  -- Publication status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'peer-review', 'revision', 'approved', 'published')),
  published_at TIMESTAMPTZ,
  
  -- Access control
  access_level TEXT DEFAULT 'public' CHECK (access_level IN ('public', 'premium', 'academic')),
  download_count INTEGER DEFAULT 0,
  citation_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Survey System
CREATE TABLE surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  
  -- Survey configuration
  questions JSONB NOT NULL, -- Flexible question structure
  settings JSONB, -- Survey settings (anonymous, multiple responses, etc.)
  
  -- Targeting and distribution
  target_audience TEXT[],
  geographic_scope TEXT[],
  
  -- Timeline and status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'closed', 'analyzing')),
  launch_date TIMESTAMPTZ,
  close_date TIMESTAMPTZ,
  
  -- Ownership
  created_by UUID REFERENCES profiles(id),
  research_team UUID[],
  
  -- Results tracking
  total_responses INTEGER DEFAULT 0,
  target_responses INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID REFERENCES surveys(id),
  respondent_id UUID REFERENCES profiles(id), -- NULL if anonymous
  
  -- Response data
  responses JSONB NOT NULL, -- Flexible response structure
  
  -- Metadata
  completion_time_seconds INTEGER,
  ip_address INET, -- For geographic analysis (if allowed)
  user_agent TEXT,
  
  -- Quality control
  is_complete BOOLEAN DEFAULT FALSE,
  flagged_for_review BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Features
CREATE TABLE forum_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  
  -- Categorization
  category TEXT NOT NULL,
  tags TEXT[],
  
  -- Moderation
  created_by UUID REFERENCES profiles(id),
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  
  -- Engagement
  post_count INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES forum_topics(id),
  author_id UUID REFERENCES profiles(id),
  
  content TEXT NOT NULL,
  
  -- Threading
  parent_post_id UUID REFERENCES forum_posts(id),
  
  -- Moderation
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_reason TEXT,
  
  -- Engagement
  like_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentorship System
CREATE TABLE mentorship_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES profiles(id),
  mentee_id UUID REFERENCES profiles(id),
  
  -- Connection details
  focus_areas TEXT[],
  goals TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused', 'completed', 'cancelled')),
  
  -- Scheduling
  preferred_frequency TEXT, -- 'weekly', 'bi-weekly', 'monthly'
  preferred_format TEXT[], -- 'video-call', 'phone', 'email', 'in-person'
  
  -- Feedback and ratings
  mentor_rating INTEGER CHECK (mentor_rating >= 1 AND mentor_rating <= 5),
  mentee_rating INTEGER CHECK (mentee_rating >= 1 AND mentee_rating <= 5),
  feedback TEXT,
  
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events and Networking
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  
  -- Event details
  event_type TEXT CHECK (event_type IN ('webinar', 'workshop', 'networking', 'conference', 'panel')),
  format TEXT CHECK (format IN ('online', 'in-person', 'hybrid')),
  
  -- Scheduling
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  timezone TEXT,
  
  -- Location (if applicable)
  venue TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  
  -- Registration
  max_participants INTEGER,
  registration_required BOOLEAN DEFAULT TRUE,
  registration_deadline TIMESTAMPTZ,
  
  -- Content and speakers
  speakers UUID[],
  agenda JSONB,
  materials_url TEXT,
  recording_url TEXT,
  
  -- Organization
  organizer_id UUID REFERENCES profiles(id),
  co_organizers UUID[],
  
  -- Status
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('draft', 'upcoming', 'live', 'completed', 'cancelled')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Analytics
CREATE TABLE content_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'article', 'report', 'survey'
  content_id UUID NOT NULL,
  
  -- User interaction
  user_id UUID REFERENCES profiles(id), -- NULL for anonymous
  action TEXT NOT NULL, -- 'view', 'like', 'share', 'download', 'comment'
  
  -- Context
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  
  -- Timing
  session_duration INTEGER, -- in seconds
  page_position INTEGER, -- how far they scrolled
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions and Notifications
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  
  -- Subscription type
  type TEXT NOT NULL CHECK (type IN ('newsletter', 'forum-topic', 'article-category', 'research-updates')),
  target_id UUID, -- ID of what they're subscribed to (topic, category, etc.)
  
  -- Preferences
  frequency TEXT DEFAULT 'weekly' CHECK (frequency IN ('immediate', 'daily', 'weekly', 'monthly')),
  active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_articles_status_published ON articles(status, published_at DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_industry ON profiles USING GIN(industry_focus);

CREATE INDEX idx_survey_responses_survey ON survey_responses(survey_id);
CREATE INDEX idx_forum_posts_topic ON forum_posts(topic_id);
CREATE INDEX idx_forum_posts_author ON forum_posts(author_id);

-- Row Level Security Policies
CREATE POLICY "Users can view published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can manage their articles" ON articles
  FOR ALL USING (author_id = auth.uid());

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (id = auth.uid());

-- Functions for common operations
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables that need auto-updating timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();