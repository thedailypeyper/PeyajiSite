import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Define the path for storing emails
const DATA_DIR = path.join(process.cwd(), "data")
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json")

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize the waitlist file if it doesn't exist
if (!fs.existsSync(WAITLIST_FILE)) {
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify({ emails: [] }))
}

interface WaitlistEntry {
  email: string
  timestamp: string
  referrer?: string
}

export async function POST(request: Request) {
  try {
    const { email, referrer } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Create a new entry
    const newEntry: WaitlistEntry = {
      email,
      timestamp: new Date().toISOString(),
      referrer: referrer || "direct",
    }

    // Read the current waitlist
    const waitlistData = JSON.parse(fs.readFileSync(WAITLIST_FILE, "utf8"))

    // Check if email already exists
    const emailExists = waitlistData.emails.some((entry: WaitlistEntry) => entry.email === email)
    if (emailExists) {
      return NextResponse.json({ success: false, message: "Email already registered" }, { status: 200 })
    }

    // Add the new entry
    waitlistData.emails.push(newEntry)

    // Save the updated waitlist
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlistData, null, 2))

    console.log("New waitlist signup:", email)

    return NextResponse.json({ success: true, message: "Successfully joined waitlist" })
  } catch (error) {
    console.error("Waitlist signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // This endpoint would typically be protected with authentication
    // For demonstration purposes, we're keeping it simple

    // Read the current waitlist
    const waitlistData = JSON.parse(fs.readFileSync(WAITLIST_FILE, "utf8"))

    return NextResponse.json(waitlistData)
  } catch (error) {
    console.error("Error fetching waitlist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
