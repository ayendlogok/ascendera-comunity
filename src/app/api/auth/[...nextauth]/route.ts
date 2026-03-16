import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "your_google_client_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "your_google_client_secret",
    }),
    CredentialsProvider({
      id: "admin-login",
      name: "Admin Login",
      credentials: {
        email: { label: "Admin Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.email?.toLowerCase().trim() === "ascenderacommunity@gmail.com" && 
          credentials?.password === "ascendera2026"
        ) {
          // Bypass database read to prevent database timeout hangs
          return {
            id: "admin-fallback-id",
            name: "Ascendera Admin",
            email: credentials.email,
            role: "ADMIN"
          }
        }
        return null
      }
    }),
    CredentialsProvider({
      id: "roblox-login",
      name: "Roblox Username",
      credentials: {
        username: { label: "Roblox Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username) return null

        try {
          let user = await prisma.user.findUnique({
            where: { roblox_username: credentials.username }
          }).catch(() => null)

          if (!user) {
            user = await prisma.user.create({
              data: {
                roblox_username: credentials.username,
                username: credentials.username,
                name: credentials.username,
                role: "USER"
              }
            }).catch(() => {
              return {
                id: "user-fallback-id",
                name: credentials.username,
                email: null,
                role: "USER"
              } as any
            })
          }
          return {
            id: user?.id || "user-fallback-id",
            name: user?.name,
            email: user?.email,
            image: user?.image,
            role: user?.role || "USER"
          }
        } catch (err) {
          return {
            id: "user-fallback-id",
            name: credentials.username,
            email: null,
            role: "USER"
          }
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (!user.email) return false;
        
        const isAdmin = user.email === "ascenderacommunity@gmail.com";
        try {
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email }
          }).catch(() => null);

          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "Google User",
                image: user.image,
                role: isAdmin ? "ADMIN" : "USER"
              }
            }).catch(() => {
              return {
                role: isAdmin ? "ADMIN" : "USER"
              } as any
            });
          } else if (isAdmin && dbUser.role !== "ADMIN") {
            dbUser = await prisma.user.update({
              where: { email: user.email },
              data: { role: "ADMIN" }
            }).catch(() => dbUser);
          }
          
          (user as any).role = dbUser ? dbUser.role : (isAdmin ? "ADMIN" : "USER");
        } catch (err) {
          (user as any).role = isAdmin ? "ADMIN" : "USER";
        }
        return true;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role
      }
      if (trigger === "update" && session?.role) {
        token.role = session.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role || "USER";
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
