import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Cultural Innovation Lab — research questions, partnership enquiries, and media requests.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #f0f5f4 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#D4A843' }}>Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1B2A' }}>
            Get in Touch
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#4a5568' }}>
            For research questions, partnership enquiries, or media requests, send a message below or email{' '}
            <a href="mailto:hello@culturalinnovationlab.org" className="font-semibold" style={{ color: '#1A8A7D' }}>
              hello@culturalinnovationlab.org
            </a>
            .
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-6">
          <div id="contact" className="scroll-mt-24 p-8 rounded-2xl bg-white" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <ContactForm />
          </div>
          <p className="text-xs text-center mt-6" style={{ color: '#4a5568' }}>
            Your message is stored securely and used only to respond to your enquiry. We never sell or share your information.
          </p>
        </div>
      </section>
    </>
  )
}
