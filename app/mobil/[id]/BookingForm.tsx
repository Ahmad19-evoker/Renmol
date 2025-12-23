"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, UserCheck, Wallet, CreditCard, CalendarX, AlertCircle } from "lucide-react";

interface BookingFormProps {
  car: {
    id: string;
    price: number;
  };
  userId: string;
}

export default function BookingForm({ car, userId }: BookingFormProps) {
  const router = useRouter();
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("BCA");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(0);

  const DRIVER_FEE = 150000;

  // 1. LOGIKA HITUNG HARGA
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      // Fix: Jika tanggal sama, hitung 1 hari
      if (diffDays === 0) diffDays = 1;

      if (diffDays > 0) {
        setDays(diffDays);
        const carCost = diffDays * car.price;
        const driverCost = withDriver ? (diffDays * DRIVER_FEE) : 0;
        setTotalPrice(carCost + driverCost);
      } else {
        setDays(0);
        setTotalPrice(0);
      }
    } else {
      setDays(0); // Reset jika tanggal dihapus
      setTotalPrice(0);
    }
  }, [startDate, endDate, withDriver, car.price]);

  // 2. LOGIKA VALIDASI (TRUE jika siap sewa)
  const isReadyToBook = startDate !== "" && endDate !== "" && days > 0;

  // 3. LOGIKA STYLE TOMBOL (Dipisah agar tidak error)
  const buttonStyle = isReadyToBook 
    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30 cursor-pointer hover:scale-[1.02]" // STYLE AKTIF (BIRU)
    : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"; // STYLE MATI (ABU)

  const handleBooking = async () => {
    if (!isReadyToBook) return; // Stop jika tidak valid
    
    if (!userId) {
      alert("Sesi Anda habis. Mohon Login ulang.");
      router.push("/login");
      return;
    }
    
    setLoading(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          carId: car.id,
          startDate,
          endDate,
          totalPrice,
          withDriver,
          paymentMethod
        }),
      });

      if (res.ok) {
        alert("🎉 Berhasil Booking!");
        router.push("/Dashboard"); 
        router.refresh();
      } else {
        const err = await res.json();
        alert("Gagal: " + (err.message || "Error server"));
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  const rp = (num: number) => new Intl.NumberFormat("id-ID").format(num);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-6">
      
      {/* HEADER HARGA */}
      <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-100">
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Biaya ({days > 0 ? days : "-"} Hari)</p>
          <p className="text-3xl font-black text-blue-600">Rp {rp(totalPrice || car.price)}</p>
        </div>
        <div className="text-right">
           <p className="text-xs text-gray-400">Harga Dasar</p>
           <p className="font-bold text-gray-700">Rp {rp(car.price)} <span className="text-xs font-normal">/hari</span></p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {/* INPUT TANGGAL */}
        <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl border transition-all ${!startDate ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}`}>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Mulai</p>
                <input 
                    type="date" 
                    className="w-full bg-transparent font-bold text-gray-800 outline-none text-sm cursor-pointer"
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className={`p-3 rounded-xl border transition-all ${!endDate ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}`}>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Selesai</p>
                <input 
                    type="date" 
                    className="w-full bg-transparent font-bold text-gray-800 outline-none text-sm cursor-pointer"
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </div>

        {/* OPSI SUPIR */}
        <div 
            onClick={() => setWithDriver(!withDriver)}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${withDriver ? "bg-blue-50 border-blue-500" : "bg-white border-gray-200 hover:border-blue-300"}`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${withDriver ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                    <UserCheck size={20}/>
                </div>
                <div>
                    <p className={`font-bold text-sm ${withDriver ? "text-blue-700" : "text-gray-700"}`}>Tambah Supir</p>
                    <p className="text-xs text-gray-500">+Rp {rp(DRIVER_FEE)} /hari</p>
                </div>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${withDriver ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}>
                {withDriver && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
        </div>

        {/* METODE BAYAR */}
        <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setPaymentMethod("BCA")} className={`p-3 rounded-xl border text-sm font-bold flex items-center gap-2 ${paymentMethod === "BCA" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}><CreditCard size={18}/> BCA</button>
            <button onClick={() => setPaymentMethod("GOPAY")} className={`p-3 rounded-xl border text-sm font-bold flex items-center gap-2 ${paymentMethod === "GOPAY" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}><Wallet size={18}/> GoPay</button>
        </div>
      </div>

      {/* TOMBOL AKSI FIX */}
      <button 
        onClick={handleBooking}
        disabled={!isReadyToBook || loading} // Matikan tombol secara sistem HTML
        className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${buttonStyle}`}
      >
        {loading ? <Loader2 className="animate-spin" size={20}/> : !isReadyToBook ? <CalendarX size={20}/> : <ShieldCheck size={20}/>}
        {loading ? "Memproses..." : !isReadyToBook ? "Pilih Tanggal Dulu" : "Bayar & Sewa Sekarang"}
      </button>

      {/* DEBUGGER: LIHAT INI UNTUK MENGETAHUI MASALAHNYA */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg text-[10px] text-gray-500 font-mono">
         <p className="font-bold border-b border-gray-300 mb-1 pb-1">DEBUG MONITOR</p>
         <p>Start Date: {startDate ? startDate : "❌ KOSONG"}</p>
         <p>End Date: {endDate ? endDate : "❌ KOSONG"}</p>
         <p>Durasi: {days} Hari</p>
         <p>Status Tombol: {isReadyToBook ? "🔵 AKTIF (BIRU)" : "⚪ MATI (ABU)"}</p>
      </div>
    </div>
  );
}