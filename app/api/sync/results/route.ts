/**
 * API Endpoint to trigger election data sync
 * POST /api/sync/results - Trigger immediate sync
 * GET /api/sync/results - Get last sync status
 */

import { NextRequest, NextResponse } from 'next/server';
import { electionDataSyncService } from '@/lib/sync-service';

// POST - Trigger immediate sync
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    
    const options = {
      source: (body.source as 'API' | 'SCRAPER' | 'AUTO') || 'AUTO',
      constituencyIds: body.constituencyIds as string[] | undefined,
    };

    console.log('[Sync API] Triggering manual sync...', options);

    const result = await electionDataSyncService.syncNow(options);

    return NextResponse.json({
      success: result.success,
      message: result.success 
        ? `Successfully updated ${result.constituenciesUpdated} constituencies`
        : 'Sync failed',
      result,
    });

  } catch (error) {
    console.error('[Sync API] Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to trigger sync',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET - Get last sync status
export async function GET() {
  const lastSync = electionDataSyncService.getLastSyncResult();
  const isSyncing = electionDataSyncService.isSyncInProgress();

  return NextResponse.json({
    isSyncing,
    lastSync: lastSync || {
      message: 'No sync has been performed yet',
    },
    timestamp: new Date().toISOString(),
  });
}
