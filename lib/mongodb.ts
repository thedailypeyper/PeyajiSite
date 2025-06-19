import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
console.log("🔄 MongoDB URI configured:", uri ? "✅ Present" : "❌ Missing")

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
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
    throw error
  }
}

export async function testConnection() {
  try {
    console.log("🔄 Testing MongoDB connection...")
    const client = await clientPromise
    await client.db("admin").command({ ping: 1 })
    console.log("✅ MongoDB connection test successful!")
    return true
  } catch (error) {
    console.error("❌ MongoDB connection test failed:", error)
    return false
  }
}
