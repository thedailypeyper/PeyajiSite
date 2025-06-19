import { NextResponse } from "next/server"
import { testConnection } from "@/lib/mongodb"

export async function GET() {
  try {
    const isConnected = await testConnection()

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: "MongoDB connection successful!",
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "MongoDB connection failed",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database test failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
