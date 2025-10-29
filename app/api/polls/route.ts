import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireApiKey } from '@/lib/auth';

// GET polls (active by default, all if ?all=1 or ?status=all)
export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get('all');
    const status = req.nextUrl.searchParams.get('status');
    const where: any = {};

    if (!(all === '1' || status === 'all')) {
      where.status = 'active';
    }

    const polls = await prisma.poll.findMany({
      where,
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

    return NextResponse.json(polls || []);
  } catch (error) {
    console.error('Error fetching polls:', error);
    // Return empty array instead of error object to prevent frontend crash
    return NextResponse.json([]);
  }
}

// POST create new poll (admin only)
export async function POST(request: Request) {
  try {
    const unauthorized = requireApiKey(request as any);
    if (unauthorized) return unauthorized;

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

    if (!title || !question) {
      return NextResponse.json({ error: 'Title and question are required' }, { status: 400 });
    }
    if (!Array.isArray(options) || options.length < 2) {
      return NextResponse.json({ error: 'At least two options are required' }, { status: 400 });
    }

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
