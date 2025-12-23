import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ArrowLeft, Calendar, Clock, Car, UserCheck, CreditCard, Phone } from "lucide-react";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // 1. Ambil Data Order
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { car: true }, 
  });

  if (!order) return notFound();

  // 2. Format Rupiah
  const rp = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

  // 3. Hitung Durasi
  const diffTime = Math.abs(new Date(order.endDate).getTime() - new Date(order.startDate).getTime());
  let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (days === 0) days = 1; // Fix tampilan durasi minimal 1 hari

  // 4. Link WhatsApp
  const message = `Halo Admin, saya mau konfirmasi pesanan:\nOrder ID: ${order.id}\nMobil: ${order.car.name}\nTanggal: ${new Date(order.startDate).toLocaleDateString('id-ID')} s/d ${new Date(order.endDate).toLocaleDateString('id-ID')}`;
  const waLink = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
            <Link href="/Dashboard" className="bg-white p-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600">
                <ArrowLeft size={20}/>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Invoice / Detail Pesanan</h1>
        </div>

        {/* KARTU INVOICE */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            
            {/* Status Banner */}
            <div className={`p-6 text-center ${order.status === 'ACTIVE' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}>
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">Status Pesanan</p>
                <h2 className="text-3xl font-black tracking-tight">{order.status === 'ACTIVE' ? 'SEDANG BERJALAN' : order.status}</h2>
                <p className="text-sm mt-2 opacity-90 font-mono">#{order.id.toUpperCase()}</p>
            </div>

            <div className="p-8">
                {/* Info Mobil */}
                <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-gray-100">
                    <div className="relative w-full md:w-40 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                        <Image src={order.car.image} alt={order.car.name} fill className="object-cover"/>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{order.car.name}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-lg border"><Car size={14}/> {order.car.type}</span>
                            <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-lg border"><UserCheck size={14}/> {order.car.passengers} Kursi</span>
                        </div>
                    </div>
                </div>

                {/* Grid Tanggal */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Mulai Sewa</p>
                        <div className="flex items-center gap-2 text-gray-800 font-bold text-sm md:text-base">
                            <Calendar size={18} className="text-blue-600"/>
                            {new Date(order.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Selesai Sewa</p>
                        <div className="flex items-center gap-2 text-gray-800 font-bold text-sm md:text-base">
                            <Clock size={18} className="text-red-500"/>
                            {new Date(order.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </div>
                </div>

                {/* Rincian Bayar */}
                <div className="space-y-3 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2">Rincian Pembayaran</h4>
                    
                    {/* Harga Dasar Mobil */}
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Sewa Mobil ({days} Hari)</span>
                        <span>{rp(order.totalPrice - (order.withDriver ? (150000 * days) : 0))}</span>
                    </div>

                    {/* Jika Pakai Supir */}
                    {order.withDriver && (
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Jasa Supir ({days} Hari)</span>
                            <span>{rp(150000 * days)}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
                        <span className="font-bold text-gray-900">Total Dibayar</span>
                        <span className="font-black text-blue-600 text-xl">{rp(order.totalPrice)}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-bold uppercase">Metode Bayar</span>
                        <span className="flex items-center gap-2 font-bold text-gray-700 bg-white px-3 py-1 rounded-lg border text-sm shadow-sm">
                            <CreditCard size={14}/> {order.paymentMethod}
                        </span>
                    </div>
                </div>

                {/* Tombol WA */}
                <a href={waLink} target="_blank" className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-500/30 flex items-center justify-center gap-2">
                    <Phone size={20}/> Hubungi Admin via WhatsApp
                </a>

            </div>
        </div>
      </div>
    </main>
  );
}