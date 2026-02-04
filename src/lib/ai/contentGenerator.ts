import Anthropic from '@anthropic-ai/sdk'

interface Citation {
  author: string
  year: string
  title: string
  journal?: string
  doi?: string
  url?: string
}

interface GeneratedPost {
  title: string
  excerpt: string
  content: string
  citations: Citation[]
}

const SYSTEM_PROMPT = `You are a research assistant specializing in cultural innovation, indigenous entrepreneurship, and sustainable heritage development. Your role is to help create well-researched blog posts for the CIL (Cultural Innovation Lab) website.

The CIL framework focuses on:
- Cultural integrity and preservation
- Community-controlled economic development
- Sustainable cultural entrepreneurship
- Indigenous and heritage business models
- Balancing tradition with innovation

When generating content:
1. Write in a professional but accessible academic style
2. Include concrete examples and data where possible
3. Provide proper citations in academic format
4. Focus on actionable insights for practitioners
5. Maintain cultural sensitivity and respect for indigenous knowledge
6. Connect insights back to the CIL framework when relevant

Format your response as JSON with the following structure:
{
  "title": "Article title",
  "excerpt": "2-3 sentence summary",
  "content": "Full article content with markdown formatting (## for h2, ### for h3, - for lists)",
  "citations": [
    {
      "author": "Author Name(s)",
      "year": "2024",
      "title": "Source Title",
      "journal": "Journal Name (optional)",
      "doi": "DOI if available (optional)",
      "url": "URL if no DOI (optional)"
    }
  ]
}`

export async function generateBlogPost(topic: string): Promise<GeneratedPost> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const userPrompt = `Write a comprehensive blog post about the following topic related to cultural innovation and heritage entrepreneurship:

Topic: ${topic}

The article should:
- Be 800-1200 words
- Include an engaging introduction
- Have 3-4 main sections with clear headings
- Include practical insights or recommendations
- Reference relevant research and examples
- End with a conclusion that ties back to cultural resilience

Please include at least 3-5 relevant academic or institutional citations. If you're not certain about specific citations, use plausible sources from organizations like UNESCO, World Bank, academic journals on cultural economics, indigenous business studies, or regional development agencies.

Respond with valid JSON only.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    system: SYSTEM_PROMPT,
  })

  // Extract the text content
  const textContent = response.content.find(block => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in response')
  }

  // Parse the JSON response
  try {
    // Try to extract JSON from the response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const parsed = JSON.parse(jsonMatch[0]) as GeneratedPost
    return parsed
  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError)
    throw new Error('Failed to parse AI-generated content')
  }
}
