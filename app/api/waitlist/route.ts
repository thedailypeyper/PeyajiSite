import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Basic email validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection("waitlist")

    // Check if email already exists
    const existingEmail = await collection.findOne({ email: email.toLowerCase() })
    if (existingEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Add email to waitlist
    const newEntry = {
      email: email.toLowerCase(),
      timestamp: new Date(),
      source: "website",
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || request.ip || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      referrer: request.headers.get("referer") || "direct",
    }

    const result = await collection.insertOne(newEntry)

    console.log("✅ New waitlist signup:", { email: newEntry.email, id: result.insertedId })

    return NextResponse.json({
      success: true,
      message: "Successfully joined waitlist!",
      id: result.insertedId,
    })
  } catch (error) {
    console.error("❌ Waitlist error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const adminKey = searchParams.get("admin")

    // Simple admin check (use proper auth in production)
    if (adminKey !== "peyaji-admin-2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const collection = db.collection("waitlist")

    // Get all emails sorted by timestamp (newest first)
    const emails = await collection.find({}).sort({ timestamp: -1 }).toArray()

    // Get statistics
    const total = emails.length
    const now = new Date()
    const last24Hours = emails.filter(
      (email) => new Date(email.timestamp) > new Date(now.getTime() - 24 * 60 * 60 * 1000),
    ).length
    const last7Days = emails.filter(
      (email) => new Date(email.timestamp) > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    ).length

    return NextResponse.json({
      emails: emails.map((email) => ({
        id: email._id,
        email: email.email,
        timestamp: email.timestamp,
        source: email.source || "website",
        ipAddress: email.ipAddress || "unknown",
      })),
      stats: {
        total,
        last24Hours,
        last7Days,
      },
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Admin API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
