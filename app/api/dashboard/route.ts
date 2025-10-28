/**
 * Dashboard API - Get election summary and results
 * GET /api/dashboard
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all results with related data
    const results = await prisma.result.findMany({
      include: {
        Candidate: {
          include: {
            Party: true,
            Constituency: true,
          },
        },
        Party: true,
        Constituency: true,
      },
    });

    // Fetch all parties
    const parties = await prisma.party.findMany();

    // Fetch all constituencies
    const constituencies = await prisma.constituency.findMany({
      include: {
        results: {
          include: {
            Candidate: {
              include: {
                Party: true,
              },
            },
          },
        },
      },
    });

    // Calculate summary statistics
    const totalSeats = constituencies.length;
    
    // Count seats won by each party
    const partySeats: { [key: string]: { won: number; leading: number; name: string; color: string } } = {};
    
    parties.forEach(party => {
      partySeats[party.id] = {
        won: 0,
        leading: 0,
        name: party.name,
        color: party.color || '#666666',
      };
    });

    // Count results
    constituencies.forEach(constituency => {
      const constituencyResults = constituency.results || [];
      
      // Find winner or leading candidate
      const winner = constituencyResults.find(r => r.won);
      const leader = constituencyResults.sort((a, b) => b.votes - a.votes)[0];

      if (winner && winner.partyId) {
        if (partySeats[winner.partyId]) {
          partySeats[winner.partyId].won++;
        }
      } else if (leader && leader.partyId) {
        if (partySeats[leader.partyId]) {
          partySeats[leader.partyId].leading++;
        }
      }
    });

    // Calculate total votes for percentages
    const totalVotes = results.reduce((sum, r) => sum + r.votes, 0);

    // Format alliance data
    const alliances = Object.entries(partySeats).map(([id, data]) => {
      const partyVotes = results
        .filter(r => r.partyId === parseInt(id))
        .reduce((sum, r) => sum + r.votes, 0);
      
      const votesPct = totalVotes > 0 ? Math.round((partyVotes / totalVotes) * 100) : 0;

      return {
        id,
        name: data.name,
        seats: data.won + data.leading,
        won: data.won,
        leading: data.leading,
        color: data.color,
        votesPct,
      };
    }).filter(a => a.seats > 0).sort((a, b) => b.seats - a.seats);

    // Format constituency data
    const constituencyData = constituencies.map(constituency => {
      const constituencyResults = constituency.results || [];
      
      // Sort by votes
      const sortedResults = [...constituencyResults].sort((a, b) => b.votes - a.votes);
      const leader = sortedResults[0];
      
      const totalConstituencyVotes = constituencyResults.reduce((sum, r) => sum + r.votes, 0);
      const leadPct = totalConstituencyVotes > 0 && leader
        ? Math.round((leader.votes / totalConstituencyVotes) * 100)
        : 0;

      return {
        id: constituency.id.toString(),
        code: constituency.code || '',
        name: constituency.name,
        state: constituency.state,
        leading: leader?.Candidate?.Party?.name || 'TBD',
        leadingPartyId: leader?.partyId || null,
        leadingCandidate: leader?.Candidate ? {
          name: leader.Candidate.name,
          party: leader.Candidate.Party?.name || '',
          votes: leader.votes,
        } : null,
        leadPct,
        totalVotes: totalConstituencyVotes,
        results: sortedResults.slice(0, 5).map(r => ({
          candidate: r.Candidate?.name || '',
          party: r.Candidate?.Party?.name || '',
          votes: r.votes,
          won: r.won,
          leading: r.leading,
        })),
      };
    });

    // Generate highlights
    const highlights = [];
    if (alliances.length > 0) {
      highlights.push(`${alliances[0].name} leads with ${alliances[0].seats} seats`);
    }
    if (constituencyData.length > 0) {
      const declared = constituencyData.filter(c => c.results.some(r => r.won)).length;
      highlights.push(`${declared} of ${totalSeats} results declared`);
    }
    highlights.push(`Total votes counted: ${totalVotes.toLocaleString()}`);

    return NextResponse.json({
      success: true,
      summary: {
        totalSeats,
        alliances,
        highlights,
        lastUpdated: new Date().toISOString(),
      },
      constituencies: constituencyData,
      parties: parties.map(p => ({
        id: p.id,
        name: p.name,
        abbreviation: p.abbreviation,
        color: p.color,
        logoUrl: p.logoUrl,
      })),
    });

  } catch (error) {
    console.error('[Dashboard API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dashboard data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
