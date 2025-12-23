"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
// 1. Import motion
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau Password salah!");
        setIsLoading(false);
      } else {
        router.push("/Dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      
      {/* --- BAGIAN KIRI: GAMBAR (Gunakan motion.div dengan layoutId) --- */}
      <motion.div 
        layoutId="auth-image-side" // ID unik untuk animasi bersama
        className="hidden lg:flex w-1/2 relative bg-gray-900 justify-center items-center overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop"
          alt="Login Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 text-white p-12 text-center">
          {/* Gunakan motion pada teks agar muncul perlahan */}
          <motion.h2 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="text-4xl font-bold mb-4">Selamat Datang Kembali!</motion.h2>
          <motion.p initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="text-gray-200 text-lg">Akses ribuan mobil impian Anda hanya dengan satu akun RENMOL.</motion.p>
        </div>
      </motion.div>

      {/* --- BAGIAN KANAN: FORM (Gunakan motion.div) --- */}
      <motion.div 
         layoutId="auth-form-side"
         className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative bg-white z-10"
      >
        {/* Tombol Kembali */}
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-semibold">
           <ArrowLeft size={20} /> Kembali
        </Link>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/30">
              <span className="text-white text-2xl font-black">R</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Masuk Akun</h1>
            <p className="text-gray-500 mt-2">Masukkan email dan password untuk melanjutkan.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2 animate-pulse">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-medium text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                 <label className="text-sm font-bold text-gray-700">Password</label>
                 <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">Lupa Password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-medium text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Memproses...
                </>
              ) : (
                "Masuk Sekarang"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-600 font-bold hover:underline transition-all">
              Daftar Gratis
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}