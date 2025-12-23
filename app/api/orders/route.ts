import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Cek apakah user login DAN punya ID
  // @ts-ignore
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized: User ID not found" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        // @ts-ignore
        userId: session.user.id, // Sekarang ID ini sudah ada isinya
      },
      include: {
        car: true, // Ambil data detail mobilnya juga
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data pesanan" }, { status: 500 });
  }
}