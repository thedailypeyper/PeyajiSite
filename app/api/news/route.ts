import { NextResponse } from "next/server"
import { parseArticlesFromHTML } from "@/utils/html-parser"

// This function fetches news from thedailypeyper.com
export async function GET() {
  try {
    console.log("Fetching news from thedailypeyper.com...")

    // Fetch the HTML content from thedailypeyper.com
    const response = await fetch("https://thedailypeyper.com", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
      cache: "no-store", // Always fetch fresh content
    })

    if (!response.ok) {
      console.error(`Failed to fetch: ${response.status} ${response.statusText}`)
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()
    console.log("Successfully fetched HTML, parsing articles...")

    // Extract articles from the HTML using our parser
    const articles = parseArticlesFromHTML(html)
    console.log(`Parsed ${articles.length} articles`)

    // If no articles were found, return a helpful error
    if (articles.length === 0) {
      console.warn("No articles found during parsing")
      return NextResponse.json(
        {
          error: "No articles found. The website structure may have changed.",
          articles: [],
        },
        { status: 200 },
      )
    }

    return NextResponse.json({
      articles,
      lastUpdated: new Date().toISOString(),
      source: "thedailypeyper.com",
    })
  } catch (error) {
    console.error("Error fetching news:", error)

    // Return the latest articles we know about from the screenshot as a fallback
    const fallbackArticles = [
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

    return NextResponse.json({
      error: "Error fetching from thedailypeyper.com. Using fallback data.",
      articles: fallbackArticles,
      lastUpdated: new Date().toISOString(),
      source: "fallback",
    })
  }
}
