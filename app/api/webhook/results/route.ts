/**
 * Webhook API Endpoint for Election Result Updates
 * Receives push notifications from ECI or other sources
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface WebhookPayload {
  source: 'ECI' | 'MANUAL' | 'NEWS_API';
  timestamp: string;
  signature?: string; // For webhook verification
  data: {
    constituencyId: string;
    constituencyName?: string;
    candidates: {
      name: string;
      partyCode: string;
      votes: number;
      status: 'LEADING' | 'TRAILING' | 'WON';
    }[];
    roundsCompleted?: number;
    totalRounds?: number;
  };
}

// Secret key for webhook verification (set in environment variables)
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-secret-key-here';

export async function POST(request: NextRequest) {
  try {
    console.log('[Webhook] Received election result update');
    
    // Parse payload
    const payload: WebhookPayload = await request.json();

    // Verify webhook signature
    const signature = request.headers.get('x-webhook-signature');
    if (!verifySignature(signature, JSON.stringify(payload))) {
      console.error('[Webhook] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Validate payload
    if (!payload.data?.constituencyId || !payload.data?.candidates) {
      console.error('[Webhook] Invalid payload format');
      return NextResponse.json(
        { error: 'Invalid payload format' },
        { status: 400 }
      );
    }

    // Process the update
    const result = await processResultUpdate(payload);

    console.log(`[Webhook] Successfully processed update for ${payload.data.constituencyId}`);
    
    return NextResponse.json({
      success: true,
      message: 'Result update processed successfully',
      constituencyId: payload.data.constituencyId,
      updatedCandidates: result.updatedCount,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[Webhook] Error processing update:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process result update',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Process election result update
 */
async function processResultUpdate(payload: WebhookPayload) {
  const { constituencyId, candidates } = payload.data;

  let updatedCount = 0;

  // Find constituency by code
  const constituency = await prisma.constituency.findFirst({
    where: { code: constituencyId },
  });

  if (!constituency) {
    console.error(`[Webhook] Constituency not found: ${constituencyId}`);
    return { updatedCount: 0 };
  }

  // Update each candidate's result
  for (const candidateData of candidates) {
    try {
      // Find the candidate
      const candidate = await prisma.candidate.findFirst({
        where: {
          constituencyId: constituency.id,
          Party: {
            abbreviation: candidateData.partyCode,
          },
        },
        include: {
          Party: true,
        },
      });

      if (!candidate) {
        console.warn(`[Webhook] Candidate not found: ${candidateData.name} (${candidateData.partyCode})`);
        continue;
      }

      // Find existing result or create new
      const existingResult = await prisma.result.findFirst({
        where: {
          candidateId: candidate.id,
          constituencyId: constituency.id,
        },
      });

      if (existingResult) {
        // Update existing result
        await prisma.result.update({
          where: { id: existingResult.id },
          data: {
            votes: candidateData.votes,
            leading: candidateData.status === 'LEADING',
            won: candidateData.status === 'WON',
            updatedAt: new Date(),
          },
        });
      } else {
        // Create new result
        await prisma.result.create({
          data: {
            candidateId: candidate.id,
            constituencyId: constituency.id,
            partyId: candidate.partyId,
            votes: candidateData.votes,
            leading: candidateData.status === 'LEADING',
            won: candidateData.status === 'WON',
          },
        });
      }

      updatedCount++;
    } catch (error) {
      console.error(`[Webhook] Failed to update candidate ${candidateData.name}:`, error);
    }
  }

  return { updatedCount };
}

/**
 * Calculate vote percentages for all candidates in a constituency (removed - not in schema)
 */
async function calculateVotePercentages(constituencyCode: string) {
  // This function is not needed as votePercentage is not in the Result model
  // Percentages can be calculated on the fly in the frontend
  console.log(`[Webhook] Vote percentages for ${constituencyCode} will be calculated client-side`);
}

/**
 * Verify webhook signature for security
 */
function verifySignature(signature: string | null, payload: string): boolean {
  if (!signature) {
    // In development, allow requests without signature
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Webhook] Signature verification skipped in development mode');
      return true;
    }
    return false;
  }

  // Implement HMAC signature verification
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  return signature === expectedSignature;
}

// GET endpoint to check webhook status
export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/webhook/results',
    accepts: 'POST',
    authentication: 'HMAC SHA256 signature in x-webhook-signature header',
    timestamp: new Date().toISOString(),
  });
}
