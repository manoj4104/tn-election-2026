# Election 2026 API

Base URL (dev): http://localhost:5500/api

Auth: For POST/PUT/DELETE include header `x-api-key: <ADMIN_API_KEY>`

## Pagination & Filtering

All list endpoints support:
- **Pagination**: `?page=1&limit=20` (default: page=1, limit=20, max=100)
- **Search**: `?search=keyword` (searches relevant fields)
- **Filters**: See endpoint-specific filters below

Response format for paginated endpoints:
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Health
GET /api/health -> { ok: true, ts }

## Upload Images
POST /api/upload (multipart/form-data)
- Headers: x-api-key: YOUR_KEY
- Form fields:
  - file: (required) image file (jpeg, png, gif, webp, svg)
  - subdir: (optional) subdirectory - one of: news, candidates, parties, logos, or empty
- Max size: 5MB
- Returns: { success: true, filename, url, size, type }
- Example url returned: "/images/news/1729145678901-photo.jpg"

## News Articles
- GET /api/news — list with pagination
  - Query params: `?page=1&limit=20&published=true&search=keyword`
- POST /api/news — create
  - body: { title, slug, content, summary?, imageUrl?, published? }
- GET /api/news/:id — by id
- PUT /api/news/:id — update
- DELETE /api/news/:id — delete

## Parties
- GET /api/parties — list with pagination
  - Query params: `?page=1&limit=20&search=keyword`
- POST /api/parties — create
  - body: { name, abbreviation?, color?, logoUrl? }
- GET /api/parties/:id — by id
- PUT /api/parties/:id — update
- DELETE /api/parties/:id — delete

## Constituencies
- GET /api/constituencies — list with pagination
  - Query params: `?page=1&limit=20&state=Tamil Nadu&search=keyword`
- POST /api/constituencies — create
  - body: { name, state?, code? }
- GET /api/constituencies/:id — by id
- PUT /api/constituencies/:id — update
- DELETE /api/constituencies/:id — delete

## Candidates
- GET /api/candidates — list with pagination
  - Query params: `?page=1&limit=20&partyId=1&constituencyId=2&search=name`
- POST /api/candidates — create
  - body: { name, partyId, constituencyId, photoUrl?, bio? }
- GET /api/candidates/:id — by id
- PUT /api/candidates/:id — update
- DELETE /api/candidates/:id — delete

## Results
- GET /api/results — list with pagination
  - Query params: `?page=1&limit=20&constituencyId=1&partyId=2&candidateId=3&leading=true&won=false`
- POST /api/results — create
  - body: { constituencyId, partyId?, candidateId?, votes?, leading?, won? }
- GET /api/results/:id — by id
- PUT /api/results/:id — update
- DELETE /api/results/:id — delete

## Examples

**Get DMK candidates in Chennai North:**
```
GET /api/candidates?partyId=1&constituencyId=5
```

**Get leading results:**
```
GET /api/results?leading=true&page=1&limit=50
```

**Search for articles about elections:**
```
GET /api/news?search=election&published=true
```

**Get all constituencies paginated:**
```
GET /api/constituencies?page=2&limit=30
```
