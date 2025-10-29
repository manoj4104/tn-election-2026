import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const tamilNaduConstituencies = [
  { name: 'Arakkonam', district: 'Ranipet' },
  { name: 'Arani', district: 'Tiruvannamalai' },
  { name: 'Aravakurichi', district: 'Karur' },
  { name: 'Aruppukkottai', district: 'Virudhunagar' },
  { name: 'Chennai Central', district: 'Chennai' },
  { name: 'Chennai North', district: 'Chennai' },
  { name: 'Chennai South', district: 'Chennai' },
  { name: 'Chidambaram', district: 'Cuddalore' },
  { name: 'Coimbatore', district: 'Coimbatore' },
  { name: 'Cuddalore', district: 'Cuddalore' },
  { name: 'Dharmapuri', district: 'Dharmapuri' },
  { name: 'Dindigul', district: 'Dindigul' },
  { name: 'Erode', district: 'Erode' },
  { name: 'Kallakurichi', district: 'Kallakurichi' },
  { name: 'Kancheepuram', district: 'Kanchipuram' },
  { name: 'Kanniyakumari', district: 'Kanniyakumari' },
  { name: 'Karur', district: 'Karur' },
  { name: 'Krishnagiri', district: 'Krishnagiri' },
  { name: 'Madurai', district: 'Madurai' },
  { name: 'Mayiladuthurai', district: 'Mayiladuthurai' },
  { name: 'Nagapattinam', district: 'Nagapattinam' },
  { name: 'Namakkal', district: 'Namakkal' },
  { name: 'Nilgiris', district: 'Nilgiris' },
  { name: 'Perambalur', district: 'Perambalur' },
  { name: 'Pollachi', district: 'Coimbatore' },
  { name: 'Ramanathapuram', district: 'Ramanathapuram' },
  { name: 'Salem', district: 'Salem' },
  { name: 'Sivaganga', district: 'Sivaganga' },
  { name: 'Sriperumbudur', district: 'Kanchipuram' },
  { name: 'Tenkasi', district: 'Tenkasi' },
  { name: 'Thanjavur', district: 'Thanjavur' },
  { name: 'Theni', district: 'Theni' },
  { name: 'Thoothukudi', district: 'Thoothukudi' },
  { name: 'Tiruchirappalli', district: 'Tiruchirappalli' },
  { name: 'Tirunelveli', district: 'Tirunelveli' },
  { name: 'Tiruppur', district: 'Tiruppur' },
  { name: 'Tiruvallur', district: 'Tiruvallur' },
  { name: 'Tiruvannamalai', district: 'Tiruvannamalai' },
  { name: 'Vellore', district: 'Vellore' },
  { name: 'Viluppuram', district: 'Viluppuram' },
]

async function seedConstituencies() {
  console.log('🌱 Seeding Tamil Nadu constituencies...')

  // Clear existing constituencies (optional - remove if you want to keep existing data)
  await prisma.constituency.deleteMany({})

  for (const constituency of tamilNaduConstituencies) {
    await prisma.constituency.create({
      data: constituency,
    })
  }

  const count = await prisma.constituency.count()
  console.log(`✅ Successfully seeded ${count} constituencies`)
}

seedConstituencies()
  .catch((e) => {
    console.error('❌ Error seeding constituencies:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
