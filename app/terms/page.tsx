"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"

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
            <span className="font-bold text-2xl text-neon glitch-text">Peyaji</span>
          </Link>
        </div>
      </header>

      <main className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-neon" />
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>

          <div className="prose prose-invert max-w-none prose-headings:text-neon prose-a:text-neon">
            <p className="text-muted-foreground text-sm mb-8">Last Updated: June 5, 2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p>
                  Welcome to Peyaji ("we," "our," or "us"). By accessing or using our website, services, applications,
                  products, and content (collectively, the "Services"), you agree to be bound by these Terms of Service
                  ("Terms"). These Terms affect your legal rights and obligations, so if you do not agree to these
                  Terms, do not use the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Basic Terms</h2>
                <p>
                  You must be at least 18 years old to use the Services. By using the Services, you represent and
                  warrant that you have the full right, power, and authority to enter into these Terms and to fully
                  perform all of your obligations hereunder.
                </p>
                <p>
                  You are responsible for any activity that occurs through your account. You agree that you will not
                  sell, transfer, license, or assign your account, followers, username, or any account rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. $PEY Token</h2>
                <p>
                  The $PEY token is a digital asset that may be used within the Peyaji ecosystem. By acquiring $PEY
                  tokens, you acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    $PEY tokens are not intended to constitute securities, commodities, or any other kind of financial
                    instrument;
                  </li>
                  <li>
                    The value of $PEY tokens may fluctuate, and there is no guarantee that the value will increase;
                  </li>
                  <li>
                    You are solely responsible for determining what, if any, taxes apply to your transactions involving
                    $PEY tokens;
                  </li>
                  <li>
                    We are not responsible for any loss of $PEY tokens due to user error, forgotten passwords, or any
                    other reason.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Content Guidelines</h2>
                <p>
                  You are responsible for all content that you submit, post, or display on or through the Services. You
                  agree that you will not post content that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, or invasive of privacy;</li>
                  <li>Infringes upon or violates the intellectual property rights of others;</li>
                  <li>Contains software viruses or any other malicious code;</li>
                  <li>
                    Constitutes unauthorized or unsolicited advertising, junk or bulk email ("spamming"), chain letters,
                    or any other form of unauthorized solicitation;
                  </li>
                  <li>
                    Contains or promotes sexually explicit material, violence, or discrimination based on race, sex,
                    religion, nationality, disability, sexual orientation, or age.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Intellectual Property Rights</h2>
                <p>
                  The Services and its original content, features, and functionality are owned by Peyaji and are
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property
                  or proprietary rights laws.
                </p>
                <p>
                  You retain your rights to any content you submit, post, or display on or through the Services. By
                  submitting, posting, or displaying content on or through the Services, you grant us a worldwide,
                  non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create
                  derivative works from, distribute, perform, and display such content in connection with providing the
                  Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Disclaimers and Limitations of Liability</h2>
                <p className="font-bold">
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED.
                </p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PEYAJI, ITS AFFILIATES, AGENTS,
                  DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF
                  PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR
                  INABILITY TO USE, THE SERVICES.
                </p>
                <p>
                  SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF
                  LIABILITY FOR CERTAIN TYPES OF DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS IN THIS SECTION MAY
                  NOT APPLY TO YOU.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which
                  Peyaji is established, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                  revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                  What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at{" "}
                  <a href="mailto:legal@peyaji.com" className="text-neon hover:underline">
                    legal@peyaji.com
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
