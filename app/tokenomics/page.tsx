"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TokenomicsPage() {
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

      <main className="py-24">
        <div className="container">
          {/* Coming Soon Section */}
          <div className="text-center min-h-[60vh] flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-neon">$PEY</span> Tokenomics
            </h1>
            <div className="max-w-2xl mx-auto">
              <div className="border border-neon/20 rounded-lg p-12 bg-background/20 backdrop-blur-sm">
                <div className="text-6xl mb-6">🚧</div>
                <h2 className="text-3xl font-bold mb-4 text-neon">Coming Soon</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  We're putting the finishing touches on our tokenomics. Check back soon for all the details on how $PEY
                  will power the ecosystem.
                </p>
                <Link href="/">
                  <Button className="bg-neon hover:bg-neon/80 text-background px-8 py-3">Back to Home</Button>
                </Link>
              </div>
            </div>
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

      {/* 
      COMMENTED OUT - ORIGINAL TOKENOMICS CONTENT
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-neon">$PEY</span> Tokenomics
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A deflationary token designed to power the incentive layer of Web3 content creation and community
          engagement.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Token <span className="text-neon">Distribution</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="h-8 w-8" />,
              title: "Community",
              percentage: "40%",
              description: "Distributed to early adopters, content creators, and community members",
              color: "text-neon",
            },
            {
              icon: <Lock className="h-8 w-8" />,
              title: "Team & Advisors",
              percentage: "20%",
              description: "Locked for 2 years with 6-month cliff, vesting over 4 years",
              color: "text-blue-400",
            },
            {
              icon: <TrendingUp className="h-8 w-8" />,
              title: "Ecosystem Growth",
              percentage: "25%",
              description: "Marketing, partnerships, and ecosystem development",
              color: "text-purple-400",
            },
            {
              icon: <Shield className="h-8 w-8" />,
              title: "Treasury",
              percentage: "15%",
              description: "Protocol treasury for governance and future development",
              color: "text-orange-400",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm hover:border-neon transition-all"
            >
              <div className={`${item.color} mb-4`}>{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <div className={`text-3xl font-bold mb-3 ${item.color}`}>{item.percentage}</div>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Token <span className="text-neon">Utility</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Content Monetization",
              description:
                "Tip writers, meme creators, and content producers directly with $PEY tokens. Creators earn based on engagement and quality.",
              features: ["Direct tipping", "Performance rewards", "Creator incentives"],
            },
            {
              title: "Governance Rights",
              description:
                "Vote on Daily Peyper headlines, ecosystem proposals, and protocol upgrades. Shape the future of the platform.",
              features: ["Headline voting", "Protocol governance", "Treasury decisions"],
            },
            {
              title: "Premium Access",
              description:
                "Unlock exclusive content, VIP Discord channels, and early access to new features and partnerships.",
              features: ["Gated content", "VIP communities", "Alpha access"],
            },
            {
              title: "Staking Rewards",
              description:
                "Stake $PEY tokens to earn passive income and additional governance power within the ecosystem.",
              features: ["Passive income", "Boosted voting power", "Exclusive rewards"],
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm hover:border-neon transition-all"
            >
              <h3 className="text-xl font-bold mb-3 text-neon">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon rounded-full"></span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Token <span className="text-neon">Mechanics</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <PieChart className="h-12 w-12" />,
                title: "Total Supply",
                value: "1,000,000,000",
                subtitle: "$PEY tokens",
                description: "Fixed supply with no inflation",
              },
              {
                icon: <Zap className="h-12 w-12" />,
                title: "Burn Mechanism",
                value: "2%",
                subtitle: "of transactions",
                description: "Deflationary pressure through burns",
              },
              {
                icon: <TrendingUp className="h-12 w-12" />,
                title: "Staking APY",
                value: "12-25%",
                subtitle: "estimated",
                description: "Variable based on staking participation",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm"
              >
                <div className="text-neon mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <div className="text-3xl font-bold text-neon mb-1">{item.value}</div>
                <div className="text-sm text-muted-foreground mb-3">{item.subtitle}</div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to <span className="text-neon">Join</span>?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          $PEY token launch is coming soon. Join our waitlist to be the first to participate in the token generation
          event.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-neon hover:bg-neon/80 text-background px-8 py-3">Join Waitlist</Button>
          </Link>
          <Link href="/#roadmap">
            <Button
              variant="outline"
              className="border-neon text-neon hover:bg-neon hover:text-background px-8 py-3"
            >
              View Roadmap
            </Button>
          </Link>
        </div>
      </section>
      
      END COMMENTED OUT CONTENT */}
    </div>
  )
}
