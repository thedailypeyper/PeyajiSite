import { type NextRequest, NextResponse } from "next/server"

interface Article {
  title: string
  time: string
  tags: string[]
  url: string
  excerpt?: string
  imageUrl?: string
}

export async function GET(request: NextRequest) {
  try {
    // For now, we'll use static data since we need to implement proper web scraping
    // In production, you'd implement RSS feed parsing or web scraping from thedailypeyper.com

    const staticArticles: Article[] = [
      {
        title: "Brazilian Fintech Méliuz Plans $26.4 Million Share Offering to Acquire More Bitcoin",
        time: "3 days ago",
        tags: ["NEWS"],
        url: "https://thedailypeyper.com/brazilian-fintech-meliuz-bitcoin-offering/",
        excerpt:
          "Méliuz (CASH3.SA), a publicly traded fintech company in Brazil, has announced plans to raise approximately 150 million reais (around $26.4 million) through a primary share offering to acquire more Bitcoin.",
      },
      {
        title: "TRON's Justin Sun Pledges Support for Trump's Vision to Make U.S. a Global Crypto Hub",
        time: "1 week ago",
        tags: ["NEWS"],
        url: "https://thedailypeyper.com/tron-justin-sun-trump-crypto-hub/",
        excerpt:
          "TRON founder Justin Sun has publicly committed to supporting President Donald Trump's initiative to establish the United States as the global center for blockchain technology and cryptocurrency innovation.",
      },
      {
        title: "Bitcoin Hits Record High of $111K Before Dipping, Bullish Structure Signals Push Toward $125K",
        time: "1 week ago",
        tags: ["BITCOIN"],
        url: "https://thedailypeyper.com/bitcoin-record-high-111k-125k/",
        excerpt:
          "Bitcoin (BTC) surged to a new all-time high of $111,000, marking a historic peak before retracing to a key support level of around $106K. Despite this pullback, technical analysis suggests a bullish structure remains intact.",
      },
    ]

    // Add timestamp for cache busting
    const response = {
      articles: staticArticles,
      lastUpdated: new Date().toISOString(),
      source: "thedailypeyper.com",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("News API error:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
