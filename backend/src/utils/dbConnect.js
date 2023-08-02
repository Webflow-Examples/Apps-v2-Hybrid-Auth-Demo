/**
 * This script establishes a MongoDB database connection using Mongoose.
 * It is based on the official Next.js example found at:
 * https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
 */

// Import mongoose module, which provides a straight-forward, schema-based solution to model your application data.
import mongoose from 'mongoose'

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI

// If MONGODB_URI is not defined in environment variables, throw an error
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

// If the cache does not exist, initialize it
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

/**
 * Asynchronous function to connect to the MongoDB database
 * It uses a singleton pattern to ensure a single database connection is reused across multiple requests.
 */
async function dbConnect() {
  // If the database connection exists, return it
  if (cached.conn) {
    return cached.conn
  }

  // If there isn't a promise to connect to the MongoDB database, create it
  if (!cached.promise) {
    const opts = {
      // By setting bufferCommands to false, Mongoose will not buffer any commands if the connection goes down
      bufferCommands: false,
    }

    // Create a promise to connect to the MongoDB database using Mongoose
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  // Await for the promise to connect to the MongoDB database to resolve
  try {
    cached.conn = await cached.promise
  } catch (e) {
    // If there's an error connecting to the MongoDB database, reset the promise and throw the error
    cached.promise = null
    throw e
  }

  // Return the connection to the MongoDB database
  return cached.conn
}

// Export the database connection function as a module
export default dbConnect