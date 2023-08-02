// The NextAuth function from the 'next-auth' package is used to add authentication support.
import NextAuth from "next-auth"

// The options for the NextAuth function are imported from a local options file.
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

// The NextAuth function is called with the imported options to create a request handler.
// The handler will be used to process GET and POST requests for authentication.
const handler = NextAuth(authOptions)

// The handler is exported as both GET and POST.
// This means the same handler will be used for both GET and POST requests.
// This is common in Next.js API routes where you might want to handle multiple methods in a single file.
export { handler as GET, handler as POST }