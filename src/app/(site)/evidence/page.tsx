import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Global Evidence',
  description: 'The Cultural Innovation Lab evidence base — case studies of cultural innovation are being re-verified ahead of publication.',
}

// NOTE (cil-cleanup-pass): The case studies below are temporarily withheld from
// display pending re-verification of their sources and figures. Do not delete —
// restore the grid once the cases are confirmed. Original dataset preserved here:
//
// const DETAILED_CASES = [
//   { country: 'South Korea', flag: '🇰🇷', model: 'Hallyu Wave', stat: 'US$12.3B economic contribution (2019)', region: 'Asia', description: 'Systematic government investment of US$5.5B through the Cultural Content Office produced outsized returns, making K-pop, K-drama, and Korean cuisine into a global economic force.' },
//   { country: 'Shanghai, China', flag: '🇨🇳', model: 'Creative Clusters', stat: '12% of city GDP from cultural industries', region: 'Asia', description: 'Purpose-built creative clusters transformed former industrial zones into hubs for design, digital media, and fashion — generating 12% of Shanghai\'s GDP.' },
//   { country: 'India', flag: '🇮🇳', model: 'Traditional Knowledge Digital Library', stat: '500,000+ formulations documented', region: 'Asia', description: 'The TKDL documented over 500,000 traditional formulations and established agreements with 17 international patent offices, preventing 200+ biopiracy patents.' },
//   { country: 'Bhutan', flag: '🇧🇹', model: 'GNH Tourism', stat: '6% of GDP, US$100/night SDF', region: 'Asia', description: 'Bhutan\'s Sustainable Development Fee funds free healthcare and education for all citizens — ensuring tourism revenue benefits the entire population, not just operators.' },
//   { country: 'Peru', flag: '🇵🇪', model: 'Culinary Innovation', stat: '45% sector growth, 135,000 jobs in Lima', region: 'Americas', description: 'Peru\'s gastronomy boom created 135,000 restaurant jobs in Lima alone and grew the sector by 45% — though equitable distribution remains a challenge.' },
//   { country: 'Japan', flag: '🇯🇵', model: 'Traditional Craft Innovation', stat: '¥100B market', region: 'Asia', description: 'The Living National Treasure system preserves master craftspeople. Yet the sector lost 80% of market value as apprenticeship pipelines weakened — a cautionary tale for knowledge transfer.' },
//   { country: 'Italy', flag: '🇮🇹', model: 'Artisan Clusters & GI', stat: 'Largest number of EU GI products', region: 'Europe', description: 'Italy\'s Geographic Indication system protects and premium-prices products from Parmigiano-Reggiano to Murano glass, demonstrating how institutional authenticity verification creates economic value.' },
//   { country: 'South Africa', flag: '🇿🇦', model: 'San Digital Storytelling', stat: 'Indigenous knowledge preservation', region: 'Africa', description: 'San communities leveraged digital storytelling tools to preserve and share indigenous knowledge on their own terms — a model for community-controlled digital heritage.' },
//   { country: 'NE India', flag: '🇮🇳', model: 'Handloom Sector', stat: 'Second-largest rural employer', region: 'Asia', description: 'India\'s handloom sector is the second-largest rural employer. Predominantly women-led weaving cooperatives demonstrate cultural innovation as a vehicle for gender economic empowerment.' },
//   { country: 'Berlin, Germany', flag: '🇩🇪', model: 'Creative Industries', stat: '€18B turnover, 210,000 jobs', region: 'Europe', description: 'Berlin\'s creative economy generates €18B in turnover, employs 210,000 people, and contributes 10% of the city\'s GDP — proving creative industries as a mainstream economic driver.' },
//   { country: 'Australia', flag: '🇦🇺', model: 'Indigenous Art Centres', stat: 'AU$250-500M annual revenue', region: 'Oceania', description: 'Community-owned Indigenous art centres generate AU$250-500M annually while AU$7B in cultural tourism demonstrates that community ownership structures can scale without sacrificing authenticity.' },
//   { country: 'Ghana', flag: '🇬🇭', model: 'Kente Cloth GI (2025)', stat: 'First African textile with WIPO GI', region: 'Africa', description: 'Ghana\'s Kente cloth received WIPO Geographical Indication status in 2025, complete with QR code traceability — a replicable model for any cultural product with geographic specificity.' },
// ]

export default function EvidencePage() {
  return (
    <>
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #f0f5f4 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#D4A843' }}>Global Evidence</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
            An Evidence Base From Around the World
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#4a5568' }}>
            The CIRF framework is grounded in cultural innovation models from across the globe — spanning
            different regions, sectors, and economic contexts.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-10 rounded-2xl bg-white text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="text-4xl mb-4" aria-hidden="true">📚</div>
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
              Case studies are being verified
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4a5568' }}>
              We are currently re-checking the sources, figures, and citations behind each case study before
              publishing them here. The full library of documented cases will be available soon.
            </p>
            <p className="text-sm" style={{ color: '#4a5568' }}>
              In the meantime, you can explore{' '}
              <Link href="/framework" className="font-semibold" style={{ color: '#1A8A7D' }}>the framework</Link>{' '}
              or{' '}
              <Link href="/contact" className="font-semibold" style={{ color: '#1A8A7D' }}>get in touch</Link>{' '}
              about the research.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <Link href="/assessment" className="inline-flex px-8 py-4 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#1A8A7D' }}>
          Assess Your Initiative with the CIRF →
        </Link>
      </section>
    </>
  )
}
