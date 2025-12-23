import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Data tidak lengkap");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("User tidak ditemukan");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("Password salah");
        }

        // Return data user (termasuk ID)
        return {
          id: user.id, // PENTING: Kita kembalikan ID di sini
          name: user.name,
          email: user.email,
        };
      }
    })
  ],
  callbacks: {
    // 1. Saat login berhasil, masukkan ID ke Token JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // 2. Saat sesi dibaca di frontend/backend, ambil ID dari Token JWT
    async session({ session, token }) {
      if (session?.user) {
        // @ts-ignore
        session.user.id = token.id; // Masukkan ID ke session
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };