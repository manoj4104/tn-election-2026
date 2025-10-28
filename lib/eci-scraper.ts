/**
 * ECI Results Web Scraper
 * Fallback mechanism when API is unavailable
 * Scrapes ECI results portal for Tamil Nadu election data
 */

import * as cheerio from 'cheerio';

interface ScrapedResult {
  constituencyName: string;
  constituencyCode: string;
  candidates: {
    name: string;
    partyName: string;
    partyCode: string;
    votes: number;
    status: 'LEADING' | 'TRAILING' | 'WON';
  }[];
  lastUpdated: string;
}

export class ECIResultsScraper {
  private readonly baseUrl: string;
  private readonly stateCode: string = 'S22'; // Tamil Nadu
  private readonly requestDelay: number = 2000; // 2 seconds between requests
  private readonly userAgent: string = 'Mozilla/5.0 (compatible; DailyThanthi-Bot/1.0)';

  constructor(baseUrl: string = 'https://results.eci.gov.in') {
    this.baseUrl = baseUrl;
  }

  /**
   * Scrape all constituency results
   */
  async scrapeAllResults(): Promise<ScrapedResult[]> {
    console.log('[Scraper] Starting to scrape ECI results...');
    
    try {
      // First, get list of all constituencies
      const constituencies = await this.getConstituencyList();
      console.log(`[Scraper] Found ${constituencies.length} constituencies`);

      const results: ScrapedResult[] = [];

      // Scrape each constituency with rate limiting
      for (let i = 0; i < constituencies.length; i++) {
        const constituency = constituencies[i];
        console.log(`[Scraper] Scraping ${i + 1}/${constituencies.length}: ${constituency.name}`);

        try {
          const result = await this.scrapeConstituency(constituency.code);
          if (result) {
            results.push(result);
          }
        } catch (error) {
          console.error(`[Scraper] Failed to scrape ${constituency.name}:`, error);
        }

        // Rate limiting - wait between requests
        if (i < constituencies.length - 1) {
          await this.sleep(this.requestDelay);
        }
      }

      console.log(`[Scraper] Successfully scraped ${results.length} constituencies`);
      return results;

    } catch (error) {
      console.error('[Scraper] Failed to scrape results:', error);
      throw error;
    }
  }

  /**
   * Get list of constituencies from ECI portal
   */
  private async getConstituencyList(): Promise<{ name: string; code: string }[]> {
    try {
      const url = `${this.baseUrl}/ResultAcGenNov2024m.htm?st=${this.stateCode}`;
      const html = await this.fetchPage(url);
      const $ = cheerio.load(html);

      const constituencies: { name: string; code: string }[] = [];

      // Parse constituency links
      $('select[name="ac"] option').each((_, element) => {
        const value = $(element).attr('value');
        const name = $(element).text().trim();
        
        if (value && name && value !== '') {
          constituencies.push({
            code: value,
            name: name,
          });
        }
      });

      return constituencies;

    } catch (error) {
      console.error('[Scraper] Failed to get constituency list:', error);
      return [];
    }
  }

  /**
   * Scrape a specific constituency result
   */
  async scrapeConstituency(constituencyCode: string): Promise<ScrapedResult | null> {
    try {
      const url = `${this.baseUrl}/Constituencywise${this.stateCode}${constituencyCode}.htm`;
      const html = await this.fetchPage(url);
      const $ = cheerio.load(html);

      // Extract constituency name
      const constituencyName = $('h3').first().text().trim() || `Constituency ${constituencyCode}`;

      const candidates: ScrapedResult['candidates'] = [];

      // Parse candidate table
      $('table.table tr').each((index, row) => {
        // Skip header row
        if (index === 0) return;

        const cells = $(row).find('td');
        if (cells.length < 4) return;

        const candidateName = $(cells[1]).text().trim();
        const partyName = $(cells[2]).text().trim();
        const votesText = $(cells[3]).text().trim().replace(/,/g, '');
        const votes = parseInt(votesText) || 0;

        // Determine status
        let status: 'LEADING' | 'TRAILING' | 'WON' = 'TRAILING';
        const statusText = $(cells[4])?.text()?.trim()?.toLowerCase() || '';
        
        if (statusText.includes('won') || statusText.includes('winner')) {
          status = 'WON';
        } else if (index === 1 && votes > 0) {
          // First candidate with votes is usually leading
          status = 'LEADING';
        }

        // Extract party code from party name
        const partyCode = this.extractPartyCode(partyName);

        if (candidateName && partyName) {
          candidates.push({
            name: candidateName,
            partyName,
            partyCode,
            votes,
            status,
          });
        }
      });

      // Sort by votes (descending)
      candidates.sort((a, b) => b.votes - a.votes);

      // Update status based on sorted order
      if (candidates.length > 0 && candidates[0].votes > 0) {
        const hasWinner = candidates.some(c => c.status === 'WON');
        if (!hasWinner) {
          candidates[0].status = 'LEADING';
        }
      }

      return {
        constituencyName,
        constituencyCode,
        candidates,
        lastUpdated: new Date().toISOString(),
      };

    } catch (error) {
      console.error(`[Scraper] Failed to scrape constituency ${constituencyCode}:`, error);
      return null;
    }
  }

  /**
   * Fetch HTML page with retry logic
   */
  private async fetchPage(url: string): Promise<string> {
    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': this.userAgent,
            'Accept': 'text/html',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.text();

      } catch (error) {
        lastError = error as Error;
        console.error(`[Scraper] Attempt ${attempt}/${maxRetries} failed for ${url}:`, error);
        
        if (attempt < maxRetries) {
          await this.sleep(this.requestDelay);
        }
      }
    }

    throw lastError || new Error('Failed to fetch page');
  }

  /**
   * Extract party code from party name
   */
  private extractPartyCode(partyName: string): string {
    const partyMap: { [key: string]: string } = {
      'Dravida Munnetra Kazhagam': 'DMK',
      'All India Anna Dravida Munnetra Kazhagam': 'AIADMK',
      'Bharatiya Janata Party': 'BJP',
      'Indian National Congress': 'INC',
      'Communist Party of India (Marxist)': 'CPM',
      'Communist Party of India': 'CPI',
      'Marumalarchi Dravida Munnetra Kazhagam': 'MDMK',
      'Pattali Makkal Katchi': 'PMK',
      'Desiya Murpokku Dravida Kazhagam': 'DMDK',
      'Naam Tamilar Katchi': 'NTK',
      'Viduthalai Chiruthaigal Katchi': 'VCK',
    };

    // Check for exact match
    for (const [fullName, code] of Object.entries(partyMap)) {
      if (partyName.includes(fullName)) {
        return code;
      }
    }

    // Check for code in parentheses
    const match = partyName.match(/\(([A-Z]+)\)/);
    if (match) {
      return match[1];
    }

    // Generate code from initials
    const words = partyName.split(/\s+/).filter(w => w.length > 2);
    if (words.length > 0) {
      return words.map(w => w[0]).join('').toUpperCase().substring(0, 5);
    }

    return 'IND'; // Independent
  }

  /**
   * Sleep utility for rate limiting
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const eciResultsScraper = new ECIResultsScraper();
