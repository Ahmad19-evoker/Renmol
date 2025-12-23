import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  // 1. Konfigurasi Provider
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

        // --- PERBAIKAN PENTING DI SINI ---
        // Kita WAJIB mengembalikan 'role' di sini agar bisa ditangkap oleh callback JWT
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // <--- Jangan lupa ini!
        };
      }
    })
  ],

  // 2. Konfigurasi Session
  session: {
    strategy: "jwt",
  },

  // 3. Secret Key
  secret: process.env.NEXTAUTH_SECRET,

  // 4. Halaman Login Custom
  pages: {
    signIn: "/login",
  },

  // 5. Callbacks (Digabung jadi satu)
  callbacks: {
    // Tahap A: Masukkan data dari User ke Token (saat login pertama)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Simpan role ke token
      }
      return token;
    },

    // Tahap B: Masukkan data dari Token ke Session (saat frontend butuh data)
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.role = token.role; // Masukkan role ke session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };