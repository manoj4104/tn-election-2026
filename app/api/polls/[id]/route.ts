import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET specific poll with results
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const poll = await prisma.poll.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        options: {
          include: {
            Party: true,
          },
        },
        Constituency: true,
      },
    });

    if (!poll) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(poll);
  } catch (error) {
    console.error('Error fetching poll:', error);
    return NextResponse.json(
      { error: 'Failed to fetch poll' },
      { status: 500 }
    );
  }
}

// PUT update poll
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, endDate } = body;

    const poll = await prisma.poll.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        ...(status && { status }),
        ...(endDate && { endDate: new Date(endDate) }),
      },
      include: {
        options: {
          include: {
            Party: true,
          },
        },
      },
    });

    return NextResponse.json(poll);
  } catch (error) {
    console.error('Error updating poll:', error);
    return NextResponse.json(
      { error: 'Failed to update poll' },
      { status: 500 }
    );
  }
}

// DELETE poll
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.poll.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting poll:', error);
    return NextResponse.json(
      { error: 'Failed to delete poll' },
      { status: 500 }
    );
  }
}
