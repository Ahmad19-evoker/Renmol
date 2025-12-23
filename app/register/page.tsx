"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
// 1. Import motion
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        alert("Pendaftaran Berhasil! Silakan login.");
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Gagal mendaftar");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan server");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      
      {/* --- BAGIAN KIRI: FORM (Gunakan motion.div dengan layoutId) --- */}
      <motion.div 
         layoutId="auth-form-side" // ID yang sama dengan form login
         className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative bg-white z-10"
      >
         <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-semibold">
           <ArrowLeft size={20} /> Kembali
        </Link>

        <div className="w-full max-w-md">
           <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h1>
            <p className="text-gray-500 mt-2">Bergabunglah dengan RENMOL dan mulai perjalananmu.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Input Nama */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Nama Lengkap</label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="text"
                  required
                  placeholder="Jhon Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-medium text-gray-800"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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
              <label className="text-sm font-bold text-gray-700">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Buat password kuat"
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
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all shadow-xl shadow-gray-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Mendaftarkan...
                </>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-600 font-bold hover:underline transition-all">
              Login di sini
            </Link>
          </p>
        </div>
      </motion.div>

      {/* --- BAGIAN KANAN: GAMBAR (Gunakan motion.div dengan layoutId) --- */}
      <motion.div 
         layoutId="auth-image-side" // ID yang sama dengan gambar login
         className="hidden lg:flex w-1/2 relative bg-blue-600 justify-center items-center overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop"
          alt="Register Background"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        <div className="relative z-10 text-white p-16">
           {/* Gunakan motion pada teks */}
          <motion.h2 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="text-4xl font-bold mb-6">Mulai Petualanganmu.</motion.h2>
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="space-y-4">
             <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" /> <span>Proses booking cepat & mudah</span>
             </div>
             <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" /> <span>Metode pembayaran aman</span>
             </div>
             <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" /> <span>Layanan support 24 Jam</span>
             </div>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
}