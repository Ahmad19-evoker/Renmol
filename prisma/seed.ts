import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const cars = [
    {
      name: "Toyota Avanza",
      type: "MPV",
      price: 350000,
      passengers: 7,
      transmission: "Manual",
      fuel: "Bensin",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      description: "Mobil keluarga nyaman untuk perjalanan jauh."
    },
    {
      name: "Honda Brio",
      type: "City Car",
      price: 300000,
      passengers: 5,
      transmission: "Matic",
      fuel: "Bensin",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      description: "Lincah dan irit untuk keliling kota."
    },
    {
      name: "Mitsubishi Pajero",
      type: "SUV",
      price: 800000,
      passengers: 7,
      transmission: "Matic",
      fuel: "Solar",
      image: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=800&q=80",
      description: "Tangguh dan mewah di segala medan."
    }
  ]

  console.log('Mulai mengisi data...')

  for (const car of cars) {
    await prisma.car.create({
      data: car,
    })
  }

  console.log('Selesai mengisi data!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })