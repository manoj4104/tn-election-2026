import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

// POST submit vote
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { optionId, sessionId } = body;

    if (!optionId || !sessionId) {
      return NextResponse.json(
        { error: 'Option ID and session ID are required' },
        { status: 400 }
      );
    }

    const pollId = parseInt(id);

    // Check if poll exists and is active
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
    });

    if (!poll) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      );
    }

    if (poll.status !== 'active') {
      return NextResponse.json(
        { error: 'Poll is closed' },
        { status: 400 }
      );
    }

    // Check if user already voted
    const existingVote = await prisma.pollVote.findUnique({
      where: {
        pollId_voterSession: {
          pollId,
          voterSession: sessionId,
        },
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: 'You have already voted in this poll' },
        { status: 400 }
      );
    }

    // Get IP address from request headers
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const voterIp = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // Create vote and update counts in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create vote
      const vote = await tx.pollVote.create({
        data: {
          pollId,
          optionId: parseInt(optionId),
          voterSession: sessionId,
          voterIp,
        },
      });

      // Increment vote count for option
      await tx.pollOption.update({
        where: { id: parseInt(optionId) },
        data: {
          voteCount: { increment: 1 },
        },
      });

      // Increment total votes for poll
      await tx.poll.update({
        where: { id: pollId },
        data: {
          totalVotes: { increment: 1 },
        },
      });

      // Update percentages for all options
      const pollWithOptions = await tx.poll.findUnique({
        where: { id: pollId },
        include: { options: true },
      });

      if (pollWithOptions) {
        const totalVotes = pollWithOptions.totalVotes;
        for (const option of pollWithOptions.options) {
          const percentage = totalVotes > 0 
            ? (option.voteCount / totalVotes) * 100 
            : 0;
          await tx.pollOption.update({
            where: { id: option.id },
            data: { percentage },
          });
        }
      }

      return vote;
    });

    return NextResponse.json({ success: true, vote: result });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    );
  }
}
