import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { ArrowLeft, Users, Settings2, Fuel, Calendar, CheckCircle, MapPin, AlertCircle } from "lucide-react";
import BookingForm from "./BookingForm"; 

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  // 1. Ambil Session User
  const session = await getServerSession(authOptions);
  
  // 2. Ambil data mobil berdasarkan ID di URL
  const car = await prisma.car.findUnique({
    where: { id: params.id },
  });

  // Jika mobil tidak ditemukan di database
  if (!car) {
    return notFound();
  }

  // Cek apakah User ID tersedia
  // @ts-ignore
  const userId = session?.user?.id;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* --- HERO SECTION (GAMBAR ATAS) --- */}
      <div className="relative h-[50vh] bg-gray-900 w-full">
        <div className="absolute top-6 left-6 z-20">
            <Link href="/Dashboard" className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/30 transition border border-white/10 font-bold text-sm">
                <ArrowLeft size={18}/> Kembali ke Dashboard
            </Link>
        </div>

        <div className="relative w-full h-full">
            <Image 
                src={car.image} 
                alt={car.name} 
                fill 
                className="object-cover opacity-80"
                priority
            />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent p-6 pt-32">
            <div className="max-w-7xl mx-auto px-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                    {car.type}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{car.name}</h1>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <MapPin size={16} /> Tersedia di Jakarta Pusat
                </div>
            </div>
        </div>
      </div>

      {/* --- KONTEN UTAMA (GRID LAYOUT) --- */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 grid lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: Detail & Fasilitas */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* SPESIFIKASI */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Spesifikasi Kendaraan</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <Users className="text-blue-600 mx-auto mb-2" size={24}/>
                        <p className="text-xs text-gray-500 uppercase font-bold">Kapasitas</p>
                        <p className="font-bold text-gray-900">{car.passengers} Kursi</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <Settings2 className="text-blue-600 mx-auto mb-2" size={24}/>
                        <p className="text-xs text-gray-500 uppercase font-bold">Transmisi</p>
                        <p className="font-bold text-gray-900">{car.transmission}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <Fuel className="text-blue-600 mx-auto mb-2" size={24}/>
                        <p className="text-xs text-gray-500 uppercase font-bold">Bahan Bakar</p>
                        <p className="font-bold text-gray-900">{car.fuel}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <Calendar className="text-blue-600 mx-auto mb-2" size={24}/>
                        <p className="text-xs text-gray-500 uppercase font-bold">Tahun</p>
                        <p className="font-bold text-gray-900">2024</p>
                    </div>
                </div>
            </div>

            {/* FASILITAS */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Fasilitas Termasuk</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20}/><span className="text-gray-600">Asuransi All Risk</span></div>
                    <div className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20}/><span className="text-gray-600">Layanan Darurat 24 Jam</span></div>
                    <div className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20}/><span className="text-gray-600">Bensin Full (Awal)</span></div>
                    <div className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20}/><span className="text-gray-600">Mobil Bersih & Wangi</span></div>
                </div>
            </div>
            
            {/* DESKRIPSI */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang {car.name}</h2>
                <p className="text-gray-600 leading-relaxed">
                    Kendaraan ini dirawat secara berkala di bengkel resmi. Sangat cocok untuk perjalanan bisnis maupun liburan keluarga. 
                    Dilengkapi dengan fitur keselamatan standar internasional.
                </p>
            </div>
        </div>

        {/* KOLOM KANAN: FORM BOOKING (PENTING!) */}
        <div className="lg:col-span-1">
             {userId ? (
                // 1. JIKA LOGIN: Tampilkan Form Booking
                // Kita kirim data 'car' dan 'userId' ke Client Component
                <BookingForm car={car} userId={userId} />
             ) : (
                // 2. JIKA BELUM LOGIN: Tampilkan Pesan Minta Login
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center sticky top-6">
                   <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle size={32}/>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Login Diperlukan</h3>
                   <p className="text-gray-500 mb-6">Anda harus login terlebih dahulu untuk melihat harga dan menyewa mobil ini.</p>
                   <Link href="/login" className="block bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-500/30">
                      Login Sekarang
                   </Link>
                </div>
             )}
        </div>

      </div>
    </main>
  );
}