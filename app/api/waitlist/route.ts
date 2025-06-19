import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  console.log("🔄 Waitlist API called")

  try {
    // Parse request body
    let body
    try {
      body = await request.json()
      console.log("📝 Request body parsed:", { email: body.email ? "***@***.***" : "missing" })
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { email } = body

    // Basic email validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.log("❌ Invalid email format:", email)
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    console.log("✅ Email validation passed")

    // Test database connection
    let db
    try {
      console.log("🔄 Connecting to database...")
      db = await getDatabase()
      console.log("✅ Database connection successful")
    } catch (dbError) {
      console.error("❌ Database connection failed:", dbError)
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: dbError instanceof Error ? dbError.message : "Unknown database error",
        },
        { status: 500 },
      )
    }

    // Get collection
    let collection
    try {
      collection = db.collection("waitlist")
      console.log("✅ Collection accessed")
    } catch (collectionError) {
      console.error("❌ Failed to access collection:", collectionError)
      return NextResponse.json(
        {
          error: "Database collection error",
          details: collectionError instanceof Error ? collectionError.message : "Unknown collection error",
        },
        { status: 500 },
      )
    }

    // Check if email already exists
    let existingEmail
    try {
      console.log("🔄 Checking for existing email...")
      existingEmail = await collection.findOne({ email: email.toLowerCase() })
      console.log("✅ Duplicate check completed:", existingEmail ? "Found duplicate" : "No duplicate")
    } catch (findError) {
      console.error("❌ Failed to check for existing email:", findError)
      return NextResponse.json(
        {
          error: "Database query error",
          details: findError instanceof Error ? findError.message : "Unknown query error",
        },
        { status: 500 },
      )
    }

    if (existingEmail) {
      console.log("❌ Email already exists")
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Create new entry
    const newEntry = {
      email: email.toLowerCase(),
      timestamp: new Date(),
      source: "website",
      ipAddress:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        request.headers.get("cf-connecting-ip") ||
        "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      referrer: request.headers.get("referer") || "direct",
    }

    console.log("🔄 Inserting new entry...")

    // Insert email to waitlist
    let result
    try {
      result = await collection.insertOne(newEntry)
      console.log("✅ Email inserted successfully:", result.insertedId)
    } catch (insertError) {
      console.error("❌ Failed to insert email:", insertError)
      return NextResponse.json(
        {
          error: "Database insert error",
          details: insertError instanceof Error ? insertError.message : "Unknown insert error",
        },
        { status: 500 },
      )
    }

    console.log("🎉 Waitlist signup completed successfully")

    return NextResponse.json({
      success: true,
      message: "Successfully joined waitlist!",
      id: result.insertedId,
    })
  } catch (error) {
    console.error("❌ Unexpected error in waitlist API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : "No stack") : undefined,
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  console.log("🔄 Admin API called")

  try {
    const { searchParams } = new URL(request.url)
    const adminKey = searchParams.get("admin")

    // Simple admin check
    if (adminKey !== "peyaji-admin-2025") {
      console.log("❌ Unauthorized admin access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ Admin authentication passed")

    // Connect to database
    let db
    try {
      console.log("🔄 Connecting to database for admin...")
      db = await getDatabase()
      console.log("✅ Admin database connection successful")
    } catch (dbError) {
      console.error("❌ Admin database connection failed:", dbError)
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: dbError instanceof Error ? dbError.message : "Unknown database error",
        },
        { status: 500 },
      )
    }

    const collection = db.collection("waitlist")

    // Get all emails
    let emails
    try {
      console.log("🔄 Fetching emails...")
      emails = await collection.find({}).sort({ timestamp: -1 }).toArray()
      console.log("✅ Emails fetched:", emails.length, "total")
    } catch (fetchError) {
      console.error("❌ Failed to fetch emails:", fetchError)
      return NextResponse.json(
        {
          error: "Database fetch error",
          details: fetchError instanceof Error ? fetchError.message : "Unknown fetch error",
        },
        { status: 500 },
      )
    }

    // Calculate statistics
    const total = emails.length
    const now = new Date()
    const last24Hours = emails.filter(
      (email) => new Date(email.timestamp) > new Date(now.getTime() - 24 * 60 * 60 * 1000),
    ).length
    const last7Days = emails.filter(
      (email) => new Date(email.timestamp) > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    ).length

    console.log("📊 Stats calculated:", { total, last24Hours, last7Days })

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
    console.error("❌ Unexpected error in admin API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
