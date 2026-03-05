# Resource Creation Prompts for CIL Platform

Use each prompt below in a separate Claude conversation. Copy-paste the prompt, get the output, then save it for upload to Supabase Storage bucket `resources`.

**Storage paths** (must match `storagePath` in `src/lib/data/resourcesConfig.ts`):
- `CIL-Global-Funding-Guide-2026.pdf`
- `CIL-Creative-Reconstruction-Framework.pdf`
- `CIL-Cultural-Innovation-Playbook.pdf`
- `CIL-Innovation-Readiness-Action-Plan.pdf`
- `CIL-Impact-Report-Template.docx`
- `CIL-Sustainability-Succession-Guide.pdf`
- `CIL-Pricing-Strategy-Workbook.pdf`

**For premium upsells** (future paid products):
- `premium/CIL-Market-Entry-Masterclass.zip`
- `premium/CIL-Cultural-Brand-Toolkit.zip`
- `premium/CIL-Grant-Writing-Toolkit.zip`

---

## PROMPT 1: Global Funding Guide 2026
**Unlocked by:** CIL Assessment completion
**File:** `CIL-Global-Funding-Guide-2026.pdf` (~4.2 MB target with formatting)

```
You are a research consultant specialising in cultural enterprise funding and creative economy finance. Create a comprehensive, professional funding guide document.

DOCUMENT TITLE: CIL Global Funding Guide for Cultural Entrepreneurs 2026

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
BRAND VOICE: Warm, expert, empowering. Write for cultural entrepreneurs who may not have business degrees but are smart, passionate, and resourceful. Avoid jargon. Use "you" and "your" throughout.

DOCUMENT STRUCTURE:

1. WELCOME & HOW TO USE THIS GUIDE (1 page)
   - Brief intro: "This guide exists because cultural entrepreneurs deserve the same access to capital as tech startups."
   - How to navigate the guide (by region, by type, by stage)
   - When to revisit (quarterly updates note)

2. UNDERSTANDING THE FUNDING LANDSCAPE (2-3 pages)
   - Types of funding explained simply: Grants, Equity, Debt, Revenue-based, Crowdfunding, Prizes/Competitions, In-kind support
   - Which type suits which stage (pre-revenue, early, growth, established)
   - A visual decision tree: "Which funding type is right for you?"
   - Cultural-specific considerations (IP ownership, community benefit requirements, cultural sensitivity clauses)

3. GLOBAL GRANTS & PUBLIC FUNDING (8-10 pages)
   Organize by region with 200+ specific funding sources. For each entry include:
   - Fund/Programme name
   - Organisation
   - Typical grant size (range)
   - Eligibility summary (1 line)
   - Website URL
   - Application cycle (if known: annual, rolling, quarterly)
   - Cultural sectors covered

   Regions to cover:
   a) AFRICA (30+ sources)
      - Pan-African funds (African Development Bank culture programs, African Union cultural grants)
      - East Africa (Kenya, Tanzania, Ethiopia, Rwanda)
      - West Africa (Nigeria, Ghana, Senegal)
      - Southern Africa (South Africa, Zimbabwe, Botswana)
      - North Africa (Morocco, Egypt, Tunisia)

   b) ASIA-PACIFIC (30+ sources)
      - South Asia (India, Bangladesh, Sri Lanka, Nepal, Pakistan)
      - Southeast Asia (Indonesia, Philippines, Thailand, Vietnam, Malaysia)
      - East Asia (Japan, South Korea, Taiwan)
      - Pacific Islands (Fiji, Samoa, Papua New Guinea, Tonga)
      - Australia & New Zealand

   c) EUROPE (40+ sources)
      - EU-wide programs (Creative Europe, Horizon Europe culture streams, European Cultural Foundation)
      - UK (Arts Council England, Creative Scotland, Arts Council of Wales, British Council)
      - Nordics (Nordic Culture Fund, national arts councils)
      - Western Europe (France, Germany, Netherlands, Belgium, Spain, Italy, Portugal)
      - Eastern Europe & Balkans (Visegrad Fund, national programs)

   d) AMERICAS (30+ sources)
      - USA (NEA, state arts councils, private foundations — Ford, Mellon, Kresge, Surdna)
      - Canada (Canada Council for the Arts, provincial councils)
      - Latin America & Caribbean (FONCA Mexico, Fundacion Jumex, Ibercultura, national funds)

   e) MIDDLE EAST (15+ sources)
      - UAE (Abu Dhabi Cultural Foundation, Sharjah Art Foundation)
      - Saudi Arabia (Vision 2030 cultural programs)
      - Qatar, Oman, Jordan, Lebanon

   f) INTERNATIONAL / MULTI-REGIONAL (25+ sources)
      - UNESCO (IFCD, Creative Cities Network funding)
      - British Council (global programs)
      - Goethe-Institut
      - Ford Foundation international
      - Prince Claus Fund
      - HIVOS
      - Swiss Arts Council Pro Helvetia
      - Alliance Francaise
      - Japan Foundation
      - Korea Foundation

4. IMPACT INVESTORS & SOCIAL ENTERPRISE FINANCE (3-4 pages)
   - What impact investors look for in cultural enterprises
   - Key impact investment firms interested in creative/cultural economy
   - Social enterprise lenders (Resonance, Big Society Capital, Calvert, Root Capital)
   - Blended finance models for culture
   - How to structure a cultural enterprise for investment readiness

5. CROWDFUNDING & COMMUNITY FINANCE (2-3 pages)
   - Best platforms for cultural products (Kickstarter, Indiegogo, GlobalGiving, Kiva)
   - Region-specific platforms (M-Changa Africa, Milaap India, Ulule Europe)
   - Tips for successful cultural crowdfunding campaigns
   - Community shares and cooperative models
   - Diaspora investment networks

6. PRIZES, COMPETITIONS & ACCELERATORS (3-4 pages)
   - Major cultural innovation prizes globally (50+ listed)
   - Accelerator programs for creative/cultural enterprises
   - Pitch competition circuit
   - How to find and enter competitions strategically

7. APPLICATION TOOLKIT (4-5 pages)
   - Grant application template (fill-in-the-blank structure)
   - Budget template for cultural projects (with cultural-specific line items like: master artisan fees, community consultation, raw material sourcing, cultural IP licensing)
   - Impact measurement framework for applications (use CIL terminology: Cultural Capital, Innovation Activities, Organizational Capacities, Economic Resilience)
   - Common mistakes that get cultural applications rejected
   - Timeline planner: 12-month funding calendar template

8. APPENDICES
   - Glossary of funding terms
   - Country-by-country regulatory notes for receiving international grants
   - Template: Letter of support from community leaders
   - Template: Cultural impact statement

FORMAT REQUIREMENTS:
- Write the COMPLETE text content, fully fleshed out — every section, every funding source entry, every template
- Use clear headers and sub-headers for easy navigation
- Use tables for funding source listings (Name | Organisation | Amount | Eligibility | URL | Cycle)
- Include practical tips in callout boxes marked with [TIP]
- Include warnings in boxes marked with [WARNING]
- Total length: 12,000-15,000 words
- Every funding source should be REAL and currently active (as of 2025-2026). Do not invent fictional funds.
- Where you are uncertain about a specific detail, mark it with [VERIFY] so we can fact-check

The user will format this into a designed PDF. Output clean, well-structured text with clear section breaks.
```

---

## PROMPT 2: Creative Reconstruction Framework
**Unlocked by:** CIL Assessment completion
**File:** `CIL-Creative-Reconstruction-Framework.pdf`

```
You are a cultural innovation strategist and academic researcher. Create a comprehensive framework document that bridges theory and practice for cultural entrepreneurs.

DOCUMENT TITLE: CIL Creative Reconstruction Framework

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
CONTEXT: This is a core intellectual framework of the CIL platform. "Creative Reconstruction" is the idea that cultural heritage can be innovatively reconstructed — not destroyed or frozen, but evolved — to create economic resilience while preserving cultural integrity. This is analogous to Schumpeter's "Creative Destruction" but applied to culture, where the goal is reconstruction (building upon), not destruction.

BRAND VOICE: Scholarly yet accessible. This document should feel authoritative enough for a policymaker or academic but practical enough for a craftsperson or community leader.

DOCUMENT STRUCTURE:

1. EXECUTIVE SUMMARY (1 page)
   - What Creative Reconstruction is
   - Why it matters now (post-COVID, post-AI, climate change, globalisation pressures)
   - Who this framework is for
   - How to use this document

2. THE CASE FOR CREATIVE RECONSTRUCTION (3-4 pages)
   - The problem: Cultural enterprises face a false binary — "preserve tradition exactly" vs. "modernise and lose identity"
   - The opportunity: A third path where innovation and heritage reinforce each other
   - Evidence from the field: Brief case examples (3-4) showing the spectrum from "frozen heritage" to "cultural destruction" to "creative reconstruction"
   - Key research foundations:
     * Schumpeter's Creative Destruction reframed
     * Sen's Capability Approach applied to cultural communities
     * Florida's Creative Economy critiqued and evolved
     * Throsby's Cultural Capital framework
     * UNCTAD Creative Economy reports
   - The economic argument: Data on cultural industries' contribution to GDP, employment, exports

3. THE CREATIVE RECONSTRUCTION MODEL (4-5 pages)
   - Visual model description: Four interconnected dimensions (describe for designer to create)

   a) CULTURAL CAPITAL (the foundation)
      - Definition: The accumulated cultural knowledge, practices, artefacts, and relationships that a community holds
      - Sub-components: Tangible heritage, Intangible heritage, Cultural knowledge systems, Community networks
      - How to assess: Key indicators and questions
      - The preservation-innovation spectrum

   b) INNOVATION ACTIVITIES (the engine)
      - Definition: Deliberate actions that apply cultural capital in new ways to create value
      - Types of cultural innovation: Product, Process, Market, Organisational, Social
      - The Innovation Intensity framework: measuring how much innovation vs. preservation
      - Cultural integrity checks: Ensuring innovation serves the culture, not just the market

   c) ORGANISATIONAL CAPACITIES (the structure)
      - Definition: The internal capabilities that enable sustained innovation
      - Key capacities: Leadership, Knowledge management, Financial literacy, Digital capability, Partnership networks
      - Capacity building pathways for different enterprise sizes
      - The role of mentorship and intergenerational knowledge transfer

   d) ECONOMIC RESILIENCE (the outcome)
      - Definition: The ability to withstand economic shocks while maintaining cultural integrity
      - Resilience indicators: Revenue diversity, Market access, Savings/reserves, Adaptive capacity
      - The resilience-fragility spectrum
      - How cultural capital acts as a buffer during crises (with evidence)

4. THE CREATIVE RECONSTRUCTION PROCESS (4-5 pages)
   Step-by-step implementation guide:

   Step 1: CULTURAL AUDIT
   - Map your cultural assets (tangible and intangible)
   - Identify what is sacred/non-negotiable vs. what can evolve
   - Community consultation process template
   - Output: Cultural Asset Inventory

   Step 2: INNOVATION SCAN
   - Identify market opportunities that align with cultural strengths
   - Analyse competitor landscape (other cultural enterprises, mass-market alternatives)
   - Technology assessment: What tools could amplify your culture, not replace it?
   - Output: Innovation Opportunity Map

   Step 3: DESIGN & PROTOTYPE
   - Co-creation with community stakeholders
   - Cultural integrity review process
   - Minimum Viable Cultural Product (MVCP) concept
   - Testing with both cultural community AND market
   - Output: Validated Cultural Innovation

   Step 4: SCALE & SUSTAIN
   - Pricing for cultural value (not just cost-plus)
   - Building distribution channels that respect cultural context
   - Knowledge transfer systems (so innovation doesn't die with one person)
   - Measuring impact across all four dimensions
   - Output: Sustainable Cultural Enterprise Model

   Step 5: ECOSYSTEM BUILDING
   - Connecting with other cultural innovators
   - Policy advocacy for cultural innovation support
   - Building collective bargaining power
   - Creating shared infrastructure (marketing, logistics, quality standards)
   - Output: Cultural Innovation Ecosystem

5. CASE STUDIES (4-5 pages)
   12 detailed case studies from different countries and cultural contexts:

   For each case study provide:
   - Enterprise/community name and location
   - Cultural tradition involved
   - The challenge they faced
   - Their Creative Reconstruction approach
   - Results (economic, cultural, social)
   - Key lesson

   Aim for geographic diversity:
   - 2 from Africa (e.g., Kente weaving in Ghana, Maasai beadwork enterprise)
   - 2 from South/Southeast Asia (e.g., Indian handloom cooperatives, Thai silk innovation)
   - 2 from East Asia (e.g., Japanese craft revival, Korean hanbok modernisation)
   - 2 from Latin America (e.g., Mexican alebrijes, Peruvian textile cooperatives)
   - 2 from Europe (e.g., Scottish whisky heritage innovation, Italian slow food movement)
   - 1 from Pacific Islands (e.g., Maori cultural enterprise in New Zealand)
   - 1 from Middle East/North Africa (e.g., Moroccan zellige tile innovation)

   Use REAL enterprises and case studies where possible. Mark fictional/composite cases with [COMPOSITE].

6. WORKSHEETS & PLANNING TEMPLATES (3-4 pages)
   Include these fill-in templates:

   a) Cultural Asset Inventory Worksheet
      - Table: Asset | Type (Tangible/Intangible) | Current Use | Innovation Potential | Sensitivity Level (Sacred/Flexible/Open)

   b) Innovation Opportunity Canvas
      - Cultural Strength → Market Need → Innovation Idea → Cultural Risk → Economic Potential

   c) Creative Reconstruction Scorecard
      - Self-assessment grid aligned with CIL's 4 dimensions
      - Scoring rubric (1-7 scale matching CIL assessment)

   d) 90-Day Action Plan Template
      - Week-by-week breakdown with milestones

   e) Community Consultation Guide
      - Who to consult
      - Questions to ask
      - How to handle disagreements about innovation boundaries

7. ASSESSMENT RUBRICS (2 pages)
   - How to self-evaluate using the CIL framework
   - Connecting this framework to the CIL online assessment
   - Interpreting your scores: Emerging → Developing → Established → Thriving
   - When to reassess (recommended: every 6-12 months)

8. REFERENCES & FURTHER READING (1-2 pages)
   - Academic sources cited throughout
   - Recommended books, reports, and online resources
   - CIL platform tools and assessments that complement this framework

FORMAT REQUIREMENTS:
- Write the COMPLETE text content — every section fully written out, every worksheet fully structured
- Total length: 10,000-14,000 words
- Academic rigour with practical accessibility
- Include [FIGURE: description] markers where visual diagrams should go
- Include [CALLOUT: text] for highlighted insights
- Include [WORKSHEET: title] before each template
- Use real academic citations where possible; mark uncertain ones with [VERIFY]
- The tone should make a village craftsperson feel respected and a university professor feel engaged
```

---

## PROMPT 3: Cultural Innovation Playbook
**Unlocked by:** CIMM Assessment completion
**File:** `CIL-Cultural-Innovation-Playbook.pdf`

```
You are a cultural innovation strategist with deep experience working with heritage-based enterprises globally. Create a practical, action-oriented playbook.

DOCUMENT TITLE: The Cultural Innovation Playbook: 20 Strategies for Blending Tradition with Modern Markets

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
AUDIENCE: Cultural entrepreneurs who have completed both the CIL and CIMM assessments. They understand their cultural innovation measurement scores and want concrete strategies to improve.

BRAND VOICE: Practical, energetic, and encouraging. Like a mentor who has seen it all and wants to share what works. Use "you/your" throughout.

DOCUMENT STRUCTURE:

1. INTRODUCTION (1-2 pages)
   - "You've measured your cultural innovation. Now let's build it."
   - How to use this playbook: Pick the strategies most relevant to your CIMM scores
   - Quick reference: Strategy matrix by CIMM dimension (Innovation Depth, Cultural Integrity, Economic Impact, Innovation Velocity)

2. THE 20 STRATEGIES (15-18 pages total, ~1 page each)

   For EACH strategy, provide this consistent structure:
   - STRATEGY NAME (catchy, memorable)
   - ONE-LINE SUMMARY
   - WHAT IT IS (2-3 sentences)
   - WHY IT WORKS (2-3 sentences with evidence/logic)
   - HOW TO DO IT (numbered step-by-step, 4-6 steps)
   - REAL EXAMPLE (specific enterprise/community that used this approach)
   - CIMM DIMENSIONS IT IMPROVES (which scores this helps)
   - DIFFICULTY LEVEL (Easy / Medium / Hard)
   - TIME TO IMPLEMENT (weeks/months)
   - COST LEVEL (Free / Low / Medium / High)

   The 20 strategies should cover:

   INNOVATION DEPTH STRATEGIES (5):
   1. The Heritage Remix — Taking a traditional product and creating a contemporary variant while keeping the core craft
   2. Cross-Cultural Fusion — Combining techniques or aesthetics from two cultural traditions (with ethical guidelines)
   3. Digital Heritage Layer — Adding digital experiences (AR, QR stories, NFTs) to physical cultural products
   4. Process Innovation — Improving production efficiency without changing the product's cultural character
   5. New Context, Same Craft — Taking a traditional craft into entirely new market contexts (e.g., traditional weaving → fashion/architecture/tech accessories)

   CULTURAL INTEGRITY STRATEGIES (5):
   6. The Sacred Line — Establishing clear community-agreed boundaries on what can and cannot be innovated
   7. Elder-Youth Co-Creation — Structured programs pairing tradition-holders with young innovators
   8. Provenance Storytelling — Building the cultural story into every customer touchpoint
   9. Cultural IP Protection — Practical steps to protect traditional knowledge and designs
   10. Community Benefit Sharing — Models for ensuring innovation profits flow back to source communities

   ECONOMIC IMPACT STRATEGIES (5):
   11. Premium Positioning — Commanding higher prices through cultural authenticity certification
   12. The Cultural Tourism Bundle — Packaging products with experiences (workshops, visits, stories)
   13. B2B Cultural Licensing — Licensing cultural designs/patterns to larger companies (with control retained)
   14. Collective Marketing — Forming cooperatives or associations for market access
   15. Export Readiness — Preparing cultural products for international markets

   INNOVATION VELOCITY STRATEGIES (5):
   16. Rapid Prototyping for Culture — Testing new cultural product ideas quickly with minimal risk
   17. The Innovation Sprint — A structured 2-week process for generating and testing one new idea
   18. Digital-First Testing — Using social media and e-commerce to test demand before production
   19. Learning Networks — Joining or creating peer groups for shared innovation learning
   20. Fail Forward Rituals — Creating a culture where failed experiments are valued and learned from

3. INNOVATION CANVAS TEMPLATE (2 pages)
   A fill-in canvas specifically designed for cultural products:
   - Cultural Asset (What tradition/knowledge/skill are you building on?)
   - Innovation Idea (What's the new element?)
   - Cultural Risk Assessment (What could go wrong culturally?)
   - Target Customer (Who wants this? Why?)
   - Value Proposition (Why is this better than alternatives?)
   - Cultural Integrity Check (Would your elders/community approve?)
   - Revenue Model (How do you make money?)
   - Success Metrics (How do you know it worked — both culturally and economically?)

4. CASE STUDIES FROM 15 COUNTRIES (3-4 pages)
   Brief, punchy case studies (150-200 words each) covering:
   - Japan: Traditional indigo dyeing → contemporary fashion
   - Ghana: Kente cloth → modern interior design
   - Mexico: Oaxacan pottery → international art market
   - India: Madhubani painting → digital prints and home decor
   - Peru: Andean textiles → luxury fashion collaborations
   - South Korea: Hanji paper craft → contemporary art and packaging
   - Morocco: Zellige tiles → global architecture demand
   - Italy: Murano glass → contemporary design collaborations
   - Nigeria: Adire fabric → global fashion brands
   - New Zealand: Maori carving → contemporary sculpture and architecture
   - Guatemala: Mayan weaving → fair trade fashion
   - Indonesia: Batik → UNESCO recognition and global market
   - Scotland: Harris Tweed → luxury fashion resurgence
   - Colombia: Wayuu mochila bags → international fashion accessory
   - Thailand: Celadon pottery → hotel and restaurant supply chains

   Use REAL examples. Mark composites with [COMPOSITE].

5. CULTURAL INTEGRITY CHECKLIST (1 page)
   A practical YES/NO checklist for evaluating any new product or innovation:
   - 15-20 questions covering cultural respect, community consent, benefit sharing, authenticity, and sustainability

6. GO-TO-MARKET TIMELINE TEMPLATE (1 page)
   - 6-month timeline from idea to market
   - Month-by-month milestones
   - Key decision points and community check-ins

FORMAT REQUIREMENTS:
- Write COMPLETE text — every strategy fully written, every example detailed
- Total length: 10,000-13,000 words
- Energetic, practical tone throughout
- Use [FIGURE: description] for visual suggestions
- Use [TIP] for practical tips
- Use [WARNING] for cultural sensitivity warnings
- Make it feel like a mentor sitting next to you, not a textbook
```

---

## PROMPT 4: Innovation Readiness Action Plan
**Unlocked by:** CIRA Assessment completion
**File:** `CIL-Innovation-Readiness-Action-Plan.pdf`

```
You are an organisational development consultant specialising in cultural enterprises and innovation readiness. Create an action-oriented planning document.

DOCUMENT TITLE: Innovation Readiness Action Plan: From Assessment to Action

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
AUDIENCE: Cultural entrepreneurs who have completed the CIRA (Cultural Innovation Readiness Assessment) and received scores across 4 dimensions: Cultural Capital Inventory, Innovation Ecosystem, Barriers Assessment, and Readiness Indicators. They know their weak spots and want a concrete plan.

BRAND VOICE: Coach-like, structured, motivating. This is a working document, not a reading document. It should feel like a personal planning session.

DOCUMENT STRUCTURE:

1. HOW TO USE THIS ACTION PLAN (1 page)
   - "Your CIRA scores told you WHERE you stand. This plan tells you WHAT TO DO NEXT."
   - Instructions: Look up your weakest CIRA dimension → Go to that section → Follow the 90-day plan
   - Explain the plan structure: each section has a diagnostic, priorities, and week-by-week actions

2. 90-DAY ACTION PLAN BY DIMENSION (12-14 pages, ~3 pages each)

   For EACH of the 4 CIRA dimensions, provide:

   a) CULTURAL CAPITAL INVENTORY (for those who scored low on cultural assets awareness)
      - DIAGNOSTIC: "If you scored low here, it means..."
      - PRIORITY ACTIONS (ranked 1-5):
        1. Map all tangible cultural assets (buildings, tools, materials, products)
        2. Document intangible assets (knowledge, techniques, songs, stories, relationships)
        3. Identify asset gaps (what's being lost, what's undocumented)
        4. Assess asset quality and condition
        5. Create a cultural asset register
      - 90-DAY PLAN:
        * Weeks 1-2: Asset discovery (interviews, inventory walks, community mapping)
        * Weeks 3-4: Documentation (photos, videos, written records, skill mapping)
        * Weeks 5-6: Gap analysis (what's missing, what's at risk)
        * Weeks 7-8: Quality assessment and preservation priorities
        * Weeks 9-10: Digital archive creation
        * Weeks 11-12: Asset register completion and sharing with community
      - TOOLS: Provide actual templates/worksheets for each step
      - SUCCESS METRICS: How to know you've improved

   b) INNOVATION ECOSYSTEM (for those who scored low on external connections)
      - Same structure as above
      - Focus on: network mapping, partnership identification, market research, mentor finding, peer group creation, institutional connections

   c) BARRIERS ASSESSMENT (for those who scored high on barriers / low on barrier management)
      - Same structure as above
      - Focus on: barrier identification, prioritisation matrix, root cause analysis, barrier-removal strategies, resource mobilisation, advocacy for policy change
      - Include specific barrier types: financial, regulatory, skills, market access, technology, cultural resistance, appropriation fear

   d) READINESS INDICATORS (for those who scored low on innovation readiness)
      - Same structure as above
      - Focus on: leadership development, team skills audit, financial planning, technology adoption, market testing capability, measurement systems

3. BARRIER PRIORITISATION MATRIX (2 pages)
   - A fill-in 2x2 matrix: Impact (high/low) x Effort to Remove (high/low)
   - Instructions for plotting your barriers
   - Decision rules: Quick wins (high impact, low effort) → Do first; Strategic projects (high impact, high effort) → Plan for; Low-hanging fruit (low impact, low effort) → Delegate; Drop (low impact, high effort) → Ignore for now
   - Worked example with a fictional cultural enterprise

4. RESOURCE MAPPING WORKSHEET (2 pages)
   Three mapping templates:

   a) SKILLS MAP
   - Table: Skill Needed | Current Level (1-5) | Who Has It | How to Build It | Timeline
   - Pre-populated with common cultural enterprise skills: craft technique, digital marketing, financial management, export logistics, IP law, community facilitation

   b) FUNDING MAP
   - Table: Funding Need | Amount | Potential Sources | Application Deadline | Status
   - Cross-reference with CIL Global Funding Guide

   c) PARTNERSHIP MAP
   - Table: Partner Type | Specific Organisation | Contact Person | Relationship Status | Next Action
   - Partner types: Suppliers, Distributors, Government, NGOs, Universities, Media, Cultural institutions

5. SKILL GAP ANALYSIS & TRAINING PLANNER (2 pages)
   - Self-assessment grid for 12 key cultural enterprise skills
   - Scoring rubric for each skill (1-5 with descriptions)
   - Training resource recommendations for each skill gap (free and paid options)
   - Mentorship matching guidance

6. CULTURAL APPROPRIATION RISK ASSESSMENT (1-2 pages)
   A practical checklist for cultural entrepreneurs to assess whether an innovation crosses ethical lines:
   - 15 questions organised into: Consent, Context, Credit, Compensation, Community Benefit
   - Traffic light system: Green (proceed), Amber (proceed with caution), Red (stop and reconsider)
   - What to do if you identify a risk
   - How to build protective structures

7. MILESTONE TRACKER (1 page)
   - 12-week tracker template with:
     * Week number
     * Planned action
     * Completed (Y/N)
     * Notes/Learnings
     * Next week priority
   - Instructions for weekly 15-minute self-check-ins

FORMAT REQUIREMENTS:
- Write COMPLETE text — every section, every template, every worksheet fully written out
- Total length: 8,000-11,000 words
- This is a WORKING DOCUMENT — it should feel like a workbook, not a report
- Use [ ] checkbox symbols in checklists
- Use tables extensively for worksheets
- Use [WRITE HERE: prompt] markers in templates to guide the user
- Include [TIP] boxes for practical advice
- Tone: "You can do this. Here's exactly how."
```

---

## PROMPT 5: Impact Report Template
**Unlocked by:** TBL-CI Assessment completion
**File:** `CIL-Impact-Report-Template.docx`

```
You are a grant writer and impact measurement specialist with experience in cultural enterprises. Create a professional, fill-in-the-blank impact report template.

DOCUMENT TITLE: Cultural Enterprise Impact Report Template: Tell Your Story to Funders and Stakeholders

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
AUDIENCE: Cultural entrepreneurs who need to report impact to funders, investors, government bodies, or community stakeholders. They've completed the TBL-CI (Triple Bottom Line) assessment and understand their economic, social, and environmental impact scores.

BRAND VOICE: Professional but not corporate. The template should help cultural entrepreneurs sound credible and data-driven without losing their authentic voice.

DOCUMENT STRUCTURE:

Create a COMPLETE, ready-to-use impact report template with the following sections. For each section, provide:
- The section header (designed)
- Guidance text in [ITALICS] explaining what to write
- Fill-in placeholders marked with [YOUR TEXT HERE] or [YOUR DATA HERE]
- Example text showing what a completed version looks like (marked as "Example:")

1. COVER PAGE
   - [ORGANISATION NAME]
   - [REPORT TITLE: e.g., "Annual Impact Report 2025-2026"]
   - [TAGLINE: One sentence about your cultural mission]
   - [COVER IMAGE PLACEHOLDER]
   - [REPORTING PERIOD]

2. EXECUTIVE SUMMARY (1 page template)
   - Organisation overview (3-4 sentences template)
   - Key achievements this period (bullet points template, 4-5 items)
   - Impact headlines (3 big numbers template)
   - What's next (2-3 sentences template)
   - Example: fully written sample executive summary for a fictional handloom cooperative

3. ABOUT US (1 page template)
   - Mission statement template
   - Brief history template
   - Cultural heritage we work with template
   - Geographic scope template
   - Team overview template

4. ECONOMIC IMPACT (2 pages template)
   - Revenue and growth metrics table
   - Employment data (direct and indirect jobs)
   - Supply chain impact (artisans/suppliers supported)
   - Market expansion data
   - Economic multiplier effect explanation and calculation
   - Income improvement for participating artisans/community members
   - [DATA VISUALISATION SUGGESTION: Revenue growth bar chart, employment pie chart]
   - Grant application language bank: 15 ready-to-use phrases for economic impact
     e.g., "Our enterprise directly supports [X] artisan households, generating an average income increase of [Y]% compared to pre-programme baselines."

5. SOCIAL IMPACT (2 pages template)
   - Community beneficiaries (direct and indirect)
   - Skills development and training delivered
   - Cultural preservation outcomes (knowledge documented, techniques saved, apprentices trained)
   - Gender and inclusion metrics
   - Youth engagement data
   - Community wellbeing indicators
   - Testimonial template (with photo placeholder)
   - [DATA VISUALISATION SUGGESTION: Beneficiary demographics, skills training infographic]
   - Grant application language bank: 15 ready-to-use phrases for social impact
     e.g., "Through our intergenerational mentorship programme, [X] master artisans have transferred [Y] traditional techniques to [Z] young practitioners, ensuring cultural continuity for the next generation."

6. ENVIRONMENTAL IMPACT (1-2 pages template)
   - Materials sourcing (natural, recycled, sustainable)
   - Carbon footprint (if measured)
   - Waste reduction metrics
   - Environmental stewardship practices
   - Connection between cultural practices and environmental sustainability
   - [DATA VISUALISATION SUGGESTION: Materials sourcing pie chart, carbon comparison]
   - Grant application language bank: 10 ready-to-use phrases for environmental impact

7. CULTURAL IMPACT (1-2 pages template)
   - Cultural assets preserved or revitalised
   - Traditional knowledge documented
   - Cultural events or exhibitions hosted/participated
   - Media coverage and cultural visibility
   - Awards and recognition
   - Cultural innovation examples (new products/services that honour tradition)
   - [DATA VISUALISATION SUGGESTION: Cultural activity timeline, heritage preservation progress]

8. CHALLENGES & LESSONS LEARNED (1 page template)
   - Top 3 challenges faced (honest, reflective)
   - What we learned from each
   - How we adapted
   - What we would do differently

9. FINANCIAL SUMMARY (1 page template)
   - Simple income/expenditure table
   - Funding sources breakdown
   - Cost per beneficiary calculation
   - Financial sustainability indicators
   - Efficiency ratios

10. LOOKING AHEAD (1 page template)
    - Goals for next period
    - Planned innovations
    - Funding needs
    - Partnership opportunities
    - Call to action for readers

11. ACKNOWLEDGEMENTS (half page template)
    - Funders, partners, community, team

12. APPENDIX: DATA METHODOLOGY
    - How data was collected
    - Sample sizes
    - Limitations
    - CIL assessment scores and methodology reference

ALSO INCLUDE:

A. REAL EXAMPLE (3-4 pages)
   Write a COMPLETE sample impact report for a fictional but realistic cultural enterprise:
   - "Nalini Handlooms Cooperative" — a women's handloom weaving cooperative in Assam, India
   - Show every section filled in with plausible, specific data
   - This serves as a model the user can follow

B. GRANT APPLICATION LANGUAGE BANK (2 pages)
   50+ ready-to-use phrases organised by:
   - Economic impact phrases (15)
   - Social impact phrases (15)
   - Environmental impact phrases (10)
   - Cultural impact phrases (10)
   Each phrase has a fill-in-the-blank structure with [BRACKETS] for personalisation

FORMAT REQUIREMENTS:
- Write COMPLETE text — every template section, every example, every phrase
- Total length: 10,000-13,000 words
- Professional but warm tone
- Use [YOUR TEXT HERE], [YOUR DATA HERE], [YEAR] as placeholders
- Use "Example:" labels clearly for sample text
- Include data visualisation suggestions throughout
- This needs to work as a Word document — use clear headings, tables, and formatting markers
```

---

## PROMPT 6: Sustainability & Succession Guide
**Unlocked by:** CISS Assessment completion
**File:** `CIL-Sustainability-Succession-Guide.pdf`

```
You are an expert in organisational sustainability and succession planning, with specific experience in cultural enterprises, family businesses, and indigenous knowledge systems. Create a comprehensive guide.

DOCUMENT TITLE: Building to Last: Sustainability & Succession Planning for Cultural Enterprises

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
AUDIENCE: Cultural enterprise leaders who are thinking about long-term survival — not just for their business, but for the cultural traditions they carry. They've completed the CISS (Cultural Innovation Sustainability Scorecard) and want to ensure their enterprise thrives across generations.

BRAND VOICE: Wise, warm, and practical. Like a trusted advisor who understands both the business imperatives and the cultural weight of what they're doing.

DOCUMENT STRUCTURE:

1. WHY THIS MATTERS (2 pages)
   - The urgency: Cultural enterprises face unique succession challenges
   - Statistics on cultural enterprise/family business failure rates across generations
   - The difference between business succession and cultural succession
   - What's at stake when a cultural enterprise fails (the knowledge, not just the revenue, that's lost)
   - The opportunity: Enterprises that plan for succession are X% more likely to survive

2. SUSTAINABILITY FOUNDATIONS (4-5 pages)

   a) ECONOMIC SUSTAINABILITY
      - Revenue diversification strategies for cultural enterprises (5-7 specific approaches)
      - Financial reserves and emergency fund planning
      - Pricing for long-term viability (not just survival)
      - Reducing dependency on single funders/clients
      - Cash flow management for seasonal/project-based cultural work
      - Financial stress-test: 5 scenarios to plan for (market downturn, key person loss, supply chain disruption, tourism decline, cultural trend shift)

   b) CULTURAL SUSTAINABILITY
      - Documentation systems for traditional knowledge
      - Living archives vs. static archives
      - Apprenticeship models that actually work (with examples)
      - Balancing innovation with preservation
      - Community ownership models
      - Dealing with commercial pressure to dilute cultural integrity
      - Cultural sustainability indicators (how to measure)

   c) SOCIAL SUSTAINABILITY
      - Fair wages and working conditions in cultural enterprises
      - Gender equity in traditional sectors
      - Youth engagement strategies (making cultural work attractive to the next generation)
      - Community benefit sharing models
      - Mental health and wellbeing of cultural entrepreneurs (burnout is real)

   d) ENVIRONMENTAL SUSTAINABILITY
      - Sustainable material sourcing for cultural products
      - Traditional ecological knowledge as environmental practice
      - Carbon footprint of cultural production and tourism
      - Circular economy principles applied to cultural enterprises

3. SUCCESSION PLANNING (6-8 pages)

   a) SUCCESSION PLANNING TIMELINE (2 pages)
      A detailed timeline covering:
      - 5 years before transition: Begin thinking, start documentation
      - 3 years before: Identify potential successors, begin mentoring
      - 2 years before: Formal transition planning, legal structures
      - 1 year before: Shadow leadership, gradual handover
      - Transition period: Co-leadership, support structures
      - Post-transition: Founder's new role (advisor, ambassador, nothing)
      - Include specific actions, decisions, and milestones for each phase

   b) SUCCESSOR IDENTIFICATION & DEVELOPMENT (2 pages)
      - Who can succeed? Family, employees, community members, external candidates
      - The unique challenge: Finding someone with BOTH business skills AND cultural knowledge
      - Assessment criteria for successors (cultural competence, business acumen, community trust, innovation capacity)
      - Development program template for chosen successors
      - What to do when there's no obvious successor
      - Multiple succession models: Individual, co-leadership, committee, cooperative conversion

   c) KNOWLEDGE TRANSFER (2-3 pages)
      - The knowledge iceberg: Explicit vs. tacit cultural knowledge
      - Documentation methods that capture the "invisible" knowledge:
        * Video documentation protocols
        * Written process documentation
        * Master-apprentice structured programs
        * Community knowledge circles
        * Digital knowledge bases
      - Knowledge transfer plan template
      - Common mistakes in cultural knowledge transfer
      - How to preserve the "spirit" of the work, not just the technique

   d) LEGAL & STRUCTURAL PLANNING (1-2 pages)
      - Legal structures that support cultural enterprise succession (cooperative, trust, social enterprise, family foundation)
      - IP protection for cultural knowledge during transition
      - Governance structures for cultural enterprises
      - Financial planning for the transition (founder's exit, successor's investment)
      - When to get professional advice (and what kind)

4. CASE STUDIES (3-4 pages)
   5 detailed case studies of multi-generational cultural enterprises:

   For each:
   - Enterprise name, location, cultural tradition
   - How long they've operated (generations)
   - What succession challenges they faced
   - How they handled the transition
   - What went right and what went wrong
   - Key lesson

   Aim for:
   - Japan: A multi-generational craft workshop (e.g., Kyoto pottery, Wajima lacquerware)
   - West Africa: A family weaving or dyeing enterprise
   - Latin America: An indigenous textile cooperative
   - Europe: A heritage food/drink producer
   - South Asia: A traditional craft enterprise

   Use REAL examples where possible. Mark composites with [COMPOSITE].

5. WORKSHEETS & TEMPLATES (4-5 pages)

   a) Succession Planning Checklist
      - 30+ items organised by: Legal, Financial, Knowledge, Cultural, Operational, Personal
      - [ ] checkbox format

   b) Knowledge Transfer Documentation Template
      - Product/Technique name
      - Materials required (with sources)
      - Step-by-step process (with photos/video markers)
      - Common mistakes and how to avoid them
      - Variations and their contexts
      - Cultural significance and stories
      - Quality standards

   c) Financial Sustainability Stress-Test Worksheet
      - 5 scenarios with impact assessment template
      - Current financial health scorecard
      - Reserve fund calculator
      - Revenue diversification planner

   d) Successor Development Plan Template
      - Skills assessment (cultural + business)
      - 12-month development milestones
      - Mentoring schedule
      - Community introduction plan
      - Decision-making authority transition timeline

   e) Cultural Continuity Plan
      - What must never change (sacred elements)
      - What can evolve (innovation zones)
      - Who decides (governance for cultural decisions)
      - How to resolve disagreements about innovation boundaries

6. REFERENCES & RESOURCES (1 page)
   - Academic sources
   - Practical resources
   - Organisations that support cultural enterprise succession
   - CIL tools and assessments that complement this guide

FORMAT REQUIREMENTS:
- Write COMPLETE text — every section, template, case study, and worksheet fully written
- Total length: 11,000-15,000 words
- Warm, wise tone that respects the weight of what's being discussed
- Use [FIGURE: description] for visual suggestions
- Use [WORKSHEET: title] before templates
- Use [WRITE HERE: prompt] in fill-in sections
- Use [ ] for checklist items
- Include [TIP] and [WARNING] boxes
- Real examples preferred; mark composites with [COMPOSITE]
```

---

## PROMPT 7: Cultural Pricing Strategy Workbook
**Unlocked by:** Pricing Assessment completion
**File:** `CIL-Pricing-Strategy-Workbook.pdf`

