"use client";

import { useState, use } from "react"; // 1. Tambah import 'use'
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, Copy, CheckCircle, Loader2, ArrowLeft } from "lucide-react";

// 2. Ubah tipe data params menjadi Promise
export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // 3. BUKA BUNGKUS PARAMS DULU (Wajib di Next.js 15)
  const { id } = use(params); 

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("BCA"); 

  const vaNumber = method === "BCA" ? "880123456789" : "081234567890";

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulasi delay
    setTimeout(async () => {
      try {
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: id }), // Gunakan 'id' yang sudah dibuka
        });

        if (res.ok) {
          alert("🎉 Pembayaran Berhasil! Pesanan Anda kini Aktif.");
          router.push("/Dashboard"); 
        }
      } catch (err) {
        alert("Gagal memproses pembayaran");
      } finally {
        setLoading(false);
      }
    }, 2000); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white text-center relative">
            <button onClick={() => router.back()} className="absolute left-6 top-6 hover:bg-white/20 p-2 rounded-full transition">
                <ArrowLeft size={20}/>
            </button>
            <h1 className="text-xl font-bold mb-1">Gateway Pembayaran</h1>
            {/* Gunakan variable 'id' di sini */}
            <p className="text-blue-100 text-sm">Order ID: #{id.slice(0, 8)}</p>
        </div>

        <div className="p-6 space-y-6">
            
            {/* Pilihan Metode */}
            <div>
                <p className="text-sm font-bold text-gray-500 mb-3">Pilih Metode Pembayaran</p>
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setMethod("BCA")}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition ${method === "BCA" ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                        <CreditCard size={24}/>
                        <span className="font-bold text-sm">Transfer BCA</span>
                    </button>
                    <button 
                        onClick={() => setMethod("GOPAY")}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition ${method === "GOPAY" ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                        <Wallet size={24}/>
                        <span className="font-bold text-sm">GoPay / QRIS</span>
                    </button>
                </div>
            </div>

            {/* Detail Transfer */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500 uppercase font-bold mb-2">
                    {method === "BCA" ? "Nomor Virtual Account" : "Nomor E-Wallet"}
                </p>
                <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl font-black text-gray-800 tracking-wider">{vaNumber}</span>
                    <button className="text-blue-500 hover:text-blue-700" title="Salin">
                        <Copy size={18}/>
                    </button>
                </div>
                <p className="text-xs text-gray-400">Otomatis dicek dalam 10 menit</p>
            </div>

            {/* Total Bayar Dummy */}
            <div className="flex justify-between items-center py-4 border-t border-b border-gray-100">
                <span className="text-gray-600">Total Tagihan</span>
                <span className="font-bold text-xl text-gray-900">Rp 450.000</span>
            </div>

            {/* Tombol Bayar */}
            <button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin"/> : <CheckCircle size={20}/>}
                {loading ? "Memproses Pembayaran..." : "Saya Sudah Bayar"}
            </button>
            
            <p className="text-center text-xs text-gray-400">
                Klik tombol di atas setelah melakukan transfer.
            </p>

        </div>
      </div>
    </div>
  );
}