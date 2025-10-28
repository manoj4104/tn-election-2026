/**
 * Election Data Sync Service
 * Background job system for periodic updates and real-time synchronization
 */

import { eciDataFetcher } from './eci-fetcher';
import { eciResultsScraper } from './eci-scraper';
import { prisma } from './prisma';

interface SyncOptions {
  source: 'API' | 'SCRAPER' | 'AUTO';
  interval?: number; // in milliseconds
  constituencyIds?: string[]; // Sync specific constituencies only
}

interface SyncResult {
  success: boolean;
  source: 'API' | 'SCRAPER';
  constituenciesUpdated: number;
  candidatesUpdated: number;
  errors: string[];
  timestamp: string;
}

export class ElectionDataSyncService {
  private syncInterval: NodeJS.Timeout | null = null;
  private isSyncing: boolean = false;
  private lastSyncResult: SyncResult | null = null;

  /**
   * Start periodic sync
   */
  startPeriodicSync(options: SyncOptions = { source: 'AUTO', interval: 300000 }) {
    const interval = options.interval || 300000; // Default: 5 minutes

    console.log(`[Sync Service] Starting periodic sync every ${interval / 1000} seconds`);

    // Clear existing interval
    this.stopPeriodicSync();

    // Run initial sync
    this.syncNow(options);

    // Schedule periodic sync
    this.syncInterval = setInterval(() => {
      this.syncNow(options);
    }, interval);
  }

  /**
   * Stop periodic sync
   */
  stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('[Sync Service] Stopped periodic sync');
    }
  }

  /**
   * Trigger immediate sync
   */
  async syncNow(options: SyncOptions = { source: 'AUTO' }): Promise<SyncResult> {
    if (this.isSyncing) {
      console.log('[Sync Service] Sync already in progress, skipping...');
      return this.lastSyncResult || this.createErrorResult('Sync already in progress');
    }

    this.isSyncing = true;
    console.log(`[Sync Service] Starting sync with source: ${options.source}`);

    try {
      let result: SyncResult;

      if (options.source === 'API' || options.source === 'AUTO') {
        // Try API first
        result = await this.syncFromAPI(options.constituencyIds);
        
        // If API fails and AUTO mode, fallback to scraper
        if (!result.success && options.source === 'AUTO') {
          console.log('[Sync Service] API failed, falling back to scraper...');
          result = await this.syncFromScraper(options.constituencyIds);
        }
      } else {
        // Use scraper
        result = await this.syncFromScraper(options.constituencyIds);
      }

      this.lastSyncResult = result;
      return result;

    } catch (error) {
      console.error('[Sync Service] Sync failed:', error);
      const errorResult = this.createErrorResult(
        error instanceof Error ? error.message : 'Unknown error'
      );
      this.lastSyncResult = errorResult;
      return errorResult;

    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Sync from ECI API
   */
  private async syncFromAPI(constituencyIds?: string[]): Promise<SyncResult> {
    const result: SyncResult = {
      success: false,
      source: 'API',
      constituenciesUpdated: 0,
      candidatesUpdated: 0,
      errors: [],
      timestamp: new Date().toISOString(),
    };

    try {
      const apiData = await eciDataFetcher.fetchLiveResults();
      
      if (!apiData) {
        result.errors.push('Failed to fetch data from ECI API');
        return result;
      }

      // Filter constituencies if specified
      let constituencies = apiData.constituencies;
      if (constituencyIds && constituencyIds.length > 0) {
        constituencies = constituencies.filter(c =>
          constituencyIds.includes(c.constituencyId)
        );
      }

      // Update each constituency
      for (const constituency of constituencies) {
        try {
          const updated = await this.updateConstituencyResults(
            constituency.constituencyId,
            constituency.candidates.map(c => ({
              name: c.name,
              partyCode: c.partyCode,
              votes: c.votes,
              status: c.status,
            }))
          );

          if (updated.success) {
            result.constituenciesUpdated++;
            result.candidatesUpdated += updated.candidatesUpdated;
          } else {
            result.errors.push(`Failed to update ${constituency.constituencyName}`);
          }
        } catch (error) {
          result.errors.push(`Error updating ${constituency.constituencyName}: ${error}`);
        }
      }

      result.success = result.constituenciesUpdated > 0;
      console.log(`[Sync Service] API sync completed: ${result.constituenciesUpdated} constituencies, ${result.candidatesUpdated} candidates`);

    } catch (error) {
      result.errors.push(`API sync error: ${error}`);
    }

    return result;
  }

  /**
   * Sync from web scraper
   */
  private async syncFromScraper(constituencyIds?: string[]): Promise<SyncResult> {
    const result: SyncResult = {
      success: false,
      source: 'SCRAPER',
      constituenciesUpdated: 0,
      candidatesUpdated: 0,
      errors: [],
      timestamp: new Date().toISOString(),
    };

    try {
      const scrapedData = await eciResultsScraper.scrapeAllResults();
      
      if (!scrapedData || scrapedData.length === 0) {
        result.errors.push('No data scraped from ECI portal');
        return result;
      }

      // Filter constituencies if specified
      let constituencies = scrapedData;
      if (constituencyIds && constituencyIds.length > 0) {
        constituencies = constituencies.filter(c =>
          constituencyIds.includes(c.constituencyCode)
        );
      }

      // Update each constituency
      for (const constituency of constituencies) {
        try {
          const updated = await this.updateConstituencyResults(
            constituency.constituencyCode,
            constituency.candidates
          );

          if (updated.success) {
            result.constituenciesUpdated++;
            result.candidatesUpdated += updated.candidatesUpdated;
          } else {
            result.errors.push(`Failed to update ${constituency.constituencyName}`);
          }
        } catch (error) {
          result.errors.push(`Error updating ${constituency.constituencyName}: ${error}`);
        }
      }

      result.success = result.constituenciesUpdated > 0;
      console.log(`[Sync Service] Scraper sync completed: ${result.constituenciesUpdated} constituencies, ${result.candidatesUpdated} candidates`);

    } catch (error) {
      result.errors.push(`Scraper sync error: ${error}`);
    }

    return result;
  }

  /**
   * Update results for a single constituency
   */
  private async updateConstituencyResults(
    constituencyCode: string,
    candidates: Array<{
      name: string;
      partyCode: string;
      votes: number;
      status: 'LEADING' | 'TRAILING' | 'WON';
    }>
  ): Promise<{ success: boolean; candidatesUpdated: number }> {
    try {
      // Find constituency
      const constituency = await prisma.constituency.findFirst({
        where: { code: constituencyCode },
      });

      if (!constituency) {
        console.warn(`[Sync Service] Constituency not found: ${constituencyCode}`);
        return { success: false, candidatesUpdated: 0 };
      }

      let candidatesUpdated = 0;

      // Update each candidate's result
      for (const candidateData of candidates) {
        try {
          // Find candidate by party
          const candidate = await prisma.candidate.findFirst({
            where: {
              constituencyId: constituency.id,
              Party: {
                abbreviation: candidateData.partyCode,
              },
            },
          });

          if (!candidate) {
            console.warn(`[Sync Service] Candidate not found: ${candidateData.name} (${candidateData.partyCode})`);
            continue;
          }

          // Check for existing result
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

          candidatesUpdated++;
        } catch (error) {
          console.error(`[Sync Service] Failed to update candidate ${candidateData.name}:`, error);
        }
      }

      return { success: candidatesUpdated > 0, candidatesUpdated };

    } catch (error) {
      console.error(`[Sync Service] Failed to update constituency ${constituencyCode}:`, error);
      return { success: false, candidatesUpdated: 0 };
    }
  }

  /**
   * Get last sync status
   */
  getLastSyncResult(): SyncResult | null {
    return this.lastSyncResult;
  }

  /**
   * Check if sync is currently running
   */
  isSyncInProgress(): boolean {
    return this.isSyncing;
  }

  /**
   * Create error result
   */
  private createErrorResult(error: string): SyncResult {
    return {
      success: false,
      source: 'API',
      constituenciesUpdated: 0,
      candidatesUpdated: 0,
      errors: [error],
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const electionDataSyncService = new ElectionDataSyncService();
