import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";

/**
 * Shared authOptions used by both the NextAuth route and server calls to getServerSession.
 * Centralizing this avoids duplication and circular import issues.
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
      },

      async authorize(credentials) {
        await dbConnect();

        const email = credentials?.email;
        if (!email) return null;

        // Find or auto-create user
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            name: email.split("@")[0],
          });
        }

        // Return minimal user object for NextAuth
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // When user logs in for the first time, attach properties to token
      if (user) {
        (token as any).id = (user as any).id ?? (user as any).id;
        (token as any).email = (user as any).email;
        (token as any).name = (user as any).name;
      }
      return token;
    },

    async session({ session, token }) {
      // Ensure session.user exists and populate it from token
      if (!session.user) session.user = {} as any;
      session.user.id = (token as any).id as string | undefined;
      session.user.email = (token as any).email as string | undefined;
      session.user.name = (token as any).name as string | undefined;
      return session;
    },
  },

  // Make sure you set NEXTAUTH_SECRET in production environment variables.
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;