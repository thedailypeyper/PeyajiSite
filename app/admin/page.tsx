"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Mail, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WaitlistEntry {
  id: string
  email: string
  timestamp: Date
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [emails, setEmails] = useState<WaitlistEntry[]>([])
  const [error, setError] = useState("")

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

  const loadEmails = () => {
    // Load emails from localStorage
    const storedEmails = localStorage.getItem("peyaji-waitlist")
    if (storedEmails) {
      try {
        const parsed = JSON.parse(storedEmails)
        setEmails(parsed)
      } catch (err) {
        console.error("Error parsing stored emails:", err)
      }
    }
  }

  const exportEmails = () => {
    const csvContent = [
      "Email,Date,Time",
      ...emails.map((entry) => {
        const date = new Date(entry.timestamp)
        return `${entry.email},${date.toLocaleDateString()},${date.toLocaleTimeString()}`
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

  const clearEmails = () => {
    if (confirm("Are you sure you want to clear all emails? This cannot be undone.")) {
      localStorage.removeItem("peyaji-waitlist")
      setEmails([])
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <div className="border border-neon/20 rounded-lg p-8 bg-background/20 backdrop-blur-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">
              <span className="text-neon">PEYAJI</span> Admin
            </h1>

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

              <Button type="submit" className="w-full bg-neon hover:bg-neon/80 text-background">
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
      </header>

      <main className="py-8">
        <div className="container max-w-6xl">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-neon" />
                <div>
                  <p className="text-2xl font-bold">{emails.length}</p>
                  <p className="text-muted-foreground">Total Signups</p>
                </div>
              </div>
            </div>

            <div className="border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-neon" />
                <div>
                  <p className="text-2xl font-bold">
                    {emails.filter((e) => new Date(e.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
                  </p>
                  <p className="text-muted-foreground">Last 24 Hours</p>
                </div>
              </div>
            </div>

            <div className="border border-neon/20 rounded-lg p-6 bg-background/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-8 w-8 text-neon" />
                <div>
                  <p className="text-2xl font-bold">
                    {
                      emails.filter((e) => new Date(e.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                        .length
                    }
                  </p>
                  <p className="text-muted-foreground">Last 7 Days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button onClick={exportEmails} className="bg-neon hover:bg-neon/80 text-background">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={loadEmails} variant="outline" className="border-neon text-neon hover:bg-neon/10">
              Refresh Data
            </Button>
            <Button onClick={clearEmails} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
              Clear All
            </Button>
          </div>

          {/* Email List */}
          <div className="border border-neon/20 rounded-lg bg-background/20 backdrop-blur-sm">
            <div className="p-6 border-b border-neon/20">
              <h2 className="text-xl font-bold">Waitlist Emails</h2>
            </div>

            <div className="p-6">
              {emails.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No emails collected yet.</p>
              ) : (
                <div className="space-y-4">
                  {emails
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-4 border border-neon/10 rounded-lg bg-background/10"
                      >
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-neon" />
                          <span className="font-medium">{entry.email}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleString()}
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
