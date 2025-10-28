/**
 * ECI (Election Commission of India) Data Fetcher
 * Fetches live election results from ECI API during counting day
 */

interface ECIConstituencyResult {
  constituencyId: string;
  constituencyName: string;
  constituencyNameTamil: string;
  candidates: {
    name: string;
    nameTamil: string;
    partyCode: string;
    partyName: string;
    votes: number;
    status: 'LEADING' | 'TRAILING' | 'WON';
  }[];
  totalVotes: number;
  totalPolled: number;
  turnoutPercentage: number;
  roundsCompleted: number;
  totalRounds: number;
  lastUpdated: string;
}

interface ECIResponse {
  state: string;
  stateCode: string;
  lastUpdated: string;
  constituencies: ECIConstituencyResult[];
  summary: {
    totalSeats: number;
    resultsDeclared: number;
    resultsAwaited: number;
    partyWiseSeats: {
      [partyCode: string]: {
        won: number;
        leading: number;
        total: number;
      };
    };
  };
}

export class ECIDataFetcher {
  private readonly baseUrl: string;
  private readonly stateCode: string = 'S22'; // Tamil Nadu state code
  private readonly retryAttempts: number = 3;
  private readonly retryDelay: number = 5000; // 5 seconds

  constructor(baseUrl: string = 'https://results.eci.gov.in/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch live results from ECI API
   */
  async fetchLiveResults(): Promise<ECIResponse | null> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        console.log(`[ECI Fetcher] Attempt ${attempt}/${this.retryAttempts}`);
        
        const response = await fetch(
          `${this.baseUrl}/state/${this.stateCode}/live-results`,
          {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'DailyThanthi-ElectionMonitor/1.0',
            },
            next: { revalidate: 60 }, // Cache for 1 minute
          }
        );

        if (!response.ok) {
          throw new Error(`ECI API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`[ECI Fetcher] Successfully fetched ${data.constituencies?.length || 0} constituencies`);
        
        return this.validateAndTransform(data);
      } catch (error) {
        lastError = error as Error;
        console.error(`[ECI Fetcher] Attempt ${attempt} failed:`, error);
        
        if (attempt < this.retryAttempts) {
          await this.sleep(this.retryDelay);
        }
      }
    }

    console.error('[ECI Fetcher] All retry attempts failed:', lastError);
    return null;
  }

  /**
   * Fetch results for a specific constituency
   */
  async fetchConstituencyResult(constituencyId: string): Promise<ECIConstituencyResult | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/state/${this.stateCode}/constituency/${constituencyId}`,
        {
          headers: {
            'Accept': 'application/json',
          },
          next: { revalidate: 30 }, // Cache for 30 seconds
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch constituency ${constituencyId}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`[ECI Fetcher] Failed to fetch constituency ${constituencyId}:`, error);
      return null;
    }
  }

  /**
   * Validate and transform ECI data to match our schema
   */
  private validateAndTransform(data: any): ECIResponse {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid ECI response format');
    }

    // Transform to our internal format
    return {
      state: data.stateName || 'Tamil Nadu',
      stateCode: data.stateCode || this.stateCode,
      lastUpdated: data.lastUpdated || new Date().toISOString(),
      constituencies: (data.constituencies || []).map((c: any) => ({
        constituencyId: c.id || c.constituencyId,
        constituencyName: c.name || c.constituencyName,
        constituencyNameTamil: c.nameTamil || c.tamilName || '',
        candidates: (c.candidates || []).map((candidate: any) => ({
          name: candidate.name,
          nameTamil: candidate.nameTamil || '',
          partyCode: candidate.partyCode || candidate.party,
          partyName: candidate.partyName,
          votes: parseInt(candidate.votes) || 0,
          status: this.determineStatus(candidate),
        })),
        totalVotes: parseInt(c.totalVotes) || 0,
        totalPolled: parseInt(c.totalPolled) || 0,
        turnoutPercentage: parseFloat(c.turnoutPercentage) || 0,
        roundsCompleted: parseInt(c.roundsCompleted) || 0,
        totalRounds: parseInt(c.totalRounds) || 0,
        lastUpdated: c.lastUpdated || new Date().toISOString(),
      })),
      summary: data.summary || this.calculateSummary(data.constituencies || []),
    };
  }

  /**
   * Determine candidate status based on position
   */
  private determineStatus(candidate: any): 'LEADING' | 'TRAILING' | 'WON' {
    if (candidate.status) return candidate.status;
    if (candidate.isWinner || candidate.won) return 'WON';
    if (candidate.isLeading || candidate.rank === 1) return 'LEADING';
    return 'TRAILING';
  }

  /**
   * Calculate summary statistics
   */
  private calculateSummary(constituencies: any[]): ECIResponse['summary'] {
    const partyWiseSeats: { [key: string]: { won: number; leading: number; total: number } } = {};
    let resultsDeclared = 0;

    constituencies.forEach(constituency => {
      const candidates = constituency.candidates || [];
      const winner = candidates.find((c: any) => c.status === 'WON');
      const leader = candidates.find((c: any) => c.status === 'LEADING');

      if (winner) {
        resultsDeclared++;
        const party = winner.partyCode;
        if (!partyWiseSeats[party]) {
          partyWiseSeats[party] = { won: 0, leading: 0, total: 0 };
        }
        partyWiseSeats[party].won++;
        partyWiseSeats[party].total++;
      } else if (leader) {
        const party = leader.partyCode;
        if (!partyWiseSeats[party]) {
          partyWiseSeats[party] = { won: 0, leading: 0, total: 0 };
        }
        partyWiseSeats[party].leading++;
        partyWiseSeats[party].total++;
      }
    });

    return {
      totalSeats: constituencies.length,
      resultsDeclared,
      resultsAwaited: constituencies.length - resultsDeclared,
      partyWiseSeats,
    };
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const eciDataFetcher = new ECIDataFetcher();
