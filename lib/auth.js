import GoogleProvider from "next-auth/providers/google"; // or your actual provider
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // your custom user validation logic
        const user = { id: "1", name: "Test", email: credentials.email };
        if (user) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/login", // optional
  },
  secret: process.env.NEXTAUTH_SECRET,
};
