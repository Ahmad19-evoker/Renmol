import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    // 1. Cek apakah email sudah dipakai
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar!" }, { status: 400 });
    }

    // 2. Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Simpan user baru
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Berhasil mendaftar!" });
  } catch (error) {
    return NextResponse.json({ message: "Error server" }, { status: 500 });
  }
}