```
You are a pricing strategist who specialises in cultural and artisan products. You understand both the economics and the emotional/cultural dimensions of pricing handmade, heritage, and culturally significant goods. Create an interactive workbook.

DOCUMENT TITLE: Price What You're Worth: The Cultural Entrepreneur's Pricing Workbook

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
AUDIENCE: Cultural entrepreneurs who chronically underprice their work. They've completed the CIL Pricing Assessment and know their pricing weaknesses. This workbook helps them fix it.

BRAND VOICE: Direct, empowering, and practical. Like a business coach who genuinely respects cultural work and won't accept "but it's just a craft" as an excuse for underpricing. Encouraging but firm.

DOCUMENT STRUCTURE:

1. THE UNDERPRICING EPIDEMIC (2 pages)
   - "If you're reading this, you're probably undercharging."
   - Why cultural entrepreneurs underprice (psychology, market pressure, cultural humility, lack of confidence, competitor comparison with mass-produced goods)
   - The real cost of underpricing: burnout, quality decline, tradition dying because it doesn't pay
   - The mindset shift: Your cultural knowledge IS the value
   - Data: Average markup differences between cultural/artisan products and mass-market equivalents

2. FULL COST CALCULATION WORKSHEET (3-4 pages)
   A comprehensive, step-by-step cost calculation:

   a) DIRECT COSTS
   - Raw materials (with worksheet for itemising each material, quantity, unit cost)
   - Labor — YOUR time (with hourly rate calculator: desired annual income ÷ billable hours)
   - Labor — Others (employees, contract artisans, apprentices)
   - Tools and equipment (amortised per product)
   - Packaging and presentation
   - Shipping/delivery materials

   b) HIDDEN COSTS (the ones you're probably forgetting)
   - Design and development time (R&D for new products)
   - Community consultation time
   - Cultural research and knowledge maintenance
   - Training and skill development
   - Photography and content creation
   - Market research and customer communication
   - Administrative time (bookkeeping, emails, orders)
   - Workspace costs (rent, utilities, insurance)
   - Travel to markets, fairs, suppliers
   - Waste and defect rate
   - Unpaid emotional labour (custom requests, education, cultural mediation)

   c) TOTAL COST PER UNIT CALCULATOR
   - Worksheet that adds all the above
   - "If your selling price is BELOW this number, you are paying customers to buy from you."

3. CULTURAL PREMIUM CALCULATOR (3-4 pages)

   a) WHAT IS A CULTURAL PREMIUM?
   - Definition: The additional value your product commands because of its cultural authenticity, heritage story, and unique craftsmanship
   - Why customers pay premiums for cultural products (research-backed)
   - The authenticity spectrum: Mass-produced copy → Inspired-by → Authenticated cultural → Master-crafted heritage

   b) CALCULATING YOUR CULTURAL PREMIUM
   Interactive worksheet with scoring:
   - Cultural authenticity factors (tradition age, technique rarity, cultural significance) — Score 1-5
   - Maker factors (years of training, master status, awards/recognition) — Score 1-5
   - Story factors (documented provenance, community connection, cultural meaning) — Score 1-5
   - Scarcity factors (limited materials, seasonal availability, production capacity) — Score 1-5
   - Market factors (brand recognition, press coverage, collector interest) — Score 1-5

   Total score → Cultural Premium multiplier table:
   - Score 5-10: 1.5x-2x base cost
   - Score 11-15: 2x-3x base cost
   - Score 16-20: 3x-5x base cost
   - Score 21-25: 5x-10x+ base cost

   c) INDUSTRY BENCHMARKS
   - Typical cultural premium ranges by sector:
     * Textiles/fashion
     * Ceramics/pottery
     * Food/beverage
     * Music/performance
     * Visual arts
     * Woodwork/furniture
     * Jewellery/metalwork
     * Paper/printing crafts

4. COMPETITIVE ANALYSIS TEMPLATE (2 pages)
   Fill-in comparison worksheet:

   Table: Your Product | Competitor 1 (mass-market) | Competitor 2 (similar cultural) | Competitor 3 (luxury equivalent)

   Compare across:
   - Price point
   - Materials quality
   - Production method
   - Cultural authenticity
   - Story/provenance
   - Customer experience
   - Where sold
   - Target customer

   Analysis questions:
   - Where are you positioned?
   - Where SHOULD you be positioned?
   - What justifies a higher price than competitors?
   - What's the highest price in your category? What makes it possible?

5. PRICE TESTING EXPERIMENT GUIDE (2-3 pages)
   Step-by-step guide to testing price increases:

   a) THE 10% TEST
   - Raise prices 10% and measure impact over 30 days
   - What to track: units sold, revenue, customer feedback, enquiries
   - Decision framework: What the results mean

   b) THE A/B TEST
   - How to test two price points simultaneously (different markets, online vs. offline)
   - Template for tracking results

   c) THE PREMIUM LINE TEST
   - Creating a "premium" version of your product at a higher price point
   - How to differentiate (better materials, more detail, signed, limited edition)
   - Template for planning a premium line

   d) THE BUNDLING TEST
   - Combining products for a package price
   - How to calculate bundle pricing
   - Which products to bundle

6. TIERED PRICING STRATEGY BUILDER (2-3 pages)

   a) WHY TIERED PRICING WORKS FOR CULTURAL PRODUCTS
   - The "good, better, best" approach
   - How it serves different customer segments without devaluing your work

   b) BUILD YOUR TIERS
   Worksheet for creating 3-4 pricing tiers:

   Tier 1: ACCESSIBLE (entry-level product that introduces your culture)
   - Product: [WRITE HERE]
   - Price range: [WRITE HERE]
   - Purpose: Gateway product, builds audience, shares culture widely

   Tier 2: SIGNATURE (your core product, where most revenue comes from)
   - Product: [WRITE HERE]
   - Price range: [WRITE HERE]
   - Purpose: The product you're known for, your bread and butter

   Tier 3: PREMIUM (high-end, high-cultural-value offering)
   - Product: [WRITE HERE]
   - Price range: [WRITE HERE]
   - Purpose: For collectors, serious buyers, maximum cultural expression

   Tier 4: BESPOKE (custom, commission, collaboration)
   - Product: [WRITE HERE]
   - Price range: [WRITE HERE]
   - Purpose: One-of-a-kind, highest margin, deepest cultural engagement

   c) PRICING EACH TIER
   - Cost calculation for each tier
   - Margin targets by tier
   - Volume expectations by tier
   - How tiers work together to create a viable business

7. SCRIPTS FOR COMMUNICATING PRICE INCREASES (2-3 pages)
   Ready-to-use communication templates:

   a) EMAIL TO EXISTING CUSTOMERS (3 versions: gentle, confident, premium)
   b) IN-PERSON SCRIPT for markets and shops
   c) SOCIAL MEDIA POST announcing new pricing
   d) RESPONSE TO "WHY SO EXPENSIVE?" (5 different approaches)
   e) WHOLESALE BUYER NEGOTIATION scripts
   f) RESPONSE TO DISCOUNT REQUESTS (3 versions: firm no, alternative offer, loyalty reward)

   Each script should be:
   - 100-200 words
   - Ready to copy-paste with [BRACKET] personalisation
   - Confident without being defensive
   - Centered on value, not apology

8. YOUR PRICING ACTION PLAN (1 page)
   Fill-in template:
   - Current average price: [WRITE HERE]
   - True cost per unit (from Section 2): [WRITE HERE]
   - Cultural premium multiplier (from Section 3): [WRITE HERE]
   - New target price: [WRITE HERE]
   - Price increase percentage: [WRITE HERE]
   - When to implement: [WRITE HERE]
   - How to communicate: [WRITE HERE]
   - 30-day review date: [WRITE HERE]
   - Success metric: [WRITE HERE]

FORMAT REQUIREMENTS:
- Write COMPLETE text — every worksheet, calculator, script, and example fully written out
- Total length: 9,000-12,000 words
- Empowering, direct tone — no hedging, no apologising for encouraging higher prices
- Use [WRITE HERE: prompt] markers in all worksheets
- Use tables extensively for calculators and comparisons
- Include [TIP] boxes for pricing psychology insights
- Include [WARNING] boxes for common pricing mistakes
- Include [EXAMPLE] boxes with realistic worked examples
- Make the reader feel that underpricing their cultural work is doing a disservice to their culture, not just their wallet
```

---

## PROMPT 8: Premium — Global Market Entry Masterclass (Content Outline)
**Premium upsell shown after Pricing Assessment**
**File:** `premium/CIL-Market-Entry-Masterclass.zip`

```
You are an international trade consultant specialising in cultural and artisan products entering global markets. Create a detailed course outline and the accompanying workbook content for a video masterclass.

DOCUMENT TITLE: From Local to Global: Market Entry Masterclass for Cultural Products

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
NOTE: This is a PREMIUM product that users can purchase. It should feel substantially more valuable and comprehensive than the free resources. The video scripts will be recorded separately — focus on creating the WORKBOOK content and detailed module outlines.

DOCUMENT STRUCTURE:

1. COURSE OVERVIEW (1 page)
   - 6 modules, ~40 minutes each (4 hours total)
   - Who this is for
   - What you'll be able to do after completing it
   - Prerequisites: Completed CIL and Pricing assessments

2. MODULE OUTLINES (2-3 pages each, 6 modules)
   For each module provide:
   - Module title and learning objectives (3-4 bullet points)
   - Detailed content outline (what the video would cover, key talking points)
   - Key frameworks or models introduced
   - Interactive exercises during the module
   - Homework assignment

   MODULE 1: Is Your Product Ready for Global Markets?
   - Product readiness assessment framework
   - Cultural product vs. commodity: Understanding your positioning
   - Quality standards for international markets
   - Legal requirements overview (export licenses, certifications)
   - Exercise: Product readiness scorecard

   MODULE 2: Understanding International Demand for Cultural Products
   - Market size data for cultural/artisan goods by region
   - Customer personas: Who buys cultural products internationally?
   - Trend analysis: What's growing, what's declining
   - Finding your niche in a global market
   - Exercise: Target market selection worksheet

   MODULE 3: Choosing Your Sales Channels
   - E-commerce platforms compared: Etsy, Amazon Handmade, Novica, Not On The High Street, etc.
   - Your own website (Shopify, WooCommerce, etc.)
   - Wholesale and B2B channels
   - Cultural tourism as a sales channel
   - Trade fairs and exhibitions (which ones matter)
   - Exercise: Channel selection matrix

   MODULE 4: Cultural Storytelling for Global Audiences
   - Why story is your biggest competitive advantage
   - Storytelling frameworks for cultural products
   - Photography and visual content standards
   - Writing product descriptions that honour culture AND sell
   - Handling cultural translation (not just language — context)
   - Exercise: Write your brand story using the framework

   MODULE 5: Logistics, Shipping & Customs
   - Shipping handmade/fragile/natural goods internationally
   - Packaging for cultural products (protection + presentation)
   - Customs classifications for cultural goods
   - Import duties and taxes by major market
   - Returns and customer service across borders
   - Exercise: Shipping cost calculator for your products

   MODULE 6: Scaling Without Losing Your Soul
   - When to say no to scale
   - Production scaling while maintaining quality
   - Hiring and training for growth
   - Building a sustainable international supply chain
   - Protecting your cultural IP in global markets
   - Exercise: Your 12-month global market entry plan

3. EXPORT LOGISTICS CHECKLIST (2-3 pages)
   Country-by-country export requirements for top 15 destination markets:
   - USA, UK, Germany, France, Japan, Australia, Canada, UAE, South Korea, Netherlands, Italy, Sweden, Singapore, Switzerland, India

   For each: Key requirements, prohibited materials, labelling needs, duty rates for cultural goods, useful customs codes

4. INTERNATIONAL MARKETPLACE COMPARISON (2-3 pages)
   Detailed comparison table of 10+ platforms:
   - Platform name, URL
   - Commission/fee structure
   - Best for (product type)
   - Audience size and demographics
   - Seller support quality
   - Cultural product friendliness (rating)
   - Pros and cons
   - Setup difficulty

5. CULTURAL STORYTELLING WORKBOOK (3-4 pages)
   Fill-in-the-blank storytelling framework:
   - The Origin Story template
   - The Maker Story template
   - The Material Story template
   - The Community Story template
   - The Impact Story template
   - Product description templates (short, medium, long versions)
   - Social media caption templates (10 templates)

6. SHIPPING & CUSTOMS GUIDE FOR HANDMADE GOODS (2-3 pages)
   - Packaging specifications for different product types
   - Customs declaration guidance
   - Insurance considerations
   - Sustainable packaging options
   - Cost calculation worksheet

FORMAT REQUIREMENTS:
- Write COMPLETE content — every module outline, every template, every comparison table
- Total length: 12,000-16,000 words
- Premium feel — this should feel worth paying for
- Practical and immediately actionable
- Use real platform names, real customs codes, real data where possible
- Mark uncertainties with [VERIFY]
```

---

## PROMPT 9: Premium — Cultural Brand Building Toolkit (Content)
**Premium upsell shown after CIMM Assessment**
**File:** `premium/CIL-Cultural-Brand-Toolkit.zip`

```
You are a branding strategist who specialises in cultural and heritage brands. You understand how to build brands that honour tradition while appealing to modern consumers. Create a comprehensive brand-building toolkit.

DOCUMENT TITLE: Heritage to Brand: The Complete Cultural Brand Building Toolkit

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
NOTE: This is a PREMIUM product. It should feel substantially more valuable than free resources. The Canva templates and photography guides would be created separately — focus on the strategic content, brand story frameworks, and social media strategies.

DOCUMENT STRUCTURE:

1. BRAND FOUNDATIONS (4-5 pages)
   a) What Makes Cultural Brands Different
   - The authenticity advantage
   - Heritage as brand equity
   - Why cultural brands can't (and shouldn't) follow corporate branding playbooks
   - The tension between tradition and trend — how to navigate it

   b) Brand Story Canvas
   Fill-in framework:
   - Our Origin: [WRITE HERE]
   - Our Cultural Heritage: [WRITE HERE]
   - Our Mission: [WRITE HERE]
   - Our Values (3-5): [WRITE HERE]
   - Our Unique Value: What we offer that no mass-producer can [WRITE HERE]
   - Our Voice: How we sound [WRITE HERE]
   - Our Visual Identity: How we look [WRITE HERE]
   - Our Promise: What customers can always expect [WRITE HERE]

   c) Brand Writing Templates
   - Elevator pitch (30 seconds): template + 3 examples
   - Brand story (website About page): template + 1 full example
   - Founder story: template + 1 full example
   - Mission statement: template + 5 examples from real cultural brands

2. VISUAL IDENTITY GUIDE (3-4 pages)
   - Colour palette guidance for cultural brands (how to choose colours that reflect your heritage)
   - Typography recommendations (serif vs. sans-serif, cultural considerations)
   - Logo principles for cultural enterprises (simplicity, cultural symbolism, versatility)
   - Brand photography style guide:
     * Product photography (lighting, backgrounds, props that tell culture)
     * Process photography (showing the making)
     * People photography (makers, community, customers)
     * Environment photography (workshop, landscape, markets)
   - Consistency guidelines (how to maintain visual brand across channels)

3. SOCIAL MEDIA STRATEGY FOR CULTURAL BRANDS (5-6 pages)

   a) Platform Selection Guide
   - Instagram (visual storytelling — best for most cultural brands)
   - Pinterest (long-tail discovery for cultural products)
   - TikTok (process videos, behind-the-scenes)
   - Facebook (community building, older demographics)
   - YouTube (documentary-style content)
   - LinkedIn (B2B, grant applications, partnerships)
   - Which platforms for which goals

   b) Content Pillars for Cultural Brands
   Define 5 content pillars with examples:
   1. Heritage & History (cultural context, traditions, significance)
   2. Process & Craft (behind-the-scenes, making-of, techniques)
   3. Product & Style (styled product shots, lifestyle content)
   4. People & Community (makers, customers, community stories)
   5. Impact & Purpose (social impact, sustainability, cultural preservation)

   c) 50 Instagram Post Templates
   For each, provide:
   - Post type (carousel, single image, reel, story)
   - Caption template with [BRACKETS] for personalisation
   - Hashtag suggestions (5-10 per post)
   - Visual description

   Organised as:
   - 10 Heritage & History posts
   - 10 Process & Craft posts
   - 10 Product & Style posts
   - 10 People & Community posts
   - 10 Impact & Purpose posts

   d) Content Calendar Template
   - 4-week content calendar with posting schedule
   - Content mix ratios
   - Best posting times by platform

   e) Cultural Storytelling Framework for Social Media
   - The micro-story format (beginning-middle-end in one caption)
   - Serialised storytelling (multi-post stories)
   - Interactive storytelling (polls, questions, user-generated content)

4. PRODUCT PHOTOGRAPHY GUIDE (3-4 pages)
   Detailed, practical photography guidance for entrepreneurs using smartphones:

   a) Essential Shot List (20 shots per product)
   - Hero shot, detail shots, scale shots, lifestyle shots, process shots
   - For each: lighting setup, angle, background, props

   b) Lighting Guide
   - Natural light setups (window light, golden hour, overcast)
   - Inexpensive artificial lighting options
   - How to avoid common lighting mistakes

   c) Styling Guide
   - Background options (and which to avoid)
   - Props that enhance cultural storytelling
   - Colour theory for product photography
   - Composition rules

   d) Editing Guide
   - Free/affordable editing apps
   - Consistent filter/preset approach
   - Maintaining colour accuracy for cultural products
   - Batch editing workflow

5. PACKAGING DESIGN INSPIRATION (2-3 pages)
   - 10 packaging concepts for cultural products (described for designer to create)
   - Sustainable packaging options
   - How to include cultural story in packaging (hang tags, inserts, QR codes)
   - Unboxing experience design
   - Cost-effective packaging solutions

6. BRAND AUDIT CHECKLIST (1 page)
   - 25-point checklist for evaluating your current brand
   - Scoring rubric
   - Priority action items based on score

FORMAT REQUIREMENTS:
- Write COMPLETE content — every template, example, and strategy fully written
- Total length: 13,000-17,000 words
- Premium quality — this should feel like hiring a branding consultant
- Practical for entrepreneurs with no design background
- Use [WRITE HERE: prompt] for fill-in sections
- Include specific, actionable steps (not just theory)
- Reference real cultural brands as examples throughout
```

---

## PROMPT 10: Premium — Grant Writing Toolkit (Content)
**Premium upsell shown after TBL-CI Assessment**
**File:** `premium/CIL-Grant-Writing-Toolkit.zip`

```
You are an experienced grant writer who has helped cultural and community organisations secure millions in funding. You understand what funders want to see and how cultural enterprises can present their work compellingly. Create a comprehensive grant writing toolkit.

DOCUMENT TITLE: Funded: The Cultural Entrepreneur's Grant Writing Toolkit

BRAND: Cultural Innovation Lab (CIL) — culturalinnovationlab.org
NOTE: This is a PREMIUM product. It should feel like having a professional grant writer on your team. The content should be immediately usable — not theory, but templates and examples that can be adapted.

DOCUMENT STRUCTURE:

1. GRANT WRITING FUNDAMENTALS FOR CULTURAL ENTERPRISES (3-4 pages)
   - How grant decisions are actually made (insider perspective)
   - What funders for cultural projects specifically look for
   - Common reasons cultural grant applications fail
   - The grant writing process: timeline from opportunity to submission
   - How to find grants that match your work (search strategies)
   - When NOT to apply (saving time by filtering early)

2. 5 ANNOTATED WINNING GRANT PROPOSALS (12-15 pages)
   Create 5 COMPLETE, realistic grant proposals for different types of cultural enterprises. For each:

   - Grant type and funder (realistic but anonymised as needed)
   - Full proposal text (2-3 pages each)
   - ANNOTATIONS in [ANNOTATION: explanation] format explaining WHY each section works
   - What made this proposal stand out
   - Common mistakes this proposal avoided

   The 5 proposals should cover different scenarios:

   a) SMALL GRANT ($5,000-$15,000)
      Cultural enterprise: Community pottery workshop in rural Colombia
      Funder type: International cultural foundation
      Purpose: Equipment and training for youth apprentices

   b) MEDIUM GRANT ($25,000-$75,000)
      Cultural enterprise: Women's textile cooperative in West Africa
      Funder type: Development agency (USAID, DFID-type)
      Purpose: Market expansion and quality improvement

   c) LARGE GRANT ($100,000-$500,000)
      Cultural enterprise: Cultural heritage tourism social enterprise in Southeast Asia
      Funder type: Impact investor / social enterprise funder
      Purpose: Scaling operations and building infrastructure

   d) ARTS COUNCIL GRANT ($10,000-$50,000)
      Cultural enterprise: Contemporary artist working with traditional techniques
      Funder type: National arts council
      Purpose: Exhibition and cultural exchange program

   e) RESEARCH/INNOVATION GRANT ($50,000-$200,000)
      Cultural enterprise: Cultural innovation hub/incubator
      Funder type: Innovation fund (Nesta, Rockefeller, Omidyar-type)
      Purpose: Piloting new models for cultural enterprise support

3. LOGIC MODEL TEMPLATE FOR CULTURAL PROJECTS (2-3 pages)
   - What a logic model is and why funders love them
   - Complete fill-in template:
     * Inputs (Resources you'll use)
     * Activities (What you'll do)
     * Outputs (Tangible deliverables)
     * Outcomes (Changes that result)
     * Impact (Long-term change)
   - Worked example for a cultural enterprise
   - Common mistakes in logic models
   - How to connect your CIL/TBL assessment scores to your logic model

4. BUDGET TEMPLATE WITH CULTURAL COST CATEGORIES (2-3 pages)
   - Complete budget template designed for cultural projects
   - Cultural-specific line items that are often forgotten:
     * Master artisan/elder consultation fees
     * Community consent and consultation process costs
     * Cultural IP licensing or benefit-sharing payments
     * Traditional material sourcing (often more expensive than industrial alternatives)
     * Cultural interpretation/translation
     * Heritage site access or ceremony costs
     * Apprenticeship stipends
     * Documentation (video, photography, written records)
   - Budget narrative template (explaining each line to funders)
   - Co-funding and in-kind contribution calculation guide
   - Overhead rate guidance (what's acceptable)

5. IMPACT MEASUREMENT FRAMEWORK FOR GRANT REPORTING (2-3 pages)
   - How to set up measurement BEFORE the project starts
   - Indicators aligned with CIL framework:
     * Cultural Capital indicators (heritage preserved, knowledge documented)
     * Innovation indicators (new products, market access)
     * Organisational indicators (capacity built, partnerships formed)
     * Economic indicators (revenue, employment, income improvement)
   - Data collection methods appropriate for cultural contexts
   - Reporting templates (quarterly and final)
   - Theory of change template

6. 50 CULTURAL-SPECIFIC GRANT OPPORTUNITIES (3-4 pages)
   A curated list of 50 grants specifically relevant to cultural enterprises:

   For each:
   - Grant name
   - Funder organisation
   - Typical amount
   - Eligibility (1 line)
   - Focus areas
   - Application deadline (or "rolling")
   - Website

   Organised by:
   - International/Multi-regional (15)
   - Africa (8)
   - Asia-Pacific (8)
   - Europe (8)
   - Americas (8)
   - Middle East (3)

   Use REAL, currently active grants. Mark uncertain ones with [VERIFY].

7. COVER LETTER AND SUPPORTING DOCUMENT TEMPLATES (2 pages)
   - Cover letter template (3 versions: formal, warm, urgent)
   - Letter of support template (for community leaders to sign)
   - Partnership letter template
   - Endorsement letter template
   - Board resolution template (for organisations)

8. GRANT MANAGEMENT CHECKLIST (1 page)
   What to do AFTER you receive the grant:
   - Financial management setup
   - Reporting calendar
   - Documentation requirements
   - Compliance monitoring
   - Relationship management with funder
   - Preparing for the next application

FORMAT REQUIREMENTS:
- Write COMPLETE content — every proposal, template, and list fully written
- Total length: 14,000-18,000 words
- Premium quality — this should feel like having a grant writing consultant
- The 5 sample proposals must be COMPLETE and convincing (not outlines)
- All grant opportunities should be REAL and currently active
- Use [ANNOTATION: text] format for teaching notes in sample proposals
- Use [WRITE HERE: prompt] in templates
- Use [VERIFY] for any data points that need fact-checking
- Tone: Professional, confident, knowledgeable
```

---

## HOW TO USE THESE PROMPTS

1. **Copy-paste each prompt** into a new Claude conversation
2. **Review the output** — check [VERIFY] tags, fact-check grant sources, ensure cultural sensitivity
3. **Format into PDF/DOCX** using your brand design (colours: sage, gold, ocean, terracotta, ink, pearl)
4. **Upload to Supabase Storage** bucket `resources` using the exact `storagePath` from `resourcesConfig.ts`
5. For premium products, upload to `resources/premium/` path
6. Test the download flow on the live site

## DESIGN NOTES

All resources should follow CIL brand guidelines:
- **Primary colours:** Sage (#87A878), Gold (#C4A265), Ocean (#5B8FA8), Terracotta (#C4755B)
- **Neutral colours:** Ink (#1A1A1A), Pearl (#FAFAF5), Stone (#8E8E8E), Sand (#F0ECE3)
- **Typography:** Serif for headings, clean sans-serif for body
- **Logo:** CIL — Cultural Innovation Lab
- **URL:** culturalinnovationlab.org
- **Footer on every page:** "Created by Cultural Innovation Lab | culturalinnovationlab.org"
