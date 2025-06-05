"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-neon/20 py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neon hover:text-neon/80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-neon glitch-text">Peyaji</span>
          </Link>
        </div>
      </header>

      <main className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="h-8 w-8 text-neon" />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>

          <div className="prose prose-invert max-w-none prose-headings:text-neon prose-a:text-neon">
            <p className="text-muted-foreground text-sm mb-8">Last Updated: June 5, 2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p>
                  At Peyaji, we respect your privacy and are committed to protecting your personal data. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when you use our
                  website, services, applications, products, and content (collectively, the "Services").
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                  please do not access the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p>We may collect several types of information from and about users of our Services, including:</p>

                <h3 className="text-xl font-bold mt-6 mb-3">2.1 Personal Data</h3>
                <p>
                  Personal Data refers to information that can be used to identify you individually. This may include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email address (when you join our waitlist or subscribe to our newsletter)</li>
                  <li>Wallet addresses (when you connect your wallet to our platform)</li>
                  <li>
                    Transaction data (information about transactions you make using $PEY tokens, including date, time,
                    amount, and public blockchain addresses)
                  </li>
                  <li>
                    Usage data (information about how you use our Services, including your browsing actions and
                    patterns)
                  </li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">2.2 Non-Personal Data</h3>
                <p>We also collect non-personal data that does not directly identify you. This may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Access times and dates</li>
                  <li>Referring website addresses</li>
                  <li>Other technical information about your device and internet connection</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. How We Collect Information</h2>
                <p>We collect information from you when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Register on our website or join our waitlist</li>
                  <li>Connect your wallet to our platform</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in community discussions or forums</li>
                  <li>Use the Daily Peyper or other content features</li>
                  <li>Interact with our website through cookies and similar technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. How We Use Your Information</h2>
                <p>We may use the information we collect from you for various purposes, including to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our Services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative information, such as updates, security alerts, and support messages</li>
                  <li>
                    Respond to your comments, questions, and requests, and provide customer service and technical
                    support
                  </li>
                  <li>
                    Communicate with you about products, services, offers, promotions, and events, and provide other
                    news or information about Peyaji and our partners
                  </li>
                  <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                  <li>Personalize and improve your experience on our Services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Blockchain Data</h2>
                <p>
                  Please note that blockchain technology, by its nature, is transparent and public. When you interact
                  with the Peyaji ecosystem through blockchain transactions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your public wallet address and transaction data will be publicly visible on the blockchain</li>
                  <li>
                    We have no control over this data once it is recorded on the blockchain, and it cannot be modified
                    or deleted
                  </li>
                  <li>
                    While your wallet address does not directly identify you, it may be possible for third parties to
                    associate your wallet address with your identity through other means
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Cookies and Similar Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Services and hold certain
                  information. Cookies are files with a small amount of data that may include an anonymous unique
                  identifier.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  However, if you do not accept cookies, you may not be able to use some portions of our Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
                <p>
                  We have implemented appropriate technical and organizational security measures designed to protect the
                  security of any personal information we process. However, please note that no method of transmission
                  over the Internet or method of electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Your Data Protection Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, such as:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The right to access, update, or delete your personal information</li>
                  <li>The right to rectification (to correct inaccurate data)</li>
                  <li>The right to object to our processing of your personal data</li>
                  <li>The right to request restriction of processing of your personal data</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{" "}
                  <a href="mailto:privacy@peyaji.com" className="text-neon hover:underline">
                    privacy@peyaji.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
                <p>
                  Our Services are not intended for use by children under the age of 18. We do not knowingly collect
                  personal information from children under 18. If you are a parent or guardian and you are aware that
                  your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy
                  Policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                  Policy are effective when they are posted on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@peyaji.com" className="text-neon hover:underline">
                    privacy@peyaji.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/">
              <Button variant="outline" className="border-neon text-neon hover:bg-neon hover:text-background">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neon/20 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              Built by mirchi, memes, and degens. <span className="text-neon">#PoweredByPAY</span>
            </p>

            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-neon">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-neon">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-neon">
                Docs
              </Link>
              <div
                className="w-2 h-2 bg-neon rounded-full cursor-pointer easter-egg"
                onClick={() => alert("You found the alpha leak: $PEY to $100 confirmed")}
              ></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
