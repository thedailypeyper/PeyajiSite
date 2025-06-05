"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, RefreshCw, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface WaitlistEntry {
  email: string
  timestamp: string
  referrer?: string
}

export default function WaitlistAdmin() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchWaitlist = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/waitlist")
      if (!response.ok) {
        throw new Error("Failed to fetch waitlist data")
      }
      const data = await response.json()
      setWaitlist(data.emails || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching waitlist:", err)
      setError("Failed to load waitlist data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWaitlist()
  }, [])

  const downloadCSV = () => {
    // Create CSV content
    const headers = ["Email", "Timestamp", "Referrer"]
    const csvContent = [
      headers.join(","),
      ...waitlist.map((entry) => `${entry.email},${entry.timestamp},${entry.referrer || "direct"}`),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `peyaji-waitlist-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredWaitlist = waitlist.filter((entry) => entry.email.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-neon/20 py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neon hover:text-neon/80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="font-bold text-2xl text-neon">Waitlist Admin</div>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Waitlist Submissions</h1>
          <div className="flex gap-2">
            <Button onClick={fetchWaitlist} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={downloadCSV} className="bg-neon hover:bg-neon/80 text-background flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-neon/20 focus:border-neon bg-background/50"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neon"></div>
            <span className="ml-2 text-muted-foreground">Loading waitlist data...</span>
          </div>
        ) : error ? (
          <div className="p-6 text-center border border-red-500/20 rounded-lg bg-red-500/5">
            <p className="text-red-500">{error}</p>
            <Button onClick={fetchWaitlist} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="border border-neon/20 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neon/10">
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Referrer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neon/10">
                    {filteredWaitlist.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-center text-muted-foreground">
                          {searchTerm ? "No matching emails found" : "No waitlist submissions yet"}
                        </td>
                      </tr>
                    ) : (
                      filteredWaitlist.map((entry, i) => (
                        <tr key={i} className="hover:bg-neon/5">
                          <td className="px-6 py-4 whitespace-nowrap">{entry.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                            {entry.referrer || "direct"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Total submissions: <span className="font-medium text-neon">{waitlist.length}</span>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
