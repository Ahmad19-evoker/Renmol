import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, Zap, Shield, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

// Hapus import Heart karena kartunya dihapus
// import { Heart } from "lucide-react"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100 flex flex-col">
      
      {/* --- NAVBAR (Logo Only) --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all h-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 flex justify-between items-center">
          {/* Logo RENMOL */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white text-xl font-black">R</span>
            </div>
            <div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">RENMOL</span>
            </div>
          </div>
          
          {/* Navbar bersih tanpa tombol Login/Daftar */}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-12 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* KONTEN KIRI (TEKS) - TIDAK ADA PERUBAHAN */}
          <div className="relative z-10 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
              <Star size={14} fill="currentColor" /> Solusi Perjalanan #1
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
              Sewa Mobil <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Gak Pake Ribet.
              </span>
            </h1>
            
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              Pilih mobil impianmu, booking dalam hitungan detik, dan nikmati perjalanan aman bersama RENMOL.
            </p>

            {/* SATU TOMBOL UTAMA (SINGLE CTA) */}
            <div className="flex justify-center lg:justify-start mb-10">
              <Link 
                href="/login" 
                className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                Mulai Sewa Sekarang
                <ChevronRight size={22} strokeWidth={3} />
              </Link>
            </div>

            {/* STATISTIK */}
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 border-t border-gray-100">
               <div>
                  <p className="text-2xl font-black text-gray-900">500+</p>
                  <p className="text-xs text-gray-500 font-bold uppercase">Unit Mobil</p>
               </div>
               <div className="w-px h-8 bg-gray-200"></div>
               <div>
                  <p className="text-2xl font-black text-gray-900">24/7</p>
                  <p className="text-xs text-gray-500 font-bold uppercase">Support</p>
               </div>
                <div className="w-px h-8 bg-gray-200"></div>
               <div>
                  <p className="text-2xl font-black text-gray-900">10k+</p>
                  <p className="text-xs text-gray-500 font-bold uppercase">User Aktif</p>
               </div>
            </div>
          </div>

          {/* KONTEN KANAN (GAMBAR) - DIUBAH */}
          <div className="relative order-1 lg:order-2 flex justify-center items-center">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-3xl -z-10 opacity-70"></div>
            
            <Image 
              src="https://drive.google.com/uc?export=view&id=1lf6__gpTQFJyMn-LLlMZWuYRZlsIFokA" 
              alt="Mobil Keren RENMOL"
              // Ukuran diperbesar dari 600x400 menjadi 700x500 agar lebih pas
              width={500}
              height={300}
              priority
            />

            {/* KARTU MELAYANG TELAH DIHAPUS DI SINI */}
          </div>

        </div>
      </section>

      {/* --- FITUR SECTION (TIDAK ADA PERUBAHAN) --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Booking Cepat</h3>
              <p className="text-gray-500 leading-relaxed">Proses pemesanan instan. Pilih mobil, tentukan tanggal, langsung dapat konfirmasi.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aman & Terjamin</h3>
              <p className="text-gray-500 leading-relaxed">Semua unit terasuransi dan dicek berkala demi keselamatan perjalanan Anda.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unit Berkualitas</h3>
              <p className="text-gray-500 leading-relaxed">Berbagai pilihan mobil terbaru yang bersih dan wangi siap menemani.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER (TIDAK ADA PERUBAHAN) --- */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Kolom 1: Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black">R</span>
                </div>
                <span className="text-xl font-bold">RENMOL</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Platform sewa mobil terpercaya di Indonesia. Kami menyediakan armada terbaik untuk perjalanan bisnis maupun liburan Anda.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Instagram size={18}/></a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook size={18}/></a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Twitter size={18}/></a>
              </div>
            </div>

            {/* Kolom 2: Link Cepat */}
            <div>
              <h4 className="font-bold text-lg mb-6">Link Cepat</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-blue-500 transition-colors">Beranda</Link></li>
                <li><Link href="/ListMobil" className="hover:text-blue-500 transition-colors">Daftar Mobil</Link></li>
                <li><Link href="/login" className="hover:text-blue-500 transition-colors">Masuk Akun</Link></li>
                <li><Link href="/register" className="hover:text-blue-500 transition-colors">Daftar Member</Link></li>
              </ul>
            </div>

            {/* Kolom 3: Layanan */}
            <div>
              <h4 className="font-bold text-lg mb-6">Layanan</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Sewa Lepas Kunci</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Sewa dengan Supir</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Antar Jemput Bandara</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Corporate Rental</a></li>
              </ul>
            </div>

            {/* Kolom 4: Kontak */}
            <div>
              <h4 className="font-bold text-lg mb-6">Hubungi Kami</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-500 mt-1 shrink-0" />
                  <span>Jl. Sudirman No. 45, Jakarta Pusat, Indonesia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-blue-500 shrink-0" />
                  <span>+62 812-3456-7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-500 shrink-0" />
                  <span>support@renmol.id</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">© 2024 RENMOL Indonesia. All rights reserved.</p>
            <div className="flex gap-6 text-gray-500 text-xs">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}