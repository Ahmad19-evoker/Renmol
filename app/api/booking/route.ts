import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Pastikan path ini benar
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    // 1. Cek User Login (Keamanan)
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil data yang dikirim dari Form Frontend
    const body = await request.json();
    const { carId, startDate, endDate, totalPrice } = body;

    // 3. Validasi Data Kosong
    if (!carId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // 4. Simpan ke Database (Sesuai Schema Baru)
    const newOrder = await prisma.order.create({
      data: {
        userId: session.user.id,     // Ambil ID dari session login
        carId: carId,                // ID Mobil
        startDate: new Date(startDate), // Konversi String ke Date (PENTING!)
        endDate: new Date(endDate),     // Konversi String ke Date (PENTING!)
        totalPrice: Number(totalPrice), // Pastikan jadi Angka
        status: "PENDING"            // Status awal
      },
    });

    return NextResponse.json({ success: true, order: newOrder });

  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Gagal membuat pesanan", details: error },
      { status: 500 }
    );
  }
}