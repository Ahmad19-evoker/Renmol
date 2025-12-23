import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, carId, startDate, endDate, totalPrice, withDriver, paymentMethod } = body;

    if (!userId || !carId || !startDate || !endDate) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    // Buat Pesanan Baru (Hanya boleh ada SATU 'const newOrder' di sini)
    const newOrder = await prisma.order.create({
      data: {
        userId,
        carId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
        withDriver: withDriver || false,
        paymentMethod: paymentMethod || "CASH",
        status: "PENDING" // Status awal PENDING (Belum Bayar)
      },
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal membuat pesanan" }, { status: 500 });
  }
}