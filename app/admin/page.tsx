"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Mail, Users, Calendar, RefreshCw, Database, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WaitlistEntry {
  id: string
  email: string
  timestamp: string
  source?: string
  ipAddress?: string
}

interface WaitlistStats {
  total: number
  last24Hours: number
  last7Days: number
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [emails, setEmails] = useState<WaitlistEntry[]>([])
  const [stats, setStats] = useState<WaitlistStats>({ total: 0, last24Hours: 0, last7Days: 0 })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [dbStatus, setDbStatus] = useState<"unknown" | "connected" | "failed">("unknown")

  // Test database connection
  const testDatabase = async () => {
    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()
      setDbStatus(data.success ? "connected" : "failed")
      if (!data.success) {
        setError(`Database connection failed: ${data.message}`)
      }
    } catch (err) {
      setDbStatus("failed")
      setError("Failed to test database connection")
    }
  }

  useEffect(() => {
    testDatabase()
  }, [])

  // Simple password check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "peyaji-admin-2025") {
      setIsAuthenticated(true)
      loadEmails()
    } else {
      setError("Invalid password")
    }
  }

  const loadEmails = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/waitlist?admin=peyaji-admin-2025")
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || "Failed to fetch emails")
      }

      const data = await response.json()
      setEmails(data.emails || [])
      setStats(data.stats || { total: 0, last24Hours: 0, last7Days: 0 })
      setError("")
      setDbStatus("connected")
    } catch (err) {
      console.error("Error loading emails:", err)
      setError(`Failed to load emails: ${err instanceof Error ? err.message : "Unknown error"}`)
      setDbStatus("failed")
    } finally {
      setLoading(false)
    }
  }

  const exportEmails = () => {
    const csvContent = [
      "Email,Date,Time,Source,IP Address",
      ...emails.map((entry) => {
        const date = new Date(entry.timestamp)
        return `${entry.email},${date.toLocaleDateString()},${date.toLocaleTimeString()},${entry.source || "website"},${entry.ipAddress || "unknown"}`
      }),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `peyaji-waitlist-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <div className="border border-neon/20 rounded-lg p-8 bg-background/20 backdrop-blur-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">
              <span className="text-neon">PEYAJI</span> Admin
            </h1>

            {/* Database Status */}
            <div className="mb-6 p-3 rounded-lg border border-neon/20 bg-background/10">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Database Status:</span>
                {dbStatus === "connected" && (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 text-sm">Connected</span>
                  </>
                )}
                {dbStatus === "failed" && (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-red-500 text-sm">Failed</span>
                  </>
                )}
                {dbStatus === "unknown" && (
                  <>
                    <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
                    <span className="text-yellow-500 text-sm">Testing...</span>
                  </>
                )}
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Admin Password
                </label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-neon/20 focus:border-neon"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-neon hover:bg-neon/80 text-background"
                disabled={dbStatus === "failed"}
              >
                Login
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-neon">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-neon/20 py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neon hover:text-neon/80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold">
            <span className="text-neon">PEYAJI</span> Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {dbStatus === "connected" && <CheckCircle className="h-4 w-4 text-green-500" />}
              {dbStatus === "failed" && <XCircle className="h-4 w-4 text-red-500" />}
              <span className="text-sm text-muted-foreground">MongoDB</span>
            </div>
            <Button
              onClick={() => {
                setIsAuthenticated(false)
                setPassword("")
              }}
              variant="outline"
              className="border-neon/20 text-muted-foreground hover:text-neon"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="container max-w-6xl">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-neon" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-muted-foreground">Total Signups</p>
                </div>
              </div>
            </div>

            <div className="border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-neon" />
                <div>
                  <p className="text-2xl font-bold">{stats.last24Hours}</p>
                  <p className="text-muted-foreground">Last 24 Hours</p>
                </div>
              </div>
            </div>

            <div className="border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-8 w-8 text-neon" />
                <div>
                  <p className="text-2xl font-bold">{stats.last7Days}</p>
                  <p className="text-muted-foreground">Last 7 Days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              onClick={exportEmails}
              className="bg-neon hover:bg-neon/80 text-background"
              disabled={emails.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={loadEmails}
              variant="outline"
              className="border-neon text-neon hover:bg-neon/10"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Loading..." : "Refresh Data"}
            </Button>
            <Button
              onClick={testDatabase}
              variant="outline"
              className="border-neon/20 text-muted-foreground hover:text-neon"
            >
              <Database className="h-4 w-4 mr-2" />
              Test DB Connection
            </Button>
          </div>

          {error && (
            <div className="mb-6 p-4 border border-red-500/20 rounded-lg bg-red-500/5">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Email List */}
          <div className="border border-neon/20 rounded-lg bg-background/20 backdrop-blur-sm">
            <div className="p-6 border-b border-neon/20">
              <h2 className="text-xl font-bold">Waitlist Emails ({stats.total})</h2>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 text-neon animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Loading emails from MongoDB...</p>
                </div>
              ) : emails.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No emails collected yet.</p>
              ) : (
                <div className="space-y-4">
                  {emails.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 border border-neon/10 rounded-lg bg-background/10"
                    >
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-neon" />
                        <div>
                          <span className="font-medium">{entry.email}</span>
                          <div className="flex gap-2 mt-1">
                            {entry.source && (
                              <span className="text-xs px-2 py-1 rounded-full bg-neon/10 text-neon">
                                {entry.source}
                              </span>
                            )}
                            {entry.ipAddress && entry.ipAddress !== "unknown" && (
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                                {entry.ipAddress}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground text-right">
                        <div>{new Date(entry.timestamp).toLocaleDateString()}</div>
                        <div>{new Date(entry.timestamp).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
