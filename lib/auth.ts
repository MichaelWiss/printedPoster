import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./db/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // For demo purposes, we'll create a simple user
        // In production, you'd validate against your user database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        }

        // Create user if they don't exist (demo only)
        const newUser = await prisma.user.create({
          data: {
            email: credentials.email,
            name: credentials.email.split('@')[0],
          }
        })

        return {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          image: newUser.image,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  newUser: '/auth/signup'
  }
}
