import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Car, Calendar, CreditCard, ShieldCheck, Clock } from "lucide-react";

// Wajib: Agar data selalu update saat dibuka
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // 1. Cek Session Login
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // 2. Ambil Data User & Order sekaligus
  // @ts-ignore
  const userId = session.user.id;
  // @ts-ignore
  const userRole = session.user.role;

  const orders = await prisma.order.findMany({
    where: {
      userId: userId, // Ambil pesanan milik user ini saja
    },
    include: {
      car: true, // Sertakan data mobil
    },
    orderBy: {
      createdAt: 'desc', // Pesanan terbaru di paling atas
    },
  });

  // Helper Format Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Helper Format Tanggal
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* --- HEADER DASHBOARD --- */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Halo, {session.user.name} 👋</h1>
                    <p className="text-gray-500 text-sm mt-1">Selamat datang kembali di Dashboard Anda.</p>
                </div>
                
                {/* Badge Role */}
                <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border
                        ${userRole === 'ADMIN' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                        {userRole} ACCOUNT
                    </span>
                    
                    {/* Tombol Logout (Opsional jika belum ada di Navbar) */}
                    <Link href="/api/auth/signout" className="text-sm font-medium text-gray-500 hover:text-red-500">
                        Logout
                    </Link>
                </div>
            </div>

            {/* AREA KHUSUS ADMIN */}
            {userRole === 'ADMIN' && (
                <div className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                        <ShieldCheck size={32} className="text-yellow-400"/>
                        <div>
                            <h3 className="font-bold text-lg">Admin Control Center</h3>
                            <p className="text-gray-400 text-sm">Anda memiliki akses penuh untuk mengelola aplikasi.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {/* Arahkan ke Prisma Studio atau halaman Admin yang nanti dibuat */}
                        <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition">
                            Kelola Mobil
                        </button>
                        <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/20 transition">
                            Cek Semua Pesanan
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* --- KONTEN UTAMA: RIWAYAT PESANAN --- */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-blue-600"/> Riwayat Pesanan Saya
        </h2>

        {orders.length === 0 ? (
          // JIKA TIDAK ADA PESANAN
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <Car size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Belum ada penyewaan</h3>
            <p className="text-gray-500 mb-6 text-sm">Anda belum pernah menyewa mobil. Yuk mulai perjalananmu!</p>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
              Cari Mobil Sekarang
            </Link>
          </div>
        ) : (
          // JIKA ADA PESANAN (LIST)
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* Foto Mobil */}
                  <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image 
                      src={order.car.image} 
                      alt={order.car.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Info Detail */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{order.car.name}</h3>
                        <p className="text-sm text-gray-500">{order.car.brand} • {order.car.type}</p>
                      </div>
                      
                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                        ${order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                          order.status === 'SUCCESS' ? 'bg-green-50 text-green-600 border-green-200' : 
                          'bg-red-50 text-red-600 border-red-200'}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-50">
                        {/* Tanggal */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={16} className="text-blue-500"/>
                            <span>{formatDate(order.startDate)} - {formatDate(order.endDate)}</span>
                        </div>

                        {/* Harga */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CreditCard size={16} className="text-green-500"/>
                            <span className="font-bold text-gray-900">{formatRupiah(order.totalPrice)}</span>
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}