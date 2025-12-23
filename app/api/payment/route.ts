import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    // Update status menjadi ACTIVE (Lunas)
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: "ACTIVE" },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ message: "Gagal memproses pembayaran" }, { status: 500 });
  }
}