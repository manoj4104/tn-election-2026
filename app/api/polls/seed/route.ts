import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// One-time seed endpoint for creating demo polls in prod
// Protection: requires ?key=SEED_SECRET or allowed in development
export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const key = url.searchParams.get('key')
    const allowed = process.env.NODE_ENV !== 'production' || (process.env.SEED_SECRET && key === process.env.SEED_SECRET)

    if (!allowed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // If polls already exist, return them
    const existing = await prisma.poll.findMany({ include: { options: true, Constituency: true } })
    if (existing.length > 0) {
      return NextResponse.json({ status: 'exists', count: existing.length, polls: existing })
    }

    // Ensure some base data exists
    const dmk = await prisma.party.upsert({
      where: { id: -1 }, // force create using create
      update: {},
      create: {
        name: 'Dravida Munnetra Kazhagam',
        abbreviation: 'DMK',
        color: '#dc2626',
        logoUrl: '/images/parties/dmk.png',
      },
    })

    const aiadmk = await prisma.party.create({
      data: {
        name: 'All India Anna Dravida Munnetra Kazhagam',
        abbreviation: 'AIADMK',
        color: '#16a34a',
        logoUrl: '/images/parties/aiadmk.png',
      },
    })

    const bjp = await prisma.party.create({
      data: {
        name: 'Bharatiya Janata Party',
        abbreviation: 'BJP',
        color: '#f97316',
        logoUrl: '/images/parties/bjp.png',
      },
    })

    const chennaiCentral = await prisma.constituency.create({
      data: { name: 'Chennai Central', state: 'Tamil Nadu', code: 'TN001' },
    })

    // Create demo polls
    const poll1 = await prisma.poll.create({
      data: {
        title: 'Who will win Tamil Nadu 2026?',
        titleTamil: '2026 தமிழ்நாடு தேர்தலில் யார் வெல்வார்கள்?',
        question: 'Which alliance will form the government?',
        questionTamil: 'எந்த கூட்டணி அரசு அமைக்கும்?',
        type: 'prediction',
        status: 'active',
        options: {
          create: [
            { text: 'DMK Alliance', textTamil: 'திமுக கூட்டணி', partyId: dmk.id },
            { text: 'AIADMK Alliance', textTamil: 'அதிமுக கூட்டணி', partyId: aiadmk.id },
            { text: 'BJP Alliance', textTamil: 'பாஜக கூட்டணி', partyId: bjp.id },
            { text: 'Third Front', textTamil: 'மூன்றாவது முன்னணி' },
          ],
        },
      },
      include: { options: true },
    })

    const poll2 = await prisma.poll.create({
      data: {
        title: 'Who will win Chennai Central?',
        titleTamil: 'சென்னை மத்தியத்தில் யார் வெல்வார்கள்?',
        question: 'Which party will win this constituency?',
        questionTamil: 'இந்த தொகுதியில் எந்தக் கட்சி வெல்லும்?',
        type: 'prediction',
        status: 'active',
        constituencyId: chennaiCentral.id,
        options: {
          create: [
            { text: 'DMK Candidate', textTamil: 'திமுக வேட்பாளர்', partyId: dmk.id },
            { text: 'AIADMK Candidate', textTamil: 'அதிமுக வேட்பாளர்', partyId: aiadmk.id },
            { text: 'BJP Candidate', textTamil: 'பாஜக வேட்பாளர்', partyId: bjp.id },
            { text: 'Independent/Other', textTamil: 'சுயேச்சை/பிற' },
          ],
        },
      },
      include: { options: true },
    })

    return NextResponse.json({ status: 'seeded', polls: [poll1, poll2] })
  } catch (error) {
    console.error('Error seeding polls:', error)
    return NextResponse.json({ error: 'Failed to seed polls' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  // convenience: allow GET to trigger POST logic (idempotent enough)
  return POST(req)
}
