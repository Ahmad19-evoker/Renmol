"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, LayoutDashboard, Car, Clock, History, MessageCircle, 
  LogOut, Calendar, ChevronRight, ChevronLeft, Star, Settings, 
  Fuel, Users, Settings2, Loader2, AlertCircle, Wallet
} from "lucide-react";

// TIPE DATA (Types)
interface CarType {
  id: string;
  name: string;
  image: string;
  price: number;
  type: string;
  passengers: number;
  transmission: string;
  fuel: string;
}

interface OrderType {
  id: string;
  car: CarType;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string; // ACTIVE, PENDING, COMPLETED
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("beranda");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State Data (Default harus Array Kosong [])
  const [cars, setCars] = useState<CarType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Proteksi Halaman
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // FETCH DATA PESANAN (DIPERBAIKI)
  useEffect(() => {
    if (status === "authenticated") {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          const res = await fetch("/api/orders");
          
          // Cek apakah response sukses (status 200-299)
          if (!res.ok) {
            throw new Error("Gagal mengambil data");
          }

          const data = await res.json();
          
          // SAFETY CHECK: Pastikan data adalah Array sebelum disimpan
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            console.error("Data order bukan array:", data);
            setOrders([]); // Set kosong jika error agar tidak crash
          }

        } catch (err) {
          console.error("Gagal ambil order:", err);
          setOrders([]); // Set kosong jika terjadi error fetch
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [status]);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40}/></div>;

  // --- MENU ITEMS ---
  const menuItems = [
    { id: "beranda", label: "Beranda", icon: LayoutDashboard },
    { id: "sewa", label: "Sewa Mobil", icon: Car },
    { id: "pesanan", label: "Pesanan Aktif", icon: Clock },
    { id: "riwayat", label: "Riwayat", icon: History },
    { id: "profil", label: "Profil Saya", icon: User },
    { id: "chat", label: "Bantuan CS", icon: MessageCircle },
  ];

  // --- KOMPONEN KONTEN ---

  // 1. TAB BERANDA
  const TabBeranda = () => (
    <div className="space-y-6">
      <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-600/20">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Halo, {session?.user?.name}! 👋</h2>
          <p className="text-blue-100 mb-6 max-w-lg">Mau pergi kemana hari ini? Mobil impianmu sudah siap menunggu.</p>
          <button onClick={() => setActiveTab("sewa")} className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition shadow-lg inline-flex items-center gap-2">
            <Car size={20}/> Lihat Katalog Mobil
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </motion.div>

      <div>
        <h3 className="font-bold text-xl text-gray-800 mb-4">Promo Spesial</h3>
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white flex justify-between items-center relative overflow-hidden">
           <div className="relative z-10">
              <h4 className="text-2xl font-bold text-yellow-400">Diskon 20%</h4>
              <p className="text-gray-300">Untuk pengguna baru pertama kali sewa!</p>
           </div>
           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">🎉</div>
        </div>
      </div>
    </div>
  );

  // 2. TAB SEWA MOBIL
  const TabSewa = () => {
    const [loadingCars, setLoadingCars] = useState(true);

    useEffect(() => {
      if (cars.length === 0) {
        const fetchCars = async () => {
          try {
            const res = await fetch('/api/mobil');
            if(res.ok) {
                const data = await res.json();
                if(Array.isArray(data)) setCars(data);
            }
          } catch (error) { console.error("Err"); } finally { setLoadingCars(false); }
        };
        fetchCars();
      } else {
        setLoadingCars(false);
      }
    }, []);

    if (loadingCars) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-gray-400"/></div>;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
           <h2 className="text-2xl font-bold text-gray-800">Pilih Armada</h2>
           <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">{cars.length} Unit Tersedia</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <motion.div 
              key={car.id}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <Image src={car.image} alt={car.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">{car.type}</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{car.name}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                   <span className="flex items-center gap-1"><Users size={14}/> {car.passengers}</span>
                   <span className="flex items-center gap-1"><Settings2 size={14}/> {car.transmission}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="text-lg font-bold text-blue-600">Rp {car.price.toLocaleString('id-ID')}</p>
                  <Link href={`/mobil/${car.id}`} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition">Pilih</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

 // 3. TAB PESANAN AKTIF (UPDATE PEMBAYARAN)
  const TabPesanan = () => {
    // Safety check: pastikan orders adalah array
    const validOrders = Array.isArray(orders) ? orders : [];
    // Filter status ACTIVE atau PENDING
    const activeOrders = validOrders.filter(o => o.status === "ACTIVE" || o.status === "PENDING");

    if (loadingOrders) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-gray-400"/></div>;

    if (activeOrders.length === 0) return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400"><Car size={32}/></div>
         <h3 className="text-xl font-bold text-gray-900">Tidak ada pesanan aktif</h3>
         <p className="text-gray-500 mb-6">Anda belum menyewa mobil apapun saat ini.</p>
         <button onClick={() => setActiveTab("sewa")} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Mulai Sewa</button>
      </div>
    );

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Status Pemesanan</h2>
        {activeOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
             
             {/* Badge Status */}
             <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl font-bold text-xs animate-pulse ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
               {order.status === 'PENDING' ? 'BELUM BAYAR' : 'SEDANG BERJALAN'}
             </div>

             <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-xl relative overflow-hidden">
                   <Image src={order.car.image} alt="Car" fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                   <div>
                      <h3 className="text-2xl font-bold text-gray-900">{order.car.name}</h3>
                      <p className="text-gray-500 text-sm">Order ID: #{order.id.slice(-6).toUpperCase()}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-xl">
                         <p className="text-xs text-gray-400 font-bold uppercase mb-1">Mulai</p>
                         <div className="flex items-center gap-2 font-semibold text-sm">
                            <Calendar size={16} className="text-blue-600"/> 
                            {new Date(order.startDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                         </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl">
                         <p className="text-xs text-gray-400 font-bold uppercase mb-1">Selesai</p>
                         <div className="flex items-center gap-2 font-semibold text-sm">
                            <Clock size={16} className="text-red-500"/> 
                            {new Date(order.endDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                         </div>
                      </div>
                   </div>

                   {/* --- LOGIKA TOMBOL (UPDATE DISINI) --- */}
                   <div className="pt-4 border-t border-gray-100 flex gap-3">
                      {order.status === "PENDING" ? (
                          // 1. JIKA BELUM BAYAR -> TOMBOL BAYAR
                          <Link 
                              href={`/payment/${order.id}`} 
                              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition text-center shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                          >
                              <Wallet size={18}/> Bayar Sekarang
                          </Link>
                      ) : (
                          // 2. JIKA SUDAH BAYAR -> TOMBOL ADMIN & DETAIL
                          <>
                              <button 
                                  onClick={() => {
                                      const msg = `Halo, saya mau tanya soal pesanan ID: ${order.id} (${order.car.name})`;
                                      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, "_blank");
                                  }} 
                                  className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold text-sm hover:bg-green-600 transition"
                              >
                                  Hubungi Admin
                              </button>
                              
                              <Link 
                                  href={`/invoice/${order.id}`} 
                                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition text-center flex items-center justify-center"
                              >
                                  Detail
                              </Link>
                          </>
                      )}
                   </div>

                </div>
             </div>
          </div>
        ))}
      </div>
    );
  };

  // 4. TAB RIWAYAT (DATA ASLI)
  const TabRiwayat = () => {
     // Safety check: pastikan orders adalah array
     const validOrders = Array.isArray(orders) ? orders : [];
     const historyOrders = validOrders.filter(o => o.status === "COMPLETED" || o.status === "CANCELLED");

     return (
        <div className="space-y-6">
           <h2 className="text-2xl font-bold text-gray-800">Riwayat Perjalanan</h2>
           
           {historyOrders.length === 0 ? (
               <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center">
                  <p className="text-gray-500">Belum ada riwayat perjalanan yang selesai.</p>
               </div>
           ) : (
               <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                     <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                        <tr>
                           <th className="p-4 font-bold">Mobil</th>
                           <th className="p-4 font-bold hidden md:table-cell">Tanggal</th>
                           <th className="p-4 font-bold">Total</th>
                           <th className="p-4 font-bold">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {historyOrders.map((order) => (
                           <tr key={order.id} className="hover:bg-gray-50 transition">
                              <td className="p-4 font-bold text-gray-800">{order.car.name}</td>
                              <td className="p-4 text-gray-500 hidden md:table-cell">
                                {new Date(order.startDate).toLocaleDateString("id-ID")}
                              </td>
                              <td className="p-4 text-blue-600 font-bold">Rp {order.totalPrice.toLocaleString("id-ID")}</td>
                              <td className="p-4"><span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">{order.status}</span></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
           )}
        </div>
     );
  };

  // 5. TAB PROFIL
  const TabProfil = () => (
    <div className="max-w-xl">
       <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Diri</h2>
       <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-4xl font-bold">
             {session?.user?.name?.charAt(0) || "U"}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{session?.user?.name}</h3>
          <p className="text-gray-500">{session?.user?.email}</p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-bold">
             <Star size={16} fill="currentColor"/> Member Gold
          </div>
       </div>
    </div>
  );

  // 6. TAB CHAT
  const TabChat = () => (
    <div className="max-w-2xl mx-auto text-center pt-10">
       <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-lg">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <MessageCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Butuh Bantuan?</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
             Tim CS kami siap membantu Anda 24/7. Hubungi kami via WhatsApp untuk respon tercepat.
          </p>
          <button onClick={() => window.open("https://wa.me/6281234567890", "_blank")} className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow-lg shadow-green-500/30 flex items-center justify-center gap-3 w-full">
             <MessageCircle size={24} /> Chat WhatsApp Sekarang
          </button>
       </div>
    </div>
  );

  // --- LAYOUT UTAMA ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* SIDEBAR DINAMIS */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 88 }} 
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 z-40 relative group"
      >
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute -right-3 top-12 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 z-50 text-gray-500">
           {isSidebarOpen ? <ChevronLeft size={16}/> : <ChevronRight size={16}/>}
        </button>

        <div className={`p-8 flex items-center gap-2 ${isSidebarOpen ? "" : "justify-center px-4"}`}>
           <div className="w-10 h-10 min-w-[40px] bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white text-xl font-black">R</span>
           </div>
           <AnimatePresence>
             {isSidebarOpen && (
               <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap">
                 <span className="text-2xl font-black text-gray-900 tracking-tighter ml-2">RENMOL</span>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        <div className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
           {menuItems.map((item) => {
             const isActive = activeTab === item.id;
             return (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 title={!isSidebarOpen ? item.label : ""}
                 className={`relative w-full flex items-center px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 group ${isActive ? "text-white" : "text-gray-500 hover:text-gray-900"} ${isSidebarOpen ? "gap-4" : "justify-center"}`}
               >
                 {isActive && (
                   <motion.div layoutId="sidebar-active-bg" className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/30" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                 )}
                 <span className="relative z-10 flex items-center justify-center">
                    <item.icon size={22} className={isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
                 </span>
                 <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="relative z-10 overflow-hidden whitespace-nowrap">
                         {item.label}
                      </motion.span>
                    )}
                 </AnimatePresence>
                 {isActive && isSidebarOpen && (
                   <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} className="relative z-10 ml-auto">
                     <ChevronRight size={16} />
                   </motion.div>
                 )}
               </button>
             );
           })}
        </div>

        <div className="p-4 mt-auto border-t border-gray-100">
           <div className={`bg-gray-50 p-3 rounded-2xl border border-gray-100 flex items-center gap-3 mb-3 transition-all ${!isSidebarOpen ? "justify-center bg-transparent border-0" : ""}`}>
              <div className="w-10 h-10 min-w-[40px] bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                 {session?.user?.name?.charAt(0) || "U"}
              </div>
              {isSidebarOpen && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-gray-900 truncate">{session?.user?.name}</p>
                   <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
                </motion.div>
              )}
           </div>
           <button onClick={() => signOut({ callbackUrl: "/login" })} title={!isSidebarOpen ? "Keluar Aplikasi" : ""} className={`w-full flex items-center justify-center gap-2 text-red-500 font-bold text-sm py-3 hover:bg-red-50 rounded-xl transition-colors ${!isSidebarOpen ? "px-0" : ""}`}>
             <LogOut size={isSidebarOpen ? 18 : 22} /> {isSidebarOpen && <span>Keluar Aplikasi</span>}
           </button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "beranda" && <TabBeranda />}
            {activeTab === "sewa" && <TabSewa />}
            {activeTab === "pesanan" && <TabPesanan />}
            {activeTab === "riwayat" && <TabRiwayat />}
            {activeTab === "profil" && <TabProfil />}
            {activeTab === "chat" && <TabChat />}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}