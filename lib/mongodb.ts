import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
console.log("🔄 MongoDB URI configured:", uri ? "✅ Present" : "❌ Missing")

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000, // Increased timeout
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  // SSL/TLS options to handle the SSL error
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  // Additional options for better connection handling
  retryWrites: true,
  retryReads: true,
  maxIdleTimeMS: 30000,
  // Compression
  compressors: ["zlib"],
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    console.log("🔄 Creating new MongoDB client (development)")
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  console.log("🔄 Creating new MongoDB client (production)")
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDatabase(): Promise<Db> {
  try {
    console.log("🔄 Getting database connection...")
    const client = await clientPromise
    const db = client.db("peyaji")
    console.log("✅ Database connection established")
    return db
  } catch (error) {
    console.error("❌ Database connection error:", error)

    // More specific error handling for SSL issues
    if (error instanceof Error) {
      if (error.message.includes("SSL") || error.message.includes("TLS")) {
        console.error("🔒 SSL/TLS Error detected. This might be due to:")
        console.error("   - Incorrect connection string format")
        console.error("   - Network/firewall restrictions")
        console.error("   - MongoDB Atlas configuration issues")
      }
    }

    throw error
  }
}

export async function testConnection() {
  try {
    console.log("🔄 Testing MongoDB connection...")
    const client = await clientPromise

    // Test with a simple ping
    const result = await client.db("admin").command({ ping: 1 })
    console.log("✅ MongoDB ping successful:", result)

    // Test database access
    const db = client.db("peyaji")
    const collections = await db.listCollections().toArray()
    console.log("✅ Database access successful, collections:", collections.length)

    return true
  } catch (error) {
    console.error("❌ MongoDB connection test failed:", error)

    // Provide specific guidance for SSL errors
    if (error instanceof Error && (error.message.includes("SSL") || error.message.includes("TLS"))) {
      console.error("🔒 SSL/TLS Connection Issue:")
      console.error("   1. Check if MongoDB URI has correct format")
      console.error("   2. Verify MongoDB Atlas network access settings")
      console.error("   3. Ensure SSL is properly configured")
    }

    return false
  }
}
