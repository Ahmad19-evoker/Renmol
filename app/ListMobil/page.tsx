import Image from "next/image";
import Link from "next/link";
import { Users, Fuel, Settings, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

// Tambahkan revalidate agar data tidak cache selamanya (Update tiap 0 detik/selalu fresh)
export const dynamic = "force-dynamic";

export default async function ListMobilPage() {
  // 1. Panggil data langsung dari Database MySQL
  const cars = await prisma.car.findMany({
    orderBy: {
      createdAt: 'desc', // Urutkan dari yang terbaru
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
      
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/Landing" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Hasil Pencarian</h1>
            <p className="text-sm text-gray-500">
              Menampilkan {cars.length} mobil tersedia (Dari Database)
            </p>
          </div>
        </div>
      </div>

      {/* Grid Mobil */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {cars.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-400">Belum ada mobil tersedia.</h3>
            <p className="text-gray-400">Coba jalankan perintah seed dulu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                <div className="relative h-48 w-full bg-gray-200">
                  <Image 
                    src={car.image} 
                    alt={car.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-700">
                    {car.type}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                  <div className="flex items-center gap-4 mt-3 text-gray-500 text-xs">
                    <div className="flex items-center gap-1"><Users size={14} /> {car.passengers}</div>
                    <div className="flex items-center gap-1"><Settings size={14} /> {car.transmission}</div>
                    <div className="flex items-center gap-1"><Fuel size={14} /> {car.fuel}</div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Harga per hari</p>
                      <p className="text-lg font-bold text-blue-600">Rp {car.price.toLocaleString('id-ID')}</p>
                    </div>
                    {/* Link ke Detail Mobil */}
                    <Link href={`/mobil/${car.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Pilih
                    </Link>
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