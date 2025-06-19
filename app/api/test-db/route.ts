import { NextResponse } from "next/server"
import { testConnection } from "@/lib/mongodb"

export async function GET() {
  try {
    console.log("🔄 Database test endpoint called")

    // Check if environment variable exists
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          success: false,
          message: "MONGODB_URI environment variable is missing",
          error: "Configuration error",
        },
        { status: 500 },
      )
    }

    // Log connection string format (without credentials)
    const uri = process.env.MONGODB_URI
    const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@")
    console.log("🔗 Connection string format:", maskedUri)

    const isConnected = await testConnection()

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: "MongoDB connection successful!",
        timestamp: new Date().toISOString(),
        connectionString: maskedUri,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "MongoDB connection failed - check server logs for details",
          timestamp: new Date().toISOString(),
          connectionString: maskedUri,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("❌ Database test error:", error)

    let errorMessage = "Database test failed"
    let errorDetails = "Unknown error"

    if (error instanceof Error) {
      errorMessage = error.message
      errorDetails = error.stack || error.message

      // Provide specific guidance for common errors
      if (error.message.includes("SSL") || error.message.includes("TLS")) {
        errorMessage = "SSL/TLS connection error - check MongoDB Atlas configuration"
      } else if (error.message.includes("authentication")) {
        errorMessage = "Authentication failed - check username/password"
      } else if (error.message.includes("network")) {
        errorMessage = "Network error - check MongoDB Atlas network access"
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: errorDetails,
        timestamp: new Date().toISOString(),
        troubleshooting: [
          "1. Check if MONGODB_URI environment variable is set correctly",
          "2. Verify MongoDB Atlas network access allows your deployment IP",
          "3. Confirm database user has proper permissions",
          "4. Check if connection string format is correct",
        ],
      },
      { status: 500 },
    )
  }
}
