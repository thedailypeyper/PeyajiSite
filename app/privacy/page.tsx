"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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
            <span className="font-bold text-2xl text-neon glitch-text">PEYAJI</span>
          </Link>
        </div>
      </header>

      <main className="py-24">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
            Privacy <span className="text-neon">Policy</span>
          </h1>

          <div className="prose prose-invert max-w-none">
            <div className="border border-neon/20 rounded-lg p-8 bg-background/20 backdrop-blur-sm space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you provide directly to us, such as:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Email addresses for waitlist and newsletter subscriptions</li>
                  <li>Wallet addresses for token interactions</li>
                  <li>Content you create or share on our platform</li>
                  <li>Communication preferences and settings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">2. Blockchain Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Please note that blockchain transactions are public and permanent. Any interactions with $PEY tokens
                  or smart contracts will be recorded on the blockchain and may be publicly viewable. We cannot control
                  or delete this information once it's recorded on the blockchain.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Send you updates about $PEY and our ecosystem</li>
                  <li>Process token transactions and rewards</li>
                  <li>Communicate with you about our platform</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">4. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and
                  improve our services. You can control cookie settings through your browser, but some features may not
                  function properly if cookies are disabled.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal information. However, no method of
                  transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data (where legally possible)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request information about how we use your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">7. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for children under 18. We do not knowingly collect personal information
                  from children under 18. If you believe we have collected such information, please contact us
                  immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">8. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us through our official channels
                  or visit our documentation at{" "}
                  <Link href="https://peyaji.gitbook.io/peyaji/" className="text-neon hover:text-neon/80">
                    peyaji.gitbook.io
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neon/20 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              Built by mirchi, memes, and degens. <span className="text-neon">#PoweredByPEY</span>
            </p>

            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-neon">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-neon">
                Privacy
              </Link>
              <Link
                href="https://peyaji.gitbook.io/peyaji/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-neon"
              >
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
