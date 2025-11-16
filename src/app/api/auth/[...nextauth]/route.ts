import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuth in the App Router must export GET and POST handlers.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };