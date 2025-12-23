import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Target, Award, Users, Phone } from "lucide-react";

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* Navbar Simple */}
      <nav className="bg-white py-4 px-6 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">RentCar.id</Link>
            <div className="hidden md:flex space-x-6 text-sm font-medium">
                <Link href="/Landing" className="hover:text-blue-600 transition-colors">Beranda</Link>
                <Link href="/ListMobil" className="hover:text-blue-600 transition-colors">Daftar Mobil</Link>
                <Link href="/TentangKami" className="text-blue-600">Tentang Kami</Link>
            </div>
            <Link href="/ListMobil" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                Sewa Sekarang
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src="https://i.pinimg.com/736x/8c/85/2d/8c852db35b43ec980dc15e9acc5cd58d.jpg"
          alt="Office Team"
          fill
          className="object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Tentang Kami</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Kami bukan sekadar penyewaan mobil. Kami adalah mitra perjalanan Anda untuk menciptakan kenangan tak terlupakan.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Perjalanan Kami</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                        Berdiri sejak tahun 2020, RentCar.id dimulai dari sebuah garasi kecil dengan hanya 2 unit mobil. 
                        Kami melihat adanya kebutuhan masyarakat akan transportasi yang bersih, aman, dan transparan harganya.
                    </p>
                    <p>
                        Kini, kami telah melayani lebih dari 10.000 pelanggan dengan armada yang tersebar di berbagai kota besar. 
                        Komitmen kami tetap sama: memberikan rasa aman di setiap kilometer perjalanan Anda.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden relative">
                         <Image src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80" alt="Car 1" fill className="object-cover"/>
                    </div>
                    <div className="h-56 bg-gray-100 rounded-2xl overflow-hidden relative">
                         <Image src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80" alt="Car 2" fill className="object-cover"/>
                    </div>
                </div>
                <div className="space-y-4 pt-8">
                    <div className="h-56 bg-gray-100 rounded-2xl overflow-hidden relative">
                         <Image src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=600&q=80" alt="Car 3" fill className="object-cover"/>
                    </div>
                    <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden relative">
                         <Image src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" alt="Car 4" fill className="object-cover"/>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Visi Misi / Values */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900">Nilai Utama Kami</h2>
                <p className="text-gray-500 mt-2">Apa yang membuat kami berbeda</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                        <Target size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Tepat Waktu</h3>
                    <p className="text-gray-500">Kami menghargai waktu Anda. Unit selalu siap 30 menit sebelum jadwal penjemputan.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                        <Award size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Kualitas Premium</h3>
                    <p className="text-gray-500">Seluruh armada di bawah 3 tahun pemakaian dan selalu diservis rutin di bengkel resmi.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                        <Users size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Pelayanan 24/7</h3>
                    <p className="text-gray-500">Customer service kami siap membantu kendala Anda kapanpun dan dimanapun.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="bg-gray-900 text-white py-8 text-center">
          <p className="text-gray-500">&copy; 2024 RentCar.id. All rights reserved.</p>
      </footer>
    </div>
  );
}