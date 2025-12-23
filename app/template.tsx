// app/template.tsx
"use client"; // Wajib karena animasi berjalan di browser

import { motion } from "framer-motion";

// 1. Definisikan varian animasi (keadaan awal dan akhir)
const variants = {
  hidden: { opacity: 0, y: 20 }, // Awal: Buram dan sedikit di bawah
  enter: { opacity: 1, y: 0 },   // Akhir: Jelas dan di posisi normal
};

// 2. Komponen Template Pembungkus
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden" // Mulai dari keadaan 'hidden'
      animate="enter"  // Animasi menuju keadaan 'enter'
      transition={{ 
        type: "easeInOut", // Jenis gerakan yang halus
        duration: 0.4      // Durasi 0.4 detik (tidak terlalu cepat/lambat)
      }}
    >
      {children}
    </motion.div>
  );
}