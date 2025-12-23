// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  // Menambahkan role ke Session (agar bisa diakses di frontend: session.user.role)
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  // Menambahkan role ke User (data dari database)
  interface User {
    role: string
  }
}

declare module "next-auth/jwt" {
  // Menambahkan role ke Token JWT
  interface JWT {
    role: string
    id: string
  }
}