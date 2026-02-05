import Link from 'next/link'

const footerLinks = {
  research: [
    { name: 'Framework', href: '/framework' },
    { name: 'Publications', href: '/research' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Data Repository', href: '/resources' },
  ],
  tools: [
    { name: 'Assessment Tool', href: '/tools' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Templates', href: '/resources' },
    { name: 'Calculators', href: '/tools' },
  ],
  connect: [
    { name: 'About', href: '/about' },
    { name: 'Platform', href: '/platform' },
    { name: 'Contact', href: '/about#contact' },
    { name: 'Newsletter', href: '/about#newsletter' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund-policy' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-ink text-pearl py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl md:text-3xl font-light mb-6">
              Cultural Innovation Lab
            </h3>
            <p className="text-base leading-relaxed font-light opacity-80">
              Heritage is not a museum. It is an economy waiting to be built.
              We research, build, and connect the global ecosystem of cultural entrepreneurs.
            </p>
          </div>

          {/* Research Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 font-normal">Research</h4>
            <ul className="space-y-3">
              {footerLinks.research.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pearl/80 hover:text-pearl transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 font-normal">Tools</h4>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pearl/80 hover:text-pearl transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 font-normal">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pearl/80 hover:text-pearl transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 font-normal">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pearl/80 hover:text-pearl transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-pearl/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Cultural Innovation Lab. All rights reserved.
          </p>
          <p className="text-sm opacity-60">
            Empowering communities worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}
