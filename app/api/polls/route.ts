import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all active polls
export async function GET() {
  try {
    const polls = await prisma.poll.findMany({
      where: {
        status: 'active',
      },
      include: {
        options: {
          include: {
            Party: true,
          },
        },
        Constituency: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(polls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    return NextResponse.json(
      { error: 'Failed to fetch polls' },
      { status: 500 }
    );
  }
}

// POST create new poll
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      titleTamil,
      question,
      questionTamil,
      constituencyId,
      type,
      endDate,
      options,
    } = body;

    // Create poll with options
    const poll = await prisma.poll.create({
      data: {
        title,
        titleTamil,
        question,
        questionTamil,
        constituencyId: constituencyId ? parseInt(constituencyId) : null,
        type: type || 'prediction',
        endDate: endDate ? new Date(endDate) : null,
        options: {
          create: options.map((option: any) => ({
            text: option.text,
            textTamil: option.textTamil,
            partyId: option.partyId ? parseInt(option.partyId) : null,
          })),
        },
      },
      include: {
        options: {
          include: {
            Party: true,
          },
        },
      },
    });

    return NextResponse.json(poll, { status: 201 });
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    );
  }
}
