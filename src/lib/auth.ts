// Example central authOptions used by the [...nextauth] route and by server-side calls like getServerSession
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./db" // adjust path to your Mongo client promise
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    // Example: Google provider (ensure CLIENT_ID and CLIENT_SECRET set in Vercel)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
    // Add your providers as needed
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // implement your credential verification and return user object
        return null
      },
    }),
  ],
  adapter: process.env.MONGODB_URI ? MongoDBAdapter(clientPromise) : undefined,
  session: {
    strategy: "jwt", // or "database" if using DB sessions
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // attach id or other fields to token if needed
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      // expose token data to client session object
      if (token && token.user) (session as any).user = token.user
      return session
    },
  },
  // Cookie configuration: let NextAuth default to secure cookies in production.
  // If you've customized cookie names, ensure they respect secure settings.
}
export default authOptions
