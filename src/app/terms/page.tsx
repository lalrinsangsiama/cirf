import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | CIL',
  description: 'Terms and conditions for using the Cultural Innovation Lab platform and services.',
}

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Legal
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>Terms of Service</span></span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed font-light max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Last updated: 1 March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">

            {/* Acceptance */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">1. Acceptance of Terms</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                By accessing or using the Cultural Innovation Lab website (culturalinnovationlab.org) and services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our services.
              </p>
              <p className="text-lg leading-relaxed text-stone">
                We reserve the right to modify these Terms at any time. Your continued use of the services after any changes constitutes acceptance of the modified Terms.
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li><strong>&quot;Services&quot;</strong> refers to the CIL website, assessment tools, and all related features</li>
                <li><strong>&quot;User,&quot; &quot;you,&quot; &quot;your&quot;</strong> refers to any person who accesses or uses our Services</li>
                <li><strong>&quot;Content&quot;</strong> refers to all text, data, graphics, and other materials on the platform</li>
              </ul>
            </div>

            {/* Account Registration */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">3. Account Registration</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                To access certain features, you must create an account. When registering, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password and account</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone">
                We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.
              </p>
            </div>

            {/* Assessment Tool */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">4. Assessment Tool Usage</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                The CIL Assessment Tool is part of an ongoing academic research project designed for research and educational purposes. By using the assessment:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone mb-4">
                <li>You acknowledge results are based on self-reported data</li>
                <li>Results are for informational purposes and do not constitute professional, financial, legal, or strategic advice</li>
                <li>The research is experimental and subject to change</li>
                <li>You should not rely on any output from this platform as a basis for making decisions without seeking independent professional advice</li>
                <li>You may use results for personal or organizational planning at your own risk</li>
                <li>Commercial redistribution of results requires written permission</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We strive for accuracy but do not guarantee that assessment results will be error-free or achieve specific outcomes.
              </p>
              <p className="text-lg leading-relaxed text-stone bg-pearl p-4 rounded-lg border-l-4 border-gold">
                CIL is an ongoing academic research project. All assessments, tools, frameworks, results, and content on this platform are provided strictly for informational and educational purposes. The Cultural Innovation Lab and its operators accept no liability for any harm, loss, damage, or adverse outcome arising from the use of this platform or reliance on its content.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">5. Intellectual Property</h2>

              <h3 className="font-medium text-xl mb-3 mt-6">Our Content</h3>
              <p className="text-lg leading-relaxed text-stone mb-4">
                All content on the CIL platform, including but not limited to text, graphics, logos, research, frameworks, and software, is owned by CIL or its licensors and protected by intellectual property laws.
              </p>

              <h3 className="font-medium text-xl mb-3 mt-6">Your License</h3>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We grant you a limited, non-exclusive, non-transferable license to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone mb-4">
                <li>Access and use the Services for personal or organizational purposes</li>
                <li>Download and print materials for non-commercial use</li>
                <li>Share assessment results with appropriate attribution</li>
              </ul>

              <h3 className="font-medium text-xl mb-3 mt-6">Restrictions</h3>
              <p className="text-lg leading-relaxed text-stone">
                You may not: reproduce, distribute, modify, or create derivative works from our content without permission; use our trademarks without authorization; or reverse-engineer our software or tools.
              </p>
            </div>

            {/* User Content */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">6. User Content</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                You retain ownership of any content you submit (assessment responses, feedback, etc.). By submitting content, you grant us a non-exclusive, royalty-free license to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone mb-4">
                <li>Process and store your content to provide the Services</li>
                <li>Use anonymized, aggregated data for research and improvement</li>
                <li>Display your feedback or testimonials (with your permission)</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone">
                You are responsible for ensuring you have the right to submit any content and that it does not violate third-party rights.
              </p>
            </div>

            {/* Prohibited Conduct */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">7. Prohibited Conduct</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                When using our Services, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate others or provide false information</li>
                <li>Interfere with or disrupt the Services</li>
                <li>Attempt to gain unauthorized access to systems or data</li>
                <li>Use automated tools to access the Services without permission</li>
                <li>Transmit viruses, malware, or other harmful code</li>
                <li>Engage in fraudulent activities</li>
                <li>Harass, abuse, or threaten other users or staff</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">8. Limitation of Liability</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone mb-4">
                <li>CIL shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
                <li>All services are provided free of charge as part of ongoing research; our total liability is limited to zero</li>
                <li>We are not liable for any loss of data, profits, or business opportunities</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone">
                Some jurisdictions do not allow the exclusion of certain warranties or limitations, so some of these limitations may not apply to you.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the Services will be uninterrupted or error-free</li>
                <li>Warranties regarding the accuracy or completeness of content</li>
                <li>Warranties against infringement of third-party rights</li>
              </ul>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">10. Indemnification</h2>
              <p className="text-lg leading-relaxed text-stone">
                You agree to indemnify and hold harmless CIL, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from: your use of the Services; your violation of these Terms; your violation of any third-party rights; or any content you submit.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">11. Termination</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                You may terminate your account at any time by contacting us. We may suspend or terminate your access if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone mb-4">
                <li>You violate these Terms</li>
                <li>You engage in fraudulent or illegal activity</li>
                <li>We are required to do so by law</li>
                <li>We discontinue the Services (with reasonable notice)</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone">
                Upon termination, your right to use the Services ceases immediately.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">12. Governing Law & Disputes</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of the Services shall be:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li>First, attempted to be resolved through good-faith negotiation</li>
                <li>If unresolved, submitted to binding arbitration</li>
                <li>Subject to the exclusive jurisdiction of courts in India</li>
              </ul>
            </div>

            {/* Severability */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">13. Severability</h2>
              <p className="text-lg leading-relaxed text-stone">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect. The unenforceable provision will be modified to the minimum extent necessary to make it enforceable.
              </p>
            </div>

            {/* Changes */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">14. Changes to Terms</h2>
              <p className="text-lg leading-relaxed text-stone">
                We may update these Terms from time to time. Material changes will be notified via email or a prominent notice on our website. Your continued use after changes constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">15. Contact Us</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-pearl p-6 rounded-lg">
                <p className="text-stone">
                  Email: <a href="mailto:hello@culturalinnovationlab.org" className="text-ocean hover:underline">hello@culturalinnovationlab.org</a><br />
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
