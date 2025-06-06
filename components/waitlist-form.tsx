"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Mail, CheckCircle } from "lucide-react"

interface WaitlistFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistForm({ isOpen, onClose }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Basic email validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
      setEmail("")
    } catch (err) {
      console.error("Waitlist error:", err)
      setError("Failed to join waitlist. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-background border border-neon/20 rounded-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-neon transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                Join the <span className="text-neon">Cult</span>
              </h2>
              <p className="text-muted-foreground">
                Be the first to know when $PEY launches and get exclusive early access to the ecosystem.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-neon/20 focus:border-neon bg-background/50"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neon hover:bg-neon/80 text-background font-medium"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                By joining, you agree to receive updates about Peyaji. No spam, we promise.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-neon mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to the Cult!</h2>
            <p className="text-muted-foreground mb-6">
              You're now on the waitlist. We'll notify you when $PEY launches and share exclusive updates.
            </p>
            <Button onClick={onClose} className="bg-neon hover:bg-neon/80 text-background">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
