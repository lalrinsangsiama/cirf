import Link from 'next/link'
import { NewsletterForm } from '@/components/forms/NewsletterForm'

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: '#0D1B2A', color: 'rgba(255,255,255,0.7)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cultural Innovation Lab
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              A research initiative by Lalrinngheti Sangsiama
              <br />DBA, Swiss School of Business and Management Geneva
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Explore</h4>
            <div className="space-y-2.5">
              {[
                { href: '/assessment', label: 'CIRF Assessment' },
                { href: '/framework', label: 'The Framework' },
                { href: '/evidence', label: 'Global Evidence' },
                { href: '/resources', label: 'Resources' },
                { href: '/blog', label: 'Blog' },
                { href: '/survey', label: 'Expert Survey' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <a href="mailto:hello@culturalinnovationlab.org" className="text-sm hover:text-white transition-colors">
              hello@culturalinnovationlab.org
            </a>

            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mt-8 mb-3">Stay updated</h4>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Research findings and case studies, occasionally — no spam.
            </p>
            <NewsletterForm variant="compact" showName={false} showRole={false} />

            <p className="text-xs mt-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Your data is stored securely and used only for academic research. We never sell or share your information.
            </p>
          </div>
        </div>

        <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
            &copy; {new Date().getFullYear()} Cultural Innovation Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
