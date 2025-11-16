import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";

const handler = NextAuth({
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

        // Check if user exists
        let user = await User.findOne({ email });

        // Auto-create if not exist
        if (!user) {
          user = await User.create({
            email,
            name: email.split("@")[0],
          });
        }

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
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
