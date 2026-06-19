import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About the Cultural Innovation Lab, the CIRF framework, and the researcher behind it.',
}

export default function AboutPage() {
  return (
    <>
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #f0f5f4 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#D4A843' }}>About</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
            Cultural Innovation Lab
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#4a5568' }}>
            Research-driven tools for measuring, protecting, and scaling cultural innovation globally.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Researcher */}
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-1">
              <div className="w-32 h-32 rounded-2xl mx-auto md:mx-0 flex items-center justify-center text-5xl" style={{ backgroundColor: '#f0f5f4' }}>
                👩‍🔬
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
                Lalrinngheti Sangsiama
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#4a5568' }}>
                Lalrinngheti is a DBA candidate at the Swiss School of Business and Management Geneva, researching cultural
                innovation as a strategic driver of economic resilience. Her doctoral thesis, <em>&ldquo;Cultural Innovation as a
                Strategic Asset: Building Scalable Frameworks for Economic Resilience in a Globalised Economy&rdquo;</em>, develops the
                Cultural Innovation Resilience Framework (CIRF) — the first integrated framework for measuring, protecting,
                and scaling cultural innovation across diverse global contexts.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                Her research examines cultural innovation models from across multiple regions and continents — spanning
                heritage tourism, traditional craft, creative industries, and indigenous enterprise.
              </p>
            </div>
          </div>

          {/* The Research */}
          <div className="p-8 rounded-2xl" style={{ backgroundColor: '#f5f2ed' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
              The Research
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#4a5568' }}>
              <p>
                The Cultural Innovation Lab is the applied research platform for this doctoral study. It serves three functions:
              </p>
              <ul className="space-y-2 pl-5 list-disc">
                <li><strong style={{ color: '#0D1B2A' }}>Assessment tool:</strong> The CIRF Self-Assessment lets cultural entrepreneurs, policymakers, and researchers evaluate their initiatives against the framework&apos;s four pillars.</li>
                <li><strong style={{ color: '#0D1B2A' }}>Evidence base:</strong> A library of global case studies provides the empirical foundation, each analysed across the CIRF&apos;s dimensions. (Currently being re-verified ahead of publication.)</li>
                <li><strong style={{ color: '#0D1B2A' }}>Research instrument:</strong> Anonymised assessment data feeds ongoing research into global cultural innovation patterns and resilience factors.</li>
              </ul>
            </div>
          </div>

          {/* Mission */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
              Our Vision
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
              Cultural innovation — the strategic transformation of heritage, traditions, and community knowledge into
              economic opportunities — is one of the world&apos;s most powerful but least measured economic forces.
              The Cultural Innovation Lab exists to change that: to provide the frameworks, tools, and evidence
              that policymakers, entrepreneurs, and communities need to build resilient cultural economies.
            </p>
          </div>

          {/* Contact */}
          <div id="contact" className="scroll-mt-24 p-8 rounded-2xl text-center" style={{ backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
              Get in Touch
            </h2>
            <p className="text-sm mb-4" style={{ color: '#4a5568' }}>
              For questions about this research, partnership enquiries, or media requests:
            </p>
            <a href="mailto:hello@culturalinnovationlab.org" className="text-base font-semibold" style={{ color: '#1A8A7D' }}>
              hello@culturalinnovationlab.org
            </a>
            <div className="mt-6">
              <Link href="/survey" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold" style={{ backgroundColor: '#D4A843', color: '#0D1B2A' }}>
                🎓 Participate in Expert Validation Survey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
