// src/app/page.tsx - Homepage Implementation
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, TrendingUp, Users, BookOpen, Globe, Award, Calendar, Eye, Clock } from 'lucide-react'

export default function HomePage() {
  // Sample data - you'll replace this with real data from Supabase
  const featuredResearch = [
    {
      id: 1,
      title: "Global Cultural Entrepreneurship Survey 2024",
      excerpt: "Comprehensive analysis of 2,847 cultural entrepreneurs across 47 countries reveals key trends and challenges.",
      category: "Survey Report",
      publishedAt: "2024-01-15",
      downloadCount: 1243,
      geographic_scope: ["Global"],
      sample_size: 2847
    },
    {
      id: 2,
      title: "Impact of Digital Transformation on Creative Industries",
      excerpt: "How digital technologies are reshaping business models in cultural sectors worldwide.",
      category: "Market Analysis",
      publishedAt: "2024-01-10",
      downloadCount: 892,
      geographic_scope: ["North America", "Europe"],
      sample_size: 1500
    },
    {
      id: 3,
      title: "Policy Frameworks for Cultural Innovation",
      excerpt: "Comparative study of government support systems for cultural entrepreneurs across 12 countries.",
      category: "Policy Research",
      publishedAt: "2024-01-05",
      downloadCount: 567,
      geographic_scope: ["Global"],
      sample_size: 450
    }
  ]

  const latestArticles = [
    {
      id: 1,
      title: "From Street Art to Global Brand: The Maria Santos Story",
      excerpt: "How a Mexican muralist built a multi-million dollar cultural enterprise while staying true to her artistic vision.",
      category: "profiles",
      author: "Dr. Sarah Chen",
      publishedAt: "2024-01-20",
      readingTime: 8,
      viewCount: 2341,
      featured_image: "/api/placeholder/400/240",
      tags: ["Visual Arts", "Mexico", "Scaling", "Brand Building"]
    },
    {
      id: 2,
      title: "The Complete Guide to Cultural Impact Measurement",
      excerpt: "Essential frameworks and tools for measuring social and cultural impact in creative enterprises.",
      category: "guides",
      author: "Prof. David Kim",
      publishedAt: "2024-01-18",
      readingTime: 12,
      viewCount: 1876,
      featured_image: "/api/placeholder/400/240",
      tags: ["Impact Measurement", "Social Enterprise", "Metrics"]
    },
    {
      id: 3,
      title: "Funding Landscape for Cultural Startups in 2024",
      excerpt: "New investment trends, emerging grant opportunities, and alternative financing models for cultural entrepreneurs.",
      category: "insights",
      author: "Lisa Rodriguez",
      publishedAt: "2024-01-15",
      readingTime: 6,
      viewCount: 3124,
      featured_image: "/api/placeholder/400/240",
      tags: ["Funding", "Investment", "Grants", "Alternative Finance"]
    }
  ]

  const stats = [
    { label: "Cultural Entrepreneurs", value: "10,000+", icon: Users },
    { label: "Countries Represented", value: "75+", icon: Globe },
    { label: "Research Reports", value: "250+", icon: BookOpen },
    { label: "Success Stories", value: "500+", icon: Award }
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      profiles: 'bg-cultural-1/10 text-cultural-1 border-cultural-1/20',
      advice: 'bg-cultural-2/10 text-cultural-2 border-cultural-2/20',
      insights: 'bg-cultural-3/10 text-cultural-3 border-cultural-3/20',
      guides: 'bg-cultural-4/10 text-cultural-4 border-cultural-4/20',
      news: 'bg-accent-100 text-accent-600 border-accent-600/20'
    }
    return colors[category as keyof typeof colors] || colors.news
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-container-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="authority-badge mb-6">
            <Award className="w-4 h-4 mr-2" />
            Leading Research Authority on Cultural Entrepreneurship
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-900 mb-6">
            Advance Your
            <span className="text-accent-600"> Cultural Enterprise</span>
          </h1>
          
          <p className="text-xl text-primary-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            The definitive research platform and publication for cultural entrepreneurs worldwide. 
            Access cutting-edge research, connect with peers, and get the insights you need to build 
            a successful cultural enterprise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="btn-primary">
              Explore Research
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="btn-secondary">
              Join Community
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-900">{stat.value}</div>
                <div className="text-sm text-primary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-container-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Latest Research & Insights
            </h2>
            <p className="text-lg text-primary-700 max-w-2xl mx-auto">
              Discover the latest findings from our global research initiatives, 
              designed to inform and empower cultural entrepreneurs worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {featuredResearch.map((report) => (
              <Card key={report.id} className="research-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-info-100 text-info-600">
                      {report.category}
                    </Badge>
                    <div className="flex items-center text-sm text-primary-500">
                      <Eye className="w-4 h-4 mr-1" />
                      {report.downloadCount.toLocaleString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-primary-900 mb-2">
                    {report.title}
                  </CardTitle>
                  <CardDescription className="text-primary-700">
                    {report.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-primary-600 mb-4">
                    <span>Sample: {report.sample_size.toLocaleString()}</span>
                    <span>{new Date(report.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Read Report
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/research">
              <Button variant="outline" size="lg">
                View All Research
                <TrendingUp className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16">
        <div className="max-w-container-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Latest Articles & Stories
            </h2>
            <p className="text-lg text-primary-700 max-w-2xl mx-auto">
              Real stories, practical advice, and actionable insights from successful 
              cultural entrepreneurs around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {latestArticles.map((article) => (
              <Card key={article.id} className="card group">
                <div className="aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                    </Badge>
                    <div className="flex items-center text-sm text-primary-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readingTime} min
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-primary-700 mb-4">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-primary-600 mb-4">
                    <span>By {article.author}</span>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {article.viewCount.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Read Article
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/publication">
              <Button variant="outline" size="lg">
                View All Articles
                <BookOpen className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Highlight */}
      <section className="py-16 bg-accent-50">
        <div className="max-w-container-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-900 mb-6">
              Join a Global Community
            </h2>
            <p className="text-lg text-primary-700 mb-8">
              Connect with cultural entrepreneurs, researchers, and industry experts from around the world. 
              Share experiences, find mentors, and build meaningful collaborations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Discussion Forums</h3>
                <p className="text-primary-700">
                  Engage in meaningful conversations with peers facing similar challenges.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Mentorship Program</h3>
                <p className="text-primary-700">
                  Get matched with experienced mentors who understand your journey.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Global Events</h3>
                <p className="text-primary-700">
                  Attend webinars, workshops, and networking events designed for cultural entrepreneurs.
                </p>
              </div>
            </div>
            
            <Button size="lg" className="btn-primary">
              Join Community
              <Users className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-container-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Cultural Enterprise?
          </h2>
          <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
            Join thousands of cultural entrepreneurs who rely on our research and insights 
            to build successful, sustainable cultural enterprises.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent-600 hover:bg-accent-500 text-white">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-900">
              Explore Research
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}