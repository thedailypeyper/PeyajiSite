import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
// In production, you'd use a database like Supabase, MongoDB, etc.
const waitlistEmails: { email: string; timestamp: Date; id: string }[] = []

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Basic email validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Check if email already exists
    const existingEmail = waitlistEmails.find((entry) => entry.email === email)
    if (existingEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Add email to waitlist
    const newEntry = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      timestamp: new Date(),
    }

    waitlistEmails.push(newEntry)

    console.log("New waitlist signup:", newEntry)

    return NextResponse.json({
      success: true,
      message: "Successfully joined waitlist!",
    })
  } catch (error) {
    console.error("Waitlist error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Simple admin endpoint to view emails
  // In production, you'd add proper authentication
  const { searchParams } = new URL(request.url)
  const adminKey = searchParams.get("admin")

  // Simple admin check (use proper auth in production)
  if (adminKey !== "peyaji-admin-2025") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    emails: waitlistEmails,
    total: waitlistEmails.length,
  })
}
