import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | CIL',
  description: 'Learn about our credit refund policy, cancellation terms, and how to request a refund for the CIL platform.',
}

export default function RefundPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-16 bg-pearl">
        <div className="max-w-[1600px] mx-auto">
          <p className="section-label opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Legal
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.9] tracking-tight mb-8">
            <span className="hero-line"><span>Refund &</span></span>
            <span className="hero-line"><span className="italic">Cancellation Policy</span></span>
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

            {/* Overview */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Overview</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                At the Cultural Innovation Lab (CIL), we want you to be completely satisfied with your purchase. This policy outlines the terms and conditions for refunds and cancellations of credit purchases on our platform.
              </p>
              <p className="text-lg leading-relaxed text-stone">
                Please read this policy carefully before making a purchase. By purchasing credits, you agree to the terms outlined below.
              </p>
            </div>

            {/* Credit Refund Eligibility */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Credit Refund Eligibility</h2>

              <div className="bg-pearl p-6 rounded-lg mb-6">
                <h3 className="font-medium text-xl mb-3 text-sage">Eligible for Refund</h3>
                <ul className="list-disc pl-6 space-y-2 text-stone">
                  <li><strong>Unused credits</strong> within 30 days of purchase</li>
                  <li><strong>Technical issues</strong> that prevented credit usage due to platform errors</li>
                  <li><strong>Duplicate charges</strong> resulting from payment processing errors</li>
                  <li><strong>Unauthorized transactions</strong> on your account (subject to verification)</li>
                </ul>
              </div>

              <div className="bg-pearl p-6 rounded-lg">
                <h3 className="font-medium text-xl mb-3 text-terracotta">Not Eligible for Refund</h3>
                <ul className="list-disc pl-6 space-y-2 text-stone">
                  <li><strong>Used credits</strong> that have been applied to assessments</li>
                  <li><strong>Partially used credit packs</strong> (only unused credits may be refunded)</li>
                  <li><strong>Credits purchased more than 30 days ago</strong></li>
                  <li><strong>Dissatisfaction with assessment results</strong> (results are based on self-reported data)</li>
                  <li><strong>Change of mind</strong> after the 30-day refund window</li>
                </ul>
              </div>
            </div>

            {/* Refund Amounts */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Refund Amounts</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                Refund amounts are calculated as follows:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-pearl rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-ink text-pearl">
                      <th className="text-left p-4 font-medium">Scenario</th>
                      <th className="text-left p-4 font-medium">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone">
                    <tr className="border-b border-sand">
                      <td className="p-4">Full unused credit pack (within 30 days)</td>
                      <td className="p-4">100% of purchase price</td>
                    </tr>
                    <tr className="border-b border-sand">
                      <td className="p-4">Partial unused credits (within 30 days)</td>
                      <td className="p-4">Pro-rated based on unused credits</td>
                    </tr>
                    <tr className="border-b border-sand">
                      <td className="p-4">Technical issues (any time)</td>
                      <td className="p-4">Credits restored or full refund</td>
                    </tr>
                    <tr>
                      <td className="p-4">Duplicate charges</td>
                      <td className="p-4">Full refund of duplicate amount</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-lg leading-relaxed text-stone mt-4">
                Note: Payment processing fees may be deducted from refunds in some cases.
              </p>
            </div>

            {/* How to Request */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">How to Request a Refund</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                To request a refund, please follow these steps:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 bg-pearl p-6 rounded-lg">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold text-ink rounded-full flex items-center justify-center font-medium">1</span>
                  <div>
                    <h4 className="font-medium mb-1">Contact Us</h4>
                    <p className="text-stone">Email us at <a href="mailto:contact@cirf-framework.org" className="text-ocean hover:underline">contact@cirf-framework.org</a> with the subject line &quot;Refund Request&quot;</p>
                  </div>
                </div>

                <div className="flex gap-4 bg-pearl p-6 rounded-lg">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold text-ink rounded-full flex items-center justify-center font-medium">2</span>
                  <div>
                    <h4 className="font-medium mb-1">Provide Required Information</h4>
                    <p className="text-stone">Include: your account email, transaction ID, purchase date, number of credits purchased, reason for refund</p>
                  </div>
                </div>

                <div className="flex gap-4 bg-pearl p-6 rounded-lg">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold text-ink rounded-full flex items-center justify-center font-medium">3</span>
                  <div>
                    <h4 className="font-medium mb-1">Review Process</h4>
                    <p className="text-stone">We will review your request and respond within 3-5 business days</p>
                  </div>
                </div>

                <div className="flex gap-4 bg-pearl p-6 rounded-lg">
                  <span className="flex-shrink-0 w-8 h-8 bg-gold text-ink rounded-full flex items-center justify-center font-medium">4</span>
                  <div>
                    <h4 className="font-medium mb-1">Refund Processing</h4>
                    <p className="text-stone">Approved refunds will be processed within 5-10 business days to your original payment method</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Time */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Refund Processing Time</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                Once approved, refunds are processed as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li><strong>Credit/Debit Cards:</strong> 5-10 business days (may vary by bank)</li>
                <li><strong>UPI:</strong> 3-5 business days</li>
                <li><strong>Net Banking:</strong> 5-7 business days</li>
                <li><strong>Wallets:</strong> 1-3 business days</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone mt-4">
                Refunds are processed through Razorpay and will appear on your statement as a credit from the original merchant.
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Cancellation Policy</h2>

              <h3 className="font-medium text-xl mb-3 mt-6">Order Cancellation</h3>
              <p className="text-lg leading-relaxed text-stone mb-4">
                Since credits are delivered instantly upon successful payment, orders cannot be cancelled once the transaction is complete. If you wish to request a refund, please follow the refund process outlined above.
              </p>

              <h3 className="font-medium text-xl mb-3 mt-6">Account Cancellation</h3>
              <p className="text-lg leading-relaxed text-stone mb-4">
                You may cancel your account at any time by contacting us. Upon account cancellation:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li>Unused credits within the 30-day refund window may be refunded upon request</li>
                <li>Unused credits beyond the 30-day window will be forfeited</li>
                <li>Your assessment data will be deleted according to our <Link href="/privacy" className="text-ocean hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Dispute Resolution</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                If you are not satisfied with the resolution of your refund request:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-stone">
                <li>Contact us again with additional information or clarification</li>
                <li>If unresolved, you may escalate to our management team</li>
                <li>As a last resort, disputes may be handled through your payment provider or applicable consumer protection channels</li>
              </ol>
              <p className="text-lg leading-relaxed text-stone mt-4">
                We are committed to resolving all disputes fairly and promptly.
              </p>
            </div>

            {/* Exceptions */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Exceptions</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                We may make exceptions to this policy in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone">
                <li>Documented medical emergencies</li>
                <li>Significant platform outages affecting service delivery</li>
                <li>Errors on our part in pricing or service description</li>
                <li>Legal requirements in your jurisdiction</li>
              </ul>
              <p className="text-lg leading-relaxed text-stone mt-4">
                Exceptions are granted at our sole discretion on a case-by-case basis.
              </p>
            </div>

            {/* Changes */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Changes to This Policy</h2>
              <p className="text-lg leading-relaxed text-stone">
                We reserve the right to modify this refund and cancellation policy at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">Contact Us</h2>
              <p className="text-lg leading-relaxed text-stone mb-4">
                For refund requests or questions about this policy, please contact us:
              </p>
              <div className="bg-pearl p-6 rounded-lg">
                <p className="text-stone">
                  <strong>Email:</strong> <a href="mailto:contact@cirf-framework.org" className="text-ocean hover:underline">contact@cirf-framework.org</a><br />
                  <strong>Subject Line:</strong> Refund Request<br />
                  <strong>Response Time:</strong> 3-5 business days<br /><br />
                  <Link href="/about#contact" className="text-ocean hover:underline">Contact Form →</Link>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
