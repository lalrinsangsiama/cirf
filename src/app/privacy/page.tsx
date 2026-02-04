import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | CIL',
  description: 'Learn how the Cultural Innovation Lab collects, uses, and protects your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Legal
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>Privacy Policy</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Last updated: January 30, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Introduction</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                The Cultural Innovation Lab (&quot;CIL,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website cirf-framework.org and use our services.
              </p>
              <p className="text-lg leading-relaxed text-stone">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </div>

            {/* Data Controller */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Data Controller</h2>
              <p className="text-lg leading-relaxed text-stone">
                For the purposes of applicable data protection laws, the data controller is:
              </p>
              <div className="bg-pearl p-6 rounded-lg mt-4">
                <p className="text-stone">
                  Cultural Innovation Lab<br />
                  Email: contact@cirf-framework.org
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Information We Collect</h2>

              <h3 className="font-medium text-xl mb-3 mt-6">Personal Data You Provide</h3>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone mb-6">
                <li>Create an account (name, email address, password)</li>
                <li>Purchase credits (payment information processed by Razorpay)</li>
                <li>Complete assessments (assessment responses and results)</li>
                <li>Subscribe to our newsletter (name, email address)</li>
                <li>Contact us through our contact form (name, email, message content)</li>
              </ul>

              <h3 className="font-medium text-xl mb-3 mt-6">Usage Data</h3>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We automatically collect certain information when you visit our website:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone mb-6">
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Device information (type, operating system)</li>
                <li>IP address (anonymized for analytics)</li>
              </ul>

              <h3 className="font-medium text-xl mb-3 mt-6">Payment Data</h3>
              <p className="text-lg leading-relaxed text-stone">
                When you purchase credits, your payment is processed by Razorpay. We do not store your complete credit card details on our servers. We receive from Razorpay: transaction ID, payment status, amount, and the last four digits of your card (for reference purposes only).
              </p>
            </div>

            {/* How We Use Your Data */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">How We Use Your Data</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li>Provide, operate, and maintain our services</li>
                <li>Process your transactions and manage your account</li>
                <li>Send you transactional emails (purchase confirmations, account updates)</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Comply with legal obligations</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Data Sharing & Third Parties</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We share your information with the following third-party service providers:
              </p>

              <div className="space-y-4">
                <div className="bg-pearl p-6 rounded-lg">
                  <h4 className="font-medium mb-2">Razorpay (Payment Processing)</h4>
                  <p className="text-stone text-sm">
                    Processes payments securely. Their privacy policy: <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">razorpay.com/privacy</a>
                  </p>
                </div>
                <div className="bg-pearl p-6 rounded-lg">
                  <h4 className="font-medium mb-2">Supabase (Database & Authentication)</h4>
                  <p className="text-stone text-sm">
                    Hosts our database and handles authentication. Their privacy policy: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">supabase.com/privacy</a>
                  </p>
                </div>
                <div className="bg-pearl p-6 rounded-lg">
                  <h4 className="font-medium mb-2">Resend (Email Service)</h4>
                  <p className="text-stone text-sm">
                    Sends transactional and marketing emails. Their privacy policy: <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">resend.com/privacy</a>
                  </p>
                </div>
              </div>

              <p className="text-lg leading-relaxed text-stone mt-6">
                We do not sell your personal information to third parties.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Cookies and Tracking</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone mb-6">
                <li><strong>Essential cookies:</strong> Required for authentication and site functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone">
                You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.
              </p>
            </div>

            {/* User Rights */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Your Rights</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Withdraw consent:</strong> Where processing is based on consent</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone mt-4">
                To exercise any of these rights, please contact us at <a href="mailto:contact@cirf-framework.org" className="text-ocean hover:underline">contact@cirf-framework.org</a>.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Data Retention</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We retain your personal data for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations (e.g., tax records)</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone mt-4">
                When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it for legal purposes.
              </p>
            </div>

            {/* Security */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Security Measures</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We implement appropriate technical and organizational measures to protect your personal data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li>Encryption of data in transit (HTTPS/TLS)</li>
                <li>Secure password hashing</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure hosting infrastructure</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone mt-4">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your personal data, we cannot guarantee absolute security.
              </p>
            </div>

            {/* Children */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Children&apos;s Privacy</h2>
              <p className="text-lg leading-relaxed text-stone">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </div>

            {/* Changes */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Changes to This Policy</h2>
              <p className="text-lg leading-relaxed text-stone">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Contact Us</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-pearl p-6 rounded-lg">
                <p className="text-stone">
                  Email: <a href="mailto:contact@cirf-framework.org" className="text-ocean hover:underline">contact@cirf-framework.org</a><br />
                  Website: <Link href="/about#contact" className="text-ocean hover:underline">Contact Form</Link>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
