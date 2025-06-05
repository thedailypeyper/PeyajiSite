"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Loader2, ExternalLink, RefreshCw } from "lucide-react"

interface Article {
  title: string
  time: string
  tags: string[]
  url: string
  excerpt?: string
  imageUrl?: string
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchNews = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true)
      } else {
        setLoading(true)
      }

      const response = await fetch("/api/news", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch news")
      }

      const data = await response.json()

      if (data.error) {
        console.warn("API warning:", data.error)
      }

      setArticles(data.articles)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error("Error fetching news:", err)
      setError("Failed to load news. Please try again later.")
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchNews()

    // Set up polling for real-time updates every 2 minutes
    const intervalId = setInterval(() => fetchNews(true), 120000)

    return () => clearInterval(intervalId)
  }, [])

  const handleRefresh = () => {
    fetchNews(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 text-neon animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading latest news from thedailypeyper.com...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => fetchNews()}
          className="mt-4 px-4 py-2 bg-neon/20 text-neon rounded-md hover:bg-neon/30 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 max-h-[600px] overflow-y-auto news-scroll">
      {articles.length === 0 ? (
        <p className="text-center text-muted-foreground">No news articles available at the moment.</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            {lastUpdated && (
              <div className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</div>
            )}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1 text-xs text-neon hover:text-neon/80 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {articles.map((article, i) => (
            <div key={i} className="mb-8 pb-8 border-b border-neon/10 last:border-0">
              <div className="flex flex-col md:flex-row gap-4">
                {article.imageUrl && (
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="relative h-32 w-full rounded-md overflow-hidden bg-neon/5">
                      <Image
                        src={article.imageUrl || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          // Hide image if it fails to load
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className={article.imageUrl ? "md:w-3/4" : "w-full"}>
                  <Link href={article.url} target="_blank" rel="noopener noreferrer" className="group">
                    <h4 className="text-xl font-bold mb-2 group-hover:text-neon flex items-start gap-2 leading-tight">
                      {article.title}
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                    </h4>
                  </Link>

                  {article.excerpt && (
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                      {article.excerpt.length > 200 ? `${article.excerpt.substring(0, 200)}...` : article.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {article.tags.map((tag, j) => (
                        <span key={j} className="text-xs px-2 py-1 rounded-full bg-neon/10 text-neon font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{article.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
