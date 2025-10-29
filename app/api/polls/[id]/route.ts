import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireApiKey } from '@/lib/auth';

// GET specific poll with results
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const poll = await prisma.poll.findUnique({
      where: {
        id: parseInt(id),
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = requireApiKey(request as any);
    if (unauthorized) return unauthorized;
    const { id } = await params;
    const body = await request.json();
    const { status, endDate } = body;

    const poll = await prisma.poll.update({
      where: {
        id: parseInt(id),
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = requireApiKey(request as any);
    if (unauthorized) return unauthorized;
    const { id } = await params;
    await prisma.poll.delete({
      where: {
        id: parseInt(id),
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
