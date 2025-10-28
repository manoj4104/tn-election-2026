# Election Data Integration System

Complete system for fetching, syncing, and managing live election results from Election Commission of India (ECI).

## 🎯 Components

### 1. ECI Data Fetcher (`lib/eci-fetcher.ts`)
Fetches live results from ECI official API.

**Features:**
- Automatic retry with exponential backoff
- Data validation and transformation
- Constituency-specific queries
- Party-wise summary calculations

**Usage:**
```typescript
import { eciDataFetcher } from '@/lib/eci-fetcher';

// Fetch all results
const results = await eciDataFetcher.fetchLiveResults();

// Fetch specific constituency
const result = await eciDataFetcher.fetchConstituencyResult('AC001');
```

### 2. Webhook Endpoint (`app/api/webhook/results/route.ts`)
Receives push notifications for real-time updates.

**Endpoint:** `POST /api/webhook/results`

**Security:** HMAC SHA256 signature verification

**Payload:**
```json
{
  "source": "ECI",
  "timestamp": "2026-05-XX...",
  "signature": "hmac-sha256-signature",
  "data": {
    "constituencyId": "AC001",
    "candidates": [
      {
        "name": "Candidate Name",
        "partyCode": "DMK",
        "votes": 50000,
        "status": "LEADING"
      }
    ]
  }
}
```

**Setup Webhook:**
```bash
# Set webhook secret in .env
WEBHOOK_SECRET=your-super-secret-key

# Configure webhook URL at ECI/News API
https://your-domain.vercel.app/api/webhook/results
```

### 3. Web Scraper (`lib/eci-scraper.ts`)
Fallback scraper when API is unavailable.

**Features:**
- Rate-limited requests (2 seconds between requests)
- Automatic party code extraction
- Robust HTML parsing with cheerio
- Retry logic for failed requests

**Usage:**
```typescript
import { eciResultsScraper } from '@/lib/eci-scraper';

// Scrape all constituencies
const results = await eciResultsScraper.scrapeAllResults();

// Scrape specific constituency
const result = await eciResultsScraper.scrapeConstituency('AC001');
```

**Note:** Install cheerio dependency:
```bash
npm install cheerio
npm install -D @types/cheerio
```

### 4. Sync Service (`lib/sync-service.ts`)
Background job system for periodic updates.

**Features:**
- Periodic auto-sync (configurable interval)
- Manual sync trigger
- API → Scraper fallback
- Sync status tracking

**Usage:**
```typescript
import { electionDataSyncService } from '@/lib/sync-service';

// Start periodic sync (every 5 minutes)
electionDataSyncService.startPeriodicSync({
  source: 'AUTO',
  interval: 300000, // 5 minutes
});

// Trigger manual sync
const result = await electionDataSyncService.syncNow({
  source: 'AUTO', // or 'API' or 'SCRAPER'
});

// Get last sync status
const status = electionDataSyncService.getLastSyncResult();

// Stop periodic sync
electionDataSyncService.stopPeriodicSync();
```

### 5. Sync API Endpoint (`app/api/sync/results/route.ts`)
Manual sync trigger via API.

**Endpoints:**
- `GET /api/sync/results` - Get sync status
- `POST /api/sync/results` - Trigger manual sync

**Examples:**
```bash
# Get sync status
curl https://your-domain.vercel.app/api/sync/results

# Trigger full sync (AUTO mode - tries API then scraper)
curl -X POST https://your-domain.vercel.app/api/sync/results \
  -H "Content-Type: application/json" \
  -d '{"source": "AUTO"}'

# Sync specific constituencies only
curl -X POST https://your-domain.vercel.app/api/sync/results \
  -H "Content-Type: application/json" \
  -d '{
    "source": "AUTO",
    "constituencyIds": ["AC001", "AC002", "AC003"]
  }'

# Force use scraper
curl -X POST https://your-domain.vercel.app/api/sync/results \
  -H "Content-Type: application/json" \
  -d '{"source": "SCRAPER"}'
```

## 🚀 Deployment Setup

### Environment Variables
```env
# Database
DATABASE_URL="file:./prisma/dev.db"  # SQLite for dev
DATABASE_URL="postgresql://..."      # PostgreSQL for production

# Webhook Security
WEBHOOK_SECRET="your-super-secret-key-minimum-32-characters"

# Optional: ECI API Configuration
ECI_API_URL="https://results.eci.gov.in/api"
ECI_STATE_CODE="S22"
```

### Production Setup (Vercel)

1. **Install Dependencies:**
```bash
npm install cheerio
npm install -D @types/cheerio
```

2. **Configure Database:**
Use PostgreSQL for production (SQLite is ephemeral on Vercel):
```bash
# Add to Vercel environment variables
DATABASE_URL=postgresql://user:pass@host/db
```

3. **Set Webhook Secret:**
```bash
# Vercel Dashboard → Settings → Environment Variables
WEBHOOK_SECRET=your-generated-secret-key
```

4. **Enable Periodic Sync:**
Create `app/api/cron/sync/route.ts` for Vercel Cron:
```typescript
import { electionDataSyncService } from '@/lib/sync-service';
import { NextResponse } from 'next/server';

export async function GET() {
  // Vercel Cron will hit this endpoint
  const result = await electionDataSyncService.syncNow({ source: 'AUTO' });
  return NextResponse.json(result);
}
```

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/sync",
    "schedule": "*/5 * * * *"
  }]
}
```

## 📊 Usage Scenarios

### Scenario 1: Election Day Live Updates
```typescript
// Start aggressive polling during counting
electionDataSyncService.startPeriodicSync({
  source: 'AUTO',
  interval: 60000, // 1 minute
});
```

### Scenario 2: Manual Admin Update
```typescript
// Admin dashboard button to force sync
const handleSync = async () => {
  const response = await fetch('/api/sync/results', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'AUTO' }),
  });
  const result = await response.json();
  console.log(`Updated ${result.result.constituenciesUpdated} constituencies`);
};
```

### Scenario 3: Webhook from News Partner
```bash
# News organization pushes updates to your webhook
curl -X POST https://your-domain.vercel.app/api/webhook/results \
  -H "Content-Type: application/json" \
  -H "x-webhook-signature: hmac-signature-here" \
  -d '{
    "source": "NEWS_API",
    "timestamp": "2026-05-XX...",
    "data": { ... }
  }'
```

## 🔒 Security

1. **Webhook Signature Verification:**
   - All webhook requests must include HMAC SHA256 signature
   - Prevents unauthorized result updates
   - Development mode allows unsigned requests

2. **Rate Limiting:**
   - Scraper has built-in 2-second delays
   - Prevents overwhelming ECI servers

3. **Error Handling:**
   - Graceful fallback from API to scraper
   - Comprehensive error logging
   - Failed syncs don't break the system

## 📝 Data Flow

```
ECI API/Portal
    ↓
1. API Fetcher (primary) → Database
    ↓ (if fails)
2. Web Scraper (fallback) → Database
    ↓
3. Your Frontend displays results
    ↑
4. Webhook pushes updates (optional)
```

## 🐛 Troubleshooting

### Scraper Not Working
```bash
# Install cheerio
npm install cheerio @types/cheerio

# Check if ECI portal structure changed
# Update selectors in eci-scraper.ts
```

### Sync Failing
```bash
# Check sync status
curl https://your-domain.vercel.app/api/sync/results

# Check logs in Vercel dashboard
# Look for [Sync Service] or [ECI Fetcher] messages
```

### Database Not Updating
```bash
# Verify Prisma client is generated
npx prisma generate

# Check database connection
npx prisma studio

# Verify constituency codes match ECI format
```

## 📚 Next Steps

1. **Test with Mock Data:** Create sample API responses for testing
2. **Monitor Performance:** Add logging and analytics
3. **Optimize Database:** Add indexes for frequently queried fields
4. **Add Caching:** Cache results to reduce database load
5. **Setup Alerts:** Get notified when sync fails

## 🎉 Ready for 2026!

Your system is now ready to handle live election results. On election day 2026:

1. Switch DATABASE_URL to PostgreSQL
2. Set WEBHOOK_SECRET in production
3. Start periodic sync with 1-minute interval
4. Monitor via `/api/sync/results` endpoint
5. Display live data on your frontend

Good luck with the Tamil Nadu Assembly Elections 2026! 🗳️
