import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireApiKey } from '@/lib/auth'

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

export async function POST(request: NextRequest) {
  // Require API key for seeding
  const authError = requireApiKey(request)
  if (authError) return authError

  try {
    // Check if constituencies already exist
    const existingCount = await prisma.constituency.count()
    
    if (existingCount > 0) {
      return NextResponse.json(
        { 
          ok: false, 
          error: `Database already has ${existingCount} constituencies. Delete them first if you want to reseed.`,
          existing: existingCount 
        },
        { status: 400 }
      )
    }

    // Create all constituencies
    const created = await prisma.constituency.createMany({
      data: tamilNaduConstituencies,
      skipDuplicates: true,
    })

    return NextResponse.json({
      ok: true,
      message: `Successfully created ${created.count} Tamil Nadu constituencies`,
      count: created.count,
    })
  } catch (error: any) {
    console.error('Error seeding constituencies:', error)
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}
