"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
            Terms of <span className="text-neon">Service</span>
          </h1>

          <div className="prose prose-invert max-w-none">
            <div className="border border-neon/20 rounded-lg p-8 bg-background/20 backdrop-blur-sm space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to PEYAJI ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our
                  website, platform, and services related to the $PEY token and ecosystem. By accessing or using our
                  services, you agree to be bound by these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">2. $PEY Token</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The $PEY token is a digital asset that powers our ecosystem. By participating in our platform:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You understand that token values may fluctuate</li>
                  <li>You acknowledge the experimental nature of blockchain technology</li>
                  <li>You accept responsibility for your own investment decisions</li>
                  <li>You understand that tokens may have no monetary value</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">3. Content Guidelines</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">When using our platform, you agree to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Not post illegal, harmful, or offensive content</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not engage in spam or manipulation</li>
                  <li>Follow community guidelines and standards</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, trademarks, and intellectual property on our platform remain the property of their
                  respective owners. Users retain rights to their original content but grant us license to use, display,
                  and distribute such content on our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">5. Disclaimers and Limitations</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our services are provided "as is" without warranties. We are not liable for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Financial losses from token trading or holding</li>
                  <li>Technical issues or platform downtime</li>
                  <li>Third-party actions or content</li>
                  <li>Regulatory changes affecting token utility</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">6. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms are governed by applicable laws. We reserve the right to update these Terms at any time.
                  Continued use of our services constitutes acceptance of updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-neon mb-4">7. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms, please contact us through our official channels or visit our
                  documentation at{" "}
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
