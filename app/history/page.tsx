import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Car, CreditCard } from "lucide-react"; // Pastikan install lucide-react jika belum

// Agar data selalu update (Real-time)
export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  // 1. Cek User Login
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // 2. Ambil Data Order milik User ini
  // @ts-ignore
  const userId = session.user.id;
  
  const orders = await prisma.order.findMany({
    where: {
      userId: userId, // Filter cuma punya user yang login
    },
    include: {
      car: true, // PENTING: Ikutkan data Mobil biar bisa ambil Nama & Gambar
    },
    orderBy: {
      createdAt: 'desc', // Urutkan dari yang terbaru
    },
  });

  // Helper untuk format duit Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Helper untuk format tanggal
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Riwayat Pesanan</h1>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
             &larr; Kembali ke Home
          </Link>
        </div>

        {/* Jika Belum Ada Pesanan */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Car className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada pesanan</h3>
            <p className="text-gray-500 mb-6">Yuk, sewa mobil impianmu sekarang!</p>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Cari Mobil
            </Link>
          </div>
        ) : (
          /* List Pesanan */
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* Gambar Mobil */}
                  <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image 
                      src={order.car.image} 
                      alt={order.car.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>

                  {/* Detail Pesanan */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{order.car.name}</h2>
                        <p className="text-sm text-gray-500">{order.car.brand} • {order.car.type}</p>
                      </div>
                      
                      {/* Badge Status */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                        ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                          order.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 
                          'bg-red-100 text-red-700'}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {/* Tanggal Sewa */}
                      <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <Calendar size={18} className="text-blue-500"/>
                        <div>
                          <p className="text-xs text-gray-400 font-bold">TANGGAL SEWA</p>
                          <p className="font-medium">{formatDate(order.startDate)} - {formatDate(order.endDate)}</p>
                        </div>
                      </div>

                      {/* Total Harga */}
                      <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <CreditCard size={18} className="text-blue-500"/>
                        <div>
                          <p className="text-xs text-gray-400 font-bold">TOTAL BAYAR</p>
                          <p className="font-bold text-gray-900 text-lg">{formatRupiah(order.totalPrice)}</p>
                        </div>
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