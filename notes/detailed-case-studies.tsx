import React, { useState } from 'react';

const DetailedCaseStudies = () => {
  const [activeCategory, setActiveCategory] = useState('urban');
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  
  const categories = [
    { id: 'urban', name: 'Urban Contexts', description: 'Case studies examining cultural innovation in metropolitan areas', icon: '🏙️' },
    { id: 'rural', name: 'Rural Contexts', description: 'Case studies of cultural innovation in rural and peripheral regions', icon: '🌄' },
    { id: 'sectoral', name: 'Sectoral Contexts', description: 'Case studies focusing on specific cultural and creative sectors', icon: '🎨' },
    { id: 'disruption', name: 'Disruption Response', description: 'Case studies of cultural innovation during major disruptions', icon: '⚡' }
  ];
  
  const caseStudies = [
    // Urban Context Cases
    {
      id: 'london-crisis',
      category: 'urban',
      title: "London's Cultural Economy After the 2008 Financial Crisis",
      location: "London, UK",
      period: "2008-2012",
      researcher: "Pratt (2015)",
      context: "Following the 2008 global financial crisis, London experienced significant economic contraction with GDP declining by 5.1% and unemployment rising to 10.1% in 2009. Financial services, previously the city's primary economic driver, faced severe disruption with estimates of 30,000-35,000 job losses in the sector.",
      challenge: "London needed to respond to the sudden contraction of its financial services sector while maintaining economic vitality in a rapidly changing global context. Cultural sectors faced funding cuts from both public and private sources, with Arts Council England implementing a 30% operating budget reduction between 2011-2015.",
      innovation: "East London cultural production clusters demonstrated remarkable resilience through several key innovations:\n\n1. **Business Model Innovation**: Cultural enterprises developed more diverse revenue streams, with case tracking showing an average increase from 2.3 to 4.1 distinct income sources per organization between 2008-2012.\n\n2. **Collaborative Production Networks**: New collaborative structures emerged that enabled resource sharing and risk distribution across creative enterprises. The creation of 37 new formal collaborative networks was documented during this period.\n\n3. **Spatial Innovation**: Temporary use of vacant commercial spaces created by the downturn provided affordable workspace for cultural producers, with over 120 temporary creative spaces documented by 2011.\n\n4. **Digital Transition**: Accelerated adoption of digital distribution channels, with surveyed cultural enterprises reporting a 47% increase in digital revenue streams between 2008-2011.",
      outcome: "These cultural innovation responses generated several resilience outcomes:\n\n1. **Employment Resilience**: Cultural and creative sectors maintained employment levels better than other private sectors, with only 7.8% contraction compared to 12.5% in financial services.\n\n2. **Recovery Dynamics**: Creative sectors demonstrated faster recovery, returning to pre-crisis employment levels by late 2011, approximately 18 months before financial services.\n\n3. **Spatial Regeneration**: Cultural activities maintained vitality in urban districts despite commercial contraction, preventing the negative spillover effects of urban decline.\n\n4. **Knowledge Spillovers**: Innovative practices developed in cultural sectors diffused to other sectors, particularly in digital engagement, collaborative organization, and user involvement.",
      lessons: "The London case provides several key insights for the Cultural Innovation Resilience Framework:\n\n1. **Flexibility Advantage**: The project-based, network-oriented structure of cultural production enables rapid reconfiguration during disruption.\n\n2. **Symbolic Value Resilience**: Demand for cultural experiences demonstrated relative resilience despite reduced disposable income, highlighting how symbolic value creation provides economic buffering.\n\n3. **Innovation Transfer**: Cultural sectors can function as 'laboratories' for organizational and business model innovation that subsequently benefits wider economic systems.\n\n4. **Spatial Anchoring**: Cultural activities provided stabilizing effects for urban locations during economic volatility, preventing deterioration cycles.",
      images: [
        { url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "London's South Bank cultural district" },
        { url: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "East London cultural cluster" }
      ]
    },
    {
      id: 'birmingham-transformation',
      category: 'urban',
      title: "Birmingham's Creative Industries in Post-Industrial Transformation",
      location: "Birmingham, UK",
      period: "2000-2014",
      researcher: "Bailey et al. (2010), Andres and Chapain (2013)",
      context: "Birmingham experienced severe deindustrialization in the late 20th century, losing over 200,000 manufacturing jobs between 1971-2001. By 2000, the city faced significant challenges including above-average unemployment (12.5% vs. UK average of 7.9%), areas of urban deprivation, and negative external perceptions affecting investment attraction.",
      challenge: "Birmingham needed to develop new economic drivers that could generate sustainable employment while transforming the city's identity from its industrial past. The challenge involved not just creating new jobs but establishing new development trajectories that could provide long-term economic resilience.",
      innovation: "Birmingham implemented several cultural innovation strategies as part of its economic restructuring:\n\n1. **Cultural Infrastructure Development**: Strategic investment in flagship cultural facilities including the £188 million Library of Birmingham, Ikon Gallery expansion, and Custard Factory redevelopment.\n\n2. **Cultural Quarter Strategy**: Development of the Eastside and Jewellery Quarter as designated cultural and creative districts, with specialized planning frameworks and incentives for creative enterprises.\n\n3. **Industrial Heritage Reimagining**: Transformation of industrial facilities into cultural spaces, maintaining physical connection to the city's heritage while enabling new economic functions.\n\n4. **Creative Intermediary Organizations**: Establishment of organizations facilitating connections between cultural production and traditional industries, including Creative Alliance and Birmingham Made Me.",
      outcome: "Birmingham's cultural innovation strategies generated several resilience outcomes:\n\n1. **Economic Diversification**: Creative industries grew to represent 7.9% of city employment by 2014, creating a significant new economic driver alongside business services and education.\n\n2. **Reputation Transformation**: External perception research demonstrated significant improvement in city image, with cultural amenities cited by 62% of surveyed businesses as enhancing the city's appeal for talent attraction.\n\n3. **Physical Regeneration**: Cultural activities served as catalysts for broader regeneration, with documented property value increases of 38% in cultural quarters compared to 24% city average between 2000-2014.\n\n4. **Knowledge Transfer**: Creative design approaches spread to traditional manufacturing sectors, with research documenting 43 formalized knowledge transfer partnerships between cultural and manufacturing enterprises.",
      lessons: "The Birmingham case provides several key insights for the Cultural Innovation Resilience Framework:\n\n1. **Heritage Activation**: Cultural innovation can productively mobilize industrial heritage as a distinctive asset rather than viewing it as a limitation.\n\n2. **Symbolic Transformation**: Cultural activities can fundamentally reshape external perceptions, creating new narrative possibilities that enhance economic opportunities.\n\n3. **Connectivity Importance**: Deliberate mechanisms connecting cultural innovation to broader economic systems significantly enhance resilience contributions beyond the cultural sectors themselves.\n\n4. **Temporal Dimension**: Cultural innovation generates resilience benefits across different timeframes, from immediate physical regeneration to longer-term identity transformation.",
      images: [
        { url: "https://images.unsplash.com/photo-1580831755530-8e586bed7d3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Birmingham's Custard Factory, repurposed industrial space" },
        { url: "https://images.unsplash.com/photo-1463107731752-156c0854b29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Library of Birmingham, flagship cultural infrastructure" }
      ]
    },
    {
      id: 'seoul-music',
      category: 'urban',
      title: "Seoul's Music Production Ecosystem",
      location: "Seoul, South Korea",
      period: "2005-2020",
      researcher: "Cultural Innovation Resilience Framework case analysis",
      context: "Seoul faced significant economic restructuring challenges in the early 2000s as manufacturing shifted to lower-cost locations and competition intensified from Chinese industrial centers. With a relatively small domestic market (approximately 51 million population), economic strategies required global connectivity and high-value specialization.",
      challenge: "Seoul needed to develop globally competitive creative sectors that could generate economic value despite limited domestic market size. The challenge involved creating distinctive creative industries with export potential while navigating rapid technological change in distribution systems.",
      innovation: "Seoul developed a distinctive music production ecosystem characterized by several innovations:\n\n1. **Integrated Production System**: Establishment of specialized 'idol' entertainment companies that vertically integrated talent development, production, management, and increasingly technology development.\n\n2. **Strategic Global Positioning**: Deliberate development of K-pop as a globally-oriented cultural product incorporating multiple cultural influences while maintaining distinctive Korean elements.\n\n3. **Digital-Physical Integration**: Early adoption of integrated online-offline strategies, including virtual performances, transmedia storytelling, and coordinated social media engagement.\n\n4. **Cultural Policy Alignment**: Strategic alignment between government cultural policies, export promotion, and private sector development, creating a coordinated ecosystem approach.",
      outcome: "Seoul's music production ecosystem generated significant resilience outcomes:\n\n1. **Global Market Expansion**: K-pop exports grew from approximately $22 million in 2005 to over $756 million by 2018, creating an export-oriented sector with minimal domestic market limitation.\n\n2. **Economic Multiplier Effects**: Research documented 5.5:1 return on music exports through associated tourism, merchandise, and digital service revenues.\n\n3. **Crisis Adaptation**: During COVID-19, Seoul's music sector demonstrated remarkable adaptation capacity, rapidly pivoting to virtual concert formats that reached larger global audiences than physical performances.\n\n4. **Innovation Spillovers**: Music industry innovations in fan engagement, digital distribution, and global marketing diffused to other Korean cultural sectors including film, fashion, and gaming.",
      lessons: "The Seoul case provides several key insights for the Cultural Innovation Resilience Framework:\n\n1. **Global-Local Articulation**: Strategic positioning within global cultural flows while maintaining local distinctiveness creates resilience through unique value propositions.\n\n2. **Ecosystem Integration**: Coordination between cultural production, policy frameworks, technology development, and educational systems enhances adaptive capacity.\n\n3. **Digital Transformation Leadership**: Early adoption of digital innovation creates resilience advantages during disruptions affecting physical cultural engagement.\n\n4. **Strategic Distinctiveness**: Cultivating distinctive cultural offerings creates resilience through reduced substitutability and competition compared to standardized production.",
      images: [
        { url: "https://images.unsplash.com/photo-1601040558908-7d8159c8c46f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Seoul's dynamic urban landscape" },
        { url: "https://images.unsplash.com/photo-1516114712160-78916537d805?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "K-pop performance production" }
      ]
    },
    
    // Rural Context Cases
    {
      id: 'scottish-rural',
      category: 'rural',
      title: "Cultural Innovation in Rural Scotland",
      location: "Scottish Highlands and Islands",
      period: "2010-2016",
      researcher: "Roberts and Townsend (2016)",
      context: "Rural Scotland faced multiple challenges including population decline (4.6% decrease in working-age population between 2001-2011), limited economic opportunities, geographical isolation, and inadequate physical infrastructure. Traditional rural economies based on agriculture, fishing, and basic tourism offered limited growth potential.",
      challenge: "Rural communities needed to develop new economic activities that could thrive despite geographic peripherality, limited local markets, distance from cultural institutions, and infrastructure constraints. The challenge involved creating sustainable livelihoods that would retain population while enhancing community resilience.",
      innovation: "Rural creative practitioners developed several innovative approaches:\n\n1. **Multi-functional Enterprises**: Development of business models combining multiple activities (e.g., craft production with workshops, performance with education) that created viable operations despite limited local markets.\n\n2. **Digital Leapfrogging**: Strategic use of digital platforms to overcome geographical isolation, with 78% of surveyed rural creative enterprises reporting significant online sales compared to 46% of rural businesses overall.\n\n3. **Place-Based Distinctiveness**: Strategic leveraging of local cultural traditions, landscapes, and materials to create distinctive offerings with broader appeal, transforming peripherality from limitation to asset.\n\n4. **Community Embeddedness**: Development of cultural enterprises deeply integrated with community needs, combining commercial activities with social functions that enhanced overall community vitality.",
      outcome: "These rural cultural innovations generated several resilience outcomes:\n\n1. **Economic Diversification**: Creative activities grew to represent 15.2% of rural employment in studied regions by 2016, diversifying economic bases previously dependent on agriculture, fishing, and tourism.\n\n2. **Demographic Stability**: Communities with higher concentrations of cultural enterprises demonstrated greater retention of working-age population, with 76% of surveyed creative practitioners being in-migrants who actively chose rural locations.\n\n3. **Place-Making Effects**: Cultural activities enhanced community identity and cohesion, with 82% of residents in studied communities reporting that cultural initiatives increased their attachment to place.\n\n4. **Knowledge Economy Bridges**: Cultural enterprises created bridges to broader knowledge economies, with documented cases of rural cultural practitioners maintaining global professional networks while being physically based in remote locations.",
      lessons: "The rural Scotland case provides several key insights for the Cultural Innovation Resilience Framework:\n\n1. **Adaptive Business Models**: Multi-functional, hybrid business approaches create viability in contexts with market limitations.\n\n2. **Digital-Physical Integration**: Strategic digital engagement enables cultural enterprises to maintain local physical embeddedness while accessing non-local markets and knowledge networks.\n\n3. **Place Distinctiveness Value**: Converting geographical and cultural distinctiveness into assets rather than limitations creates sustainable competitive advantages.\n\n4. **Social-Economic Integration**: Cultural enterprises integrating economic and social objectives demonstrate enhanced community resilience effects beyond direct economic impacts.",
      images: [
        { url: "https://images.unsplash.com/photo-1554245239-2d38efc587d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Scottish Highlands landscape" },
        { url: "https://images.unsplash.com/photo-1595587637401-47829ba9651b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Rural craft production workshop" }
      ]
    },
    {
      id: 'japanese-rural',
      category: 'rural',
      title: "Creative Depopulation Response in Rural Japan",
      location: "Tokushima Prefecture, Japan",
      period: "2011-2020",
      researcher: "Cultural Innovation Resilience Framework case analysis",
      context: "Rural Japan has experienced severe demographic challenges, with the 2015 census showing rural regions losing 10-15% of population every five years. Tokushima Prefecture faced a 5.8% population decline between 2010-2015, with projections suggesting over 20% further decline by 2040. Agricultural economic bases weakened while young people migrated to metropolitan areas.",
      challenge: "Rural communities needed to develop new approaches to maintain viability despite seemingly inevitable population decline. The challenge involved not just creating economic opportunities but reimagining rural futures that could be both smaller in population and economically sustainable.",
      innovation: "Tokushima developed several cultural innovation responses to depopulation:\n\n1. **Creative Attraction Strategy**: The 'Creativity Way' program established by Tokushima Prefecture provided subsidies, renovated traditional houses, and technology infrastructure specifically for creative workers willing to relocate from urban areas.\n\n2. **Traditional-Contemporary Fusion**: Programs connecting traditional craft practitioners with contemporary designers created new product lines combining traditional techniques with modern aesthetics and functions.\n\n3. **Festival Economy Development**: The Awa Odori and Tokushima LED festivals were strategically expanded and modernized, developing comprehensive ecosystem approaches that created year-round economic activity from seasonal events.\n\n4. **Slow Media Movement**: Development of artist residency programs specifically focused on contemplative media creation, positioning rural tranquility as a creative asset rather than limitation.",
      outcome: "Tokushima's cultural innovation strategies generated several resilience outcomes:\n\n1. **Creative Migration**: By 2020, the program had attracted over 250 creative practitioners to the region, with 78% remaining after initial subsidy periods ended.\n\n2. **Economic Diversification**: Creative sectors grew to represent 6.8% of prefectural employment by 2019, creating a significant complementary sector alongside agriculture and traditional manufacturing.\n\n3. **Global Connectivity**: Creative residents maintained global professional connections while being physically based in rural locations, with documented cases of rural-based practitioners accessing international markets.\n\n4. **Identity Transformation**: Survey research documented significant shifts in local perception from 'declining rural area' to 'creative rural region,' with associated improvements in community optimism.",
      lessons: "The Tokushima case provides several key insights for the Cultural Innovation Resilience Framework:\n\n1. **Reframing Limitations**: Cultural approaches can transform apparent limitations (rural tranquility, traditional practices, smaller scale) into distinctive assets.\n\n2. **Targeted Attraction**: Strategic focus on attracting specific creative practitioners rather than general population growth creates viable specialized communities despite broader demographic trends.\n\n3. **Tradition Activation**: Cultural innovation can revitalize traditional practices by connecting them to contemporary contexts and markets rather than preserving them as static heritage.\n\n4. **Alternative Development Models**: Cultural approaches can help communities develop alternative conceptions of success beyond conventional growth metrics, creating resilience through redefined objectives rather than resistance to change.",
      images: [
        { url: "https://images.unsplash.com/photo-1504025468847-0e438279542c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Traditional Japanese rural landscape" },
        { url: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Contemporary-traditional craft fusion" }
      ]
    },
    
    // Sectoral Context Cases
    {
      id: 'videogames-covid',
      category: 'sectoral',
      title: "Video Game Sector Resilience During COVID-19",
      location: "Global industry with focus on UK, Canada, and South Korea",
      period: "2019-2021",
      researcher: "Bakhshi and Mateos-Garcia (2021), Cultural Innovation Resilience Framework analysis",
      context: "The COVID-19 pandemic created unprecedented disruption across cultural and creative industries, with measures to control virus spread preventing physical cultural experiences. While many cultural sectors facing severe contraction (live performance revenue declined 64% globally in 2020), the video game sector experienced different conditions.",
      challenge: "Video game companies needed to adapt to remote work requirements that disrupted established collaborative development practices, global supply chain disruptions affecting hardware, and rapidly changing consumer behavior during lockdown periods. The challenge involved maintaining production continuity while responding to sudden demand shifts.",
      innovation: "The video game sector demonstrated several innovations during the pandemic:\n\n1. **Remote Collaboration Frameworks**: Rapid development of specialized remote collaboration tools and workflows for game development, including virtual asset review systems, distributed testing frameworks, and asynchronous production methodologies.\n\n2. **Community Co-Creation**: Expanded integration of player communities into development processes during physical restrictions, with documented cases of internal testing functions partially distributed to community members.\n\n3. **Cross-Reality Experiences**: Acceleration of innovation in games functioning as social spaces rather than just entertainment products, including concerts, exhibitions, and social gatherings within game environments.\n\n4. **Business Model Adaptation**: Rapid shifts in monetization and release strategies, including increased focus on expandable games-as-service models providing ongoing revenue streams amid production disruptions.",
      outcome: "These innovations generated several resilience outcomes:\n\n1. **Counter-Cyclical Growth**: While global GDP contracted 3.5% in 2020, the video game sector expanded 20% globally, demonstrating remarkable counter-cyclical performance.\n\n2. **Employment Stability**: The sector maintained and expanded employment despite remote work transitions, with UK game industry employment growing 12.2% during 2020.\n\n3. **Cultural Substitution**: Games provided cultural and social experiences during physical restrictions, with 65% of players surveyed reporting increased use of games for social connection during lockdowns.\n\n4. **Innovation Acceleration**: The pandemic accelerated existing transformation trends, with 3-5 year innovation roadmaps commonly compressed to 6-12 month implementations according to industry surveys.",
      lessons: "The video game sector case provides several key insights for the Cultural Innovation Resilience Framework:\n\n1. **Digital Native Advantage**: Sectors with pre-existing digital capabilities demonstrated greater resilience to physical disruptions, suggesting the importance of digital transformation for resilience enhancement.\n\n2. **Community Integration**: Models integrating audiences as co-creators rather than passive consumers demonstrated greater adaptability during disruption.\n\n3. **Experiential Flexibility**: Cultural forms offering flexible, reconfigurable experiences showed greater capacity to maintain relevance during changing consumption contexts.\n\n4. **Business Model Innovation**: Resilience emerged not just from digital distribution but from business models designed for ongoing engagement rather than one-time transactions.",
      images: [
        { url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Game development studio" },
        { url: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Remote game development collaboration" }
      ]
    },
    {
      id: 'publishing-digital',
      category: 'sectoral',
      title: "Publishing Industry Digital Transformation",
      location: "UK and US publishing sectors",
      period: "2008-2018",
      researcher: "Throsby and Zwar (2022), Cultural Innovation Resilience Framework analysis",
      context: "The publishing industry faced significant disruption from digital transformation, with e-book market share growing from <1% in 2008 to 25% by 2018 in the UK market. Simultaneously, the sector faced challenges from changing consumer behavior, retail consolidation, and competition from new entertainment forms.",
      challenge: "Publishers needed to navigate digital transformation while maintaining viable business models and cultural functions. The challenge involved adapting to new formats and channels while preserving core cultural roles in knowledge dissemination, cultural expression, and diverse voice representation.",
      innovation: "The publishing sector developed several innovations in response to digital disruption:\n\n1. **Format Diversification**: Strategic development of multiple product formats from single content assets, including print, e-book, audiobook, and enhanced digital editions, with documented increase in format variants per title from average 1.2 in The 2008 to 3.7 by 2018.\n\n2. **Community Cultivation**: Development of direct audience relationships circumventing traditional retail channels, with documented cases of publishers building subscriber communities of 50,000+ readers for specific genres or imprints.\n\n3. **Value Chain Reconfiguration**: Strategic integration of previously separate functions including retail (publisher online stores), marketing (direct reader engagement), and subsidiary rights (internal audiobook production).\n\n4. **Data-Informed Commissioning**: Integration of reader analytics into acquisition and development processes, combining traditional editorial judgment with quantitative insight to reduce commercial uncertainty.",
      outcome: "These innovations generated several resilience outcomes:\n\n1. **Market Stabilization**: Following initial disruption, publisher revenues stabilized by 2015 and returned to growth by 2018, with UK publishing revenues growing 3.5% annually 2018-2020 despite continued technological change.\n\n2. **Format Diversification Benefit**: Publishers with more diverse format strategies demonstrated 42% stronger performance during market transitions than those focused primarily on single formats.\n\n3. **Barrier Reduction**: Digital channels reduced barriers to publishing diverse voices, with documented increases in publications from previously under-represented authors.\n\n4. **Organizational Learning**: The publishing case demonstrated how traditional cultural organizations can successfully integrate digital capabilities while maintaining core cultural values.",
      lessons: "The publishing case provides several key insights for the Cultural Innovation Resilience Framework:\n\n1. **Hybrid Advantage**: Strategic integration of physical and digital approaches created greater resilience than either exclusively physical or exclusively digital models.\n\n2. **Content-Format Separation**: Conceptually separating creative content from specific delivery formats enhanced adaptive capacity during technological transition.\n\n3. **Value Chain Reconsideration**: Resilience emerged from willingness to reconsider established value chain positions rather than defending traditional roles.\n\n4. **Cultural-Commercial Integration**: Successful digital transformation maintained core cultural values and functions while adapting commercial approaches rather than subordinating cultural objectives to technology.",
      images: [
        { url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Traditional book production" },
        { url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Digital publishing formats" }
      ]
    },
    
    // Disruption Response Cases
    {
      id: 'museums-covid',
      category: 'disruption',
      title: "Museum Digital Pivot During COVID-19",
      location: "Global museum sector with focus on European institutions",
      period: "2020-2021",
      researcher: "Comunian and England (2020), NEMO (2021), Cultural Innovation Resilience Framework analysis",
      context: "Museums faced unprecedented disruption during the COVID-19 pandemic, with physical venues closed for extended periods. European museums reported closure periods averaging 5.5 months during 2020-2021, with complete cessation of on-site visitation and associated revenue streams.",
      challenge: "Museums needed to maintain cultural functions, audience relationships, and institutional viability despite inability to provide physical visitation experiences. The challenge involved rapidly developing new ways to deliver cultural value while managing severe financial constraints.",
      innovation: "Museums developed several innovations in response to pandemic restrictions:\n\n1. **Digital Experience Innovation**: Rapid development of virtual exhibitions, 3D gallery tours, and interactive digital experiences, with European museums reporting 93% increase in digital content creation during 2020.\n\n2. **Engagement Format Experiments**: Creation of novel engagement formats including curator video series, artist live streams, make-at-home activities, and digital collection games.\n\n3. **Community Support Functions**: Expansion of museum roles to include community wellbeing functions during crisis, including education support for remote learning children and mental health resources for isolated individuals.\n\n4. **Collection Activation**: Innovative approaches to mobilizing collections during closure, including outdoor displays, window exhibitions, and collection items temporarily relocated to public spaces.",
      outcome: "These innovations generated several resilience outcomes:\n\n1. **Audience Expansion**: Digital initiatives reached significantly larger audiences than physical visitation, with surveyed European museums reporting average online audience growth of 27% during closures.\n\n2. **Geographic Extension**: Digital engagement transcended traditional geographic limitations, with documented cases of small regional museums reaching global audiences through distinctive digital content.\n\n3. **New Revenue Models**: Financial innovation created alternative revenue streams, with 23% of surveyed museums successfully monetizing digital content through subscription, membership, or pay-per-access models.\n\n4. **Organizational Transformation**: The crisis accelerated institutional digital transformation, with 76% of museums reporting that digital capabilities developed during the pandemic would be permanently maintained.",
      lessons: "The museum case provides several key insights for the Cultural Innovation Resilience Framework:\n\n1. **Crisis Acceleration Effect**: The pandemic dramatically compressed digital transformation timelines, with institutions implementing in months what had been planned over years.\n\n2. **Mission Continuity Through Changing Means**: Resilient institutions maintained core cultural missions while radically changing delivery mechanisms rather than viewing digital as separate from core purpose.\n\n3. **Resource Redeployment Capacity**: Resilience emerged from ability to rapidly redeploy resources (staff expertise, collection assets, institutional reputation) to new delivery channels.\n\n4. **Expanded Institutional Identity**: Crisis prompted reconsideration of institutional boundaries and functions, with resilient organizations embracing expanded roles rather than narrowing focus during constraint.",
      images: [
        { url: "https://images.unsplash.com/photo-1564399579883-451a5cb0bdad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Traditional museum gallery" },
        { url: "https://images.unsplash.com/photo-1618005198919-177e9045156c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Virtual museum experience" }
      ]
    },
    {
      id: 'christchurch-earthquake',
      category: 'disruption',
      title: "Cultural Response to Christchurch Earthquake",
      location: "Christchurch, New Zealand",
      period: "2011-2018",
      researcher: "Cultural Innovation Resilience Framework analysis",
      context: "Christchurch experienced devastating earthquakes in 2010-2011, with the February 2011 earthquake causing 185 deaths and destroying approximately 80% of buildings in the central business district. Cultural infrastructure was severely affected, with damage to theaters, galleries, heritage buildings, and community facilities.",
      challenge: "The city needed to recover not just physically but socially and psychologically from traumatic disruption. The challenge involved rebuilding the physical city while maintaining community cohesion, processing collective trauma, and developing new urban identity during extended recovery.",
      innovation: "Christchurch developed several cultural innovations during earthquake recovery:\n\n1. **Transitional Architecture**: Development of temporary creative structures including the 'cardboard cathedral' and shipping container mall that provided cultural spaces during extended rebuilding period.\n\n2. **Participatory Memorial Processes**: Community-engaged approaches to developing earthquake memorials, including extensive consultation and temporary memorial installations preceding permanent structures.\n\n3. **Creative Documentation**: Programs supporting artists documenting the recovery process, creating contemporaneous cultural records rather than retrospective commemoration.\n\n4. **Gap Filler Initiative**: Community-led program activating vacant sites with cultural projects, transforming spaces of loss into places of creative possibility.",
      outcome: "These innovations generated several resilience outcomes:\n\n1. **Social Cohesion Maintenance**: Cultural initiatives provided gathering spaces and shared experiences during physical disruption, with 73% of surveyed residents reporting that cultural projects enhanced community connection during recovery.\n\n2. **Psychological Processing**: Creative approaches provided mechanisms for processing collective trauma, with mental health professionals documenting positive impacts of cultural participation on post-disaster wellbeing.\n\n3. **Economic Catalyzation**: Temporary cultural initiatives stimulated economic activity in severely damaged areas before permanent rebuilding was possible, with documented cases of businesses returning to areas activated through cultural projects.\n\n4. **Identity Continuity**: Cultural approaches maintained sense of place identity despite massive physical change, with 68% of residents reporting that cultural projects helped them maintain connection to the city during reconstruction.",
      lessons: "The Christchurch case provides several key insights for the Cultural Innovation Resilience Framework:\n\n1. **Temporal Bridging Function**: Cultural innovations can create crucial bridges between pre-disaster past and eventual recovery future, providing continuity during extended disruption.\n\n2. **Material-Symbolic Integration**: Recovery requires both material reconstruction and symbolic meaning-making, with cultural approaches particularly valuable for the latter dimension.\n\n3. **Participatory Importance**: Community engagement in cultural recovery enhances resilience outcomes beyond what expert-driven approaches alone can achieve.\n\n4. **Opportunity in Disruption**: While deeply traumatic, major disruptions can create openings for cultural innovation that might face resistance during stable periods.",
      images: [
        { url: "https://images.unsplash.com/photo-1528132350043-88d11d9a59f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Christchurch temporary structures" },
        { url: "https://images.unsplash.com/photo-1538881061086-32aea73a941a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", caption: "Community cultural activation" }
      ]
    }
  ];
  
  // Filter case studies by category
  const filteredCaseStudies = caseStudies.filter(caseStudy => caseStudy.category === activeCategory);
  
  return (
    <div className="flex flex-col items-center p-4 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Detailed Case Studies</h1>
      <h2 className="text-xl mb-6 text-gray-600 text-center">Cultural Innovation and Economic Resilience</h2>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md w-full">
        <p className="text-gray-700">
          This collection provides detailed case studies examining how cultural innovation contributes to economic resilience across diverse contexts. Each case documents specific mechanisms through which cultural approaches enhance resistance, recovery, adaptation, and transformation in response to various disruptions.
        </p>
      </div>
      
      {/* Category tabs */}
      <div className="flex flex-wrap mb-6 w-full">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 mr-2 mb-2 rounded-full flex items-center transition-all ${activeCategory === category.id ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => {
              setActiveCategory(category.id);
              setActiveCaseStudy(null);
            }}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Category description */}
      <div className="w-full mb-6 bg-white p-3 rounded-lg shadow-sm text-center">
        <p className="text-gray-600">
          {categories.find(cat => cat.id === activeCategory).description}
        </p>
      </div>
      
      {/* Case study details */}
      {activeCaseStudy && (
        <div className="w-full bg-white rounded-lg shadow-md p-5 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {filteredCaseStudies.find(cs => cs.id === activeCaseStudy).title}
              </h3>
              <div className="flex flex-wrap text-sm text-gray-500 mt-1">
                <div className="mr-4">📍 {filteredCaseStudies.find(cs => cs.id === activeCaseStudy).location}</div>
                <div className="mr-4">⏱️ {filteredCaseStudies.find(cs => cs.id === activeCaseStudy).period}</div>
                <div>🔍 {filteredCaseStudies.find(cs => cs.id === activeCaseStudy).researcher}</div>
              </div>
            </div>
            <button 
              onClick={() => setActiveCaseStudy(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Case study images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {filteredCaseStudies.find(cs => cs.id === activeCaseStudy).images.map((image, idx) => (
              <div key={idx} className="relative h-48 w-full rounded-md overflow-hidden shadow-sm">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${image.url})` }}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                  <div className="p-2 text-white text-sm w-full bg-black bg-opacity-50">
                    {image.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-2 pb-2 border-b">Context</h4>
              <p className="text-gray-700 whitespace-pre-line">{filteredCaseStudies.find(cs => cs.id === activeCaseStudy).context}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2 pb-2 border-b">Challenge</h4>
              <p className="text-gray-700 whitespace-pre-line">{filteredCaseStudies.find(cs => cs.id === activeCaseStudy).challenge}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-2 pb-2 border-b">Cultural Innovation Strategies</h4>
            <p className="text-gray-700 whitespace-pre-line">{filteredCaseStudies.find(cs => cs.id === activeCaseStudy).innovation}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-2 pb-2 border-b">Resilience Outcomes</h4>
            <p className="text-gray-700 whitespace-pre-line">{filteredCaseStudies.find(cs => cs.id === activeCaseStudy).outcome}</p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-2 pb-2 border-b">Key Insights for CIRF</h4>
            <p className="text-gray-700 whitespace-pre-line">{filteredCaseStudies.find(cs => cs.id === activeCaseStudy).lessons}</p>
          </div>
        </div>
      )}
      
      {/* Case study cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredCaseStudies.map((caseStudy) => (
          <div 
            key={caseStudy.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer"
            onClick={() => setActiveCaseStudy(caseStudy.id)}
          >
            <div 
              className="h-40 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${caseStudy.images[0].url})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="p-3 text-white font-bold">{caseStudy.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex text-xs text-gray-500 mb-2">
                <div className="mr-3">📍 {caseStudy.location}</div>
                <div>⏱️ {caseStudy.period}</div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{caseStudy.context}</p>
              <div className="mt-3 text-blue-500 text-sm font-semibold flex items-center">
                View detailed case study
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white p-5 rounded-lg shadow-md w-full">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Cross-Cutting Insights from Case Studies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 pl-3">
            <p className="font-semibold text-gray-700">Multi-dimensional Value Creation</p>
            <p className="text-gray-600 text-sm">Cultural innovation enhances resilience through simultaneously generating economic, social, symbolic, and experiential value</p>
          </div>
          <div className="border-l-4 border-green-500 pl-3">
            <p className="font-semibold text-gray-700">Distinctive Digital-Physical Integration</p>
            <p className="text-gray-600 text-sm">Most resilient approaches integrate digital and physical dimensions rather than pursuing exclusively digital or physical strategies</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-3">
            <p className="font-semibold text-gray-700">Network-Based Adaptation</p>
            <p className="text-gray-600 text-sm">Cultural innovation enhances resilience through developing flexible networks that can rapidly reconfigure during disruption</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-3">
            <p className="font-semibold text-gray-700">Context-Specific Implementation</p>
            <p className="text-gray-600 text-sm">While cross-cutting patterns emerge, successful cultural innovation strategies are calibrated to specific contextual conditions</p>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-8">
        {!activeCaseStudy && "Click on a case study card to view detailed information"}
      </div>
    </div>
  );
};

export default DetailedCaseStudies;
