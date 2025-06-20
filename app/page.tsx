"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Twitter,
  MessageSquare,
  ExternalLink,
  Send,
  Zap,
  Scroll,
  BookOpen,
  Gamepad2,
  Award,
  Vote,
  Lock,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import ParticleBackground from "@/components/particle-background"
import NewsFeed from "@/components/news-feed"

export default function Home() {
  const handleJoinWaitlist = () => {
    window.open("https://app.youform.com/forms/uo2zni61", "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-neon/20 backdrop-blur-md bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-neon glitch-text">PEYAJI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#what" className="text-sm hover:text-neon transition-colors">
              What is Peyaji?
            </Link>
            <Link href="#token" className="text-sm hover:text-neon transition-colors">
              $PEY Token
            </Link>
            <Link href="/tokenomics" className="text-sm hover:text-neon transition-colors">
              Tokenomics
            </Link>
            <Link href="#peyper" className="text-sm hover:text-neon transition-colors">
              Daily Peyper
            </Link>
            <Link href="#earn" className="text-sm hover:text-neon transition-colors">
              Earn
            </Link>
            <Link href="#roadmap" className="text-sm hover:text-neon transition-colors">
              Roadmap
            </Link>
          </nav>
          <Button onClick={handleJoinWaitlist} className="bg-neon hover:bg-neon/80 text-background font-medium">
            Join Waitlist
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden" id="hero">
          <div className="absolute inset-0 z-0">
            <div className="hero-gradient"></div>
            <ParticleBackground />
            <div className="hero-noise"></div>
            <div className="hero-grid"></div>

            {/* Vertical lines */}
            <div className="vertical-lines">
              <div className="vertical-line" style={{ left: "45%", height: "30%", animationDelay: "0s" }}></div>
              <div className="vertical-line" style={{ left: "48%", height: "40%", animationDelay: "0.2s" }}></div>
              <div className="vertical-line" style={{ left: "52%", height: "35%", animationDelay: "0.4s" }}></div>
              <div className="vertical-line" style={{ left: "55%", height: "25%", animationDelay: "0.6s" }}></div>
            </div>
          </div>

          <div className="container relative z-10 flex flex-col items-center text-center gap-8 py-20">
            <div className="glow-pill">
              <div className="inline-block px-6 py-2 rounded-full border border-neon text-neon text-sm font-medium">
                The Incentive Layer on Web3
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight neon-heading">
                Where Every <span className="text-neon glow-text">Click Pays</span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Memes, news, games, and social - all powered by blockchain incentives.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="https://peyaji.gitbook.io/peyaji/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-neon text-neon hover:bg-neon hover:text-background px-8 py-3"
                >
                  Discover More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* What is Peyaji? */}
        <section className="py-24 relative" id="what">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="text-neon">What is</span> Peyaji?
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="p-8 border border-neon/20 rounded-lg bg-background/20 backdrop-blur-sm">
                <div className="space-y-6 text-lg leading-relaxed">
                  <p>
                    Peyaji is the engine behind a new kind of internet - one where memes matter, articles pay, and
                    content isn't just consumed, it's rewarded.
                  </p>
                  <p>
                    We're turning passive attention into active value, using the PEY token to power a network of apps
                    that actually give back.
                  </p>
                  <p>No corporate media. No pointless engagement.</p>
                  <p>Just real people, earning real tokens, for doing what they already love.</p>
                  <div className="mt-8 p-4 border-l-4 border-neon bg-neon/5 rounded-r-lg">
                    <p className="text-xl font-medium italic text-neon">
                      It's a chaotic cult built by degens - for the rest of the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* $PEY Token Utility */}
        <section className="py-24 relative" id="token">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="text-neon">$PEY</span> Token Utility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: <DollarSign className="h-10 w-10" />,
                  title: "Earn from your Attention",
                  description: "Read the news, scroll reels, or play games — get rewarded just for showing up.",
                },
                {
                  icon: <Lock className="h-10 w-10" />,
                  title: "Stake to Level Up",
                  description: "Lock in your tokens to unlock bonus rewards and future perks across the ecosystem.",
                },
                {
                  icon: <Vote className="h-10 w-10" />,
                  title: "Power the Ecosystem",
                  description: "Every scroll, tap, and play helps fuel rewards and platform incentives.",
                },
                {
                  icon: <MessageSquare className="h-10 w-10" />,
                  title: "Support your Favorite Creators",
                  description:
                    "Tip writers, memers, and video creators directly - because good content deserves more than likes.",
                },
                {
                  icon: <Award className="h-10 w-10" />,
                  title: "Spend in the Real World",
                  description: "From Amazon to Domino's to flights and hotels - and eventually, even UPI payments.😉",
                },
                {
                  icon: <Zap className="h-10 w-10" />,
                  title: "Collect surprise Drops",
                  description: "Get random rewards, seasonal bonuses, or limited-time loot just for being active.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm hover:border-neon transition-all group"
                >
                  <div className="text-neon mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/tokenomics">
                <Button variant="outline" className="border-neon text-neon hover:bg-neon hover:text-background">
                  View Full Tokenomics
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The Daily Peyper */}
        <section className="py-24 relative" id="peyper">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              The <span className="text-neon">Daily Peyper</span>
            </h2>
           
            <div className="mt-12 text-center">
              <Link href="https://thedailypeyper.com/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-neon hover:bg-neon/80 text-background">Explore</Button>
              </Link>
              <p className="mt-4 text-muted-foreground">
                Community-run news, spicy takes, on-chain drama coverage, and Degen Digest.
              </p>
            </div>
          </div>
        </section>

        {/* Earn Features */}
        <section className="py-24 relative" id="earn">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="text-neon">Earn</span> Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: <Scroll className="h-12 w-12" />,
                  title: "Scroll-to-Earn",
                  description:
                    "Earn just by doing what you already do - swipe through reels, memes, or posts and watch your wallet stack up.",
                },
                {
                  icon: <Gamepad2 className="h-12 w-12" />,
                  title: "Play-to-Earn",
                  description: "The kind of games you play on the toilet - but this time, it actually leads somewhere.",
                },
                {
                  icon: <BookOpen className="h-12 w-12" />,
                  title: "Read-to-Earn",
                  description:
                    "Dig into spicy takes, news bites, or blogs on The Daily Peyper and get rewarded for staying informed.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-neon rounded-lg p-6 bg-background/20 backdrop-blur-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 bg-neon text-background px-3 py-1 text-xs font-bold">
                    COMING SOON
                  </div>

                  <div className="text-neon mb-6 mt-4 flex justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-center">{item.title}</h3>
                  <p className="text-muted-foreground text-center">{item.description}</p>

                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-20"></div>
                  <div className="absolute inset-0 border border-neon opacity-0 group-hover:opacity-100 transition-opacity rounded-lg glow-box"></div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button onClick={handleJoinWaitlist} className="bg-neon hover:bg-neon/80 text-background">
                Join Early. Be the First to Earn.
              </Button>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-24 relative" id="roadmap">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="text-neon">Road</span>map
            </h2>

            <div className="max-w-5xl mx-auto relative">
              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neon/30"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    quarter: "Q1",
                    items: [
                      "Private fundraising + community build",
                      "First PEY token tests",
                      "Telegram cult initiation",
                    ],
                  },
                  {
                    quarter: "Q2",
                    items: ["Launch Daily Peyper", "Distribute early contributor PEY", "Stealth partner drops"],
                  },
                  {
                    quarter: "Q3",
                    items: [
                      "Rollout Scroll-to-Earn & Read-to-Earn beta",
                      "Mini-games for Play-to-Earn",
                      "Meme bounty system",
                    ],
                  },
                  {
                    quarter: "Q4",
                    items: ["Staking + DAO proposals", "NFTs for contributors", "Global memelord leaderboard"],
                  },
                ].map((item, i) => (
                  <div key={i} className="relative pt-8">
                    {/* Circle marker */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-neon flex items-center justify-center z-10">
                      <div className="w-3 h-3 rounded-full bg-neon"></div>
                    </div>

                    <div
                      className={cn(
                        "border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm mt-6",
                        "hover:border-neon transition-all group",
                      )}
                    >
                      <h3 className="text-xl font-bold mb-4 text-neon text-center">{item.quarter}</h3>
                      <ul className="space-y-2">
                        {item.items.map((text, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-neon mt-1">•</span>
                            <span>{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="py-24 relative" id="community">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="text-neon">Comm</span>unity
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Twitter className="h-6 w-6" />, label: "Twitter/X", href: "https://x.com/peyajixyz" },
                { icon: <ExternalLink className="h-6 w-6" />, label: "Farcaster", href: "#", soon: true },
                { icon: <ExternalLink className="h-6 w-6" />, label: "Mirror", href: "#", soon: true },
                { icon: <ExternalLink className="h-6 w-6" />, label: "Guild.xyz", href: "#", soon: true },
                { icon: <Send className="h-6 w-6" />, label: "Telegram", href: "https://t.me/thedailypeyper" },
                { icon: <MessageSquare className="h-6 w-6" />, label: "Discord", href: "#", soon: true },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cn(
                    "border border-neon/20 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-center",
                    "hover:border-neon hover:bg-neon/5 transition-all group h-32",
                    item.soon && "opacity-70",
                  )}
                >
                  <div className="text-neon group-hover:scale-125 transition-transform">{item.icon}</div>
                  <span className="font-medium">{item.label}</span>
                  {item.soon && <span className="text-xs text-neon">Coming Soon</span>}
                </Link>
              ))}
            </div>

            <div className="mt-16 max-w-5xl mx-auto overflow-hidden">
              <div className="meme-wall">
                {/* This would be populated with actual meme images */}
                <div className="flex animate-scroll">
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-48 h-48 flex-shrink-0 mx-2 bg-neon/5 border border-neon/20 rounded-lg flex items-center justify-center"
                      >
                        <span className="text-neon text-4xl font-bold">MEME</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
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
