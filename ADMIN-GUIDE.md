# Admin Panel Guide

## 🔐 Access the Admin Panel

**URL:** http://localhost:5500/admin

**Default Login:**
- API Key: `changeme-dev-key`

**Change the API Key:**
Edit `.env.local` and update:
```bash
ADMIN_API_KEY="your-secure-key-here"
```

## 📋 Features

### Dashboard
- View total counts for all entities
- Quick access cards to all management sections
- Real-time statistics

### Parties Management (`/admin/parties`)
- Create, edit, delete political parties
- Fields:
  - Name (required)
  - Abbreviation
  - Color (hex code, e.g., #FF0000)
  - Logo URL (upload via `/admin-upload.html` first)
- Visual color preview
- Logo thumbnail display

### Constituencies Management (`/admin/constituencies`)
- Manage electoral constituencies
- Fields:
  - Name (required)
  - State (default: Tamil Nadu)
  - Code (optional identifier)
- Paginated list view

### Candidates Management (`/admin/candidates`)
- Add and manage candidates
- Fields:
  - Name (required)
  - Party (dropdown, required)
  - Constituency (dropdown, required)
  - Photo URL (upload first)
  - Biography (textarea)
- Displays related party and constituency info
- Photo thumbnail in list

### News Articles Management (`/admin/news`)
- Create and publish news articles
- Fields:
  - Title (required)
  - Slug (required, URL-friendly)
  - Summary (optional)
  - Content (required, full article text)
  - Image URL (featured image)
  - Published (checkbox - toggle draft/published)
- Status badge (Published/Draft)
- Creation date tracking

### Results Management (`/admin/results`)
- Enter and update election results
- Fields:
  - Constituency (dropdown, required)
  - Party (dropdown, optional)
  - Candidate (dropdown, optional)
  - Votes (number, required)
  - Leading (checkbox)
  - Won (checkbox)
- Visual indicators (✅ for leading, 🏆 for won)

## 🖼️ Image Upload

**URL:** http://localhost:5500/admin-upload.html

1. Enter your API key
2. Select category (News, Candidates, Parties, Logos, or General)
3. Choose image file (max 5MB, jpg/png/gif/webp/svg)
4. Click "Upload Image"
5. Copy the returned URL
6. Paste URL in the relevant form field

**Example URL returned:**
```
/images/candidates/1729145678901-photo.jpg
```

## 🔄 Workflow Examples

### Adding a New Candidate

1. **Upload Photo:**
   - Go to `/admin-upload.html`
   - Login with API key
   - Select "Candidates" category
   - Upload photo
   - Copy URL (e.g., `/images/candidates/photo.jpg`)

2. **Create Party (if not exists):**
   - Go to `/admin/parties`
   - Click "Add New"
   - Fill in party details
   - Save

3. **Create Constituency (if not exists):**
   - Go to `/admin/constituencies`
   - Click "Add New"
   - Enter constituency name and state
   - Save

4. **Add Candidate:**
   - Go to `/admin/candidates`
   - Click "Add New"
   - Enter name
   - Select party from dropdown
   - Select constituency from dropdown
   - Paste photo URL
   - Add biography
   - Save

### Publishing a News Article

1. **Upload Featured Image:**
   - Go to `/admin-upload.html`
   - Select "News" category
   - Upload image
   - Copy URL

2. **Create Article:**
   - Go to `/admin/news`
   - Click "Add New"
   - Enter title
   - Create URL-friendly slug (e.g., "dmk-wins-chennai")
   - Write summary
   - Write full content
   - Paste image URL
   - Check "Published" to make it live
   - Save

### Entering Election Results

1. Go to `/admin/results`
2. Click "Add New"
3. Select constituency
4. Select party
5. Select candidate (optional if party-level result)
6. Enter vote count
7. Check "Leading" if currently ahead
8. Check "Won" if final winner
9. Save

## 🎨 UI Features

- **Responsive Design:** Works on desktop and mobile
- **Pagination:** 20 items per page with First/Prev/Next/Last navigation
- **Search & Filter:** Available via API (use API Browser)
- **Inline Editing:** Click "Edit" to modify any item
- **Quick Delete:** One-click delete with confirmation
- **Visual Indicators:**
  - Color swatches for parties
  - Image thumbnails
  - Status badges
  - Icons for leading/won

## 🔒 Security

- API key required for all create/update/delete operations
- API key stored in localStorage after login
- Logout clears API key
- GET requests are public (read-only)
- POST/PUT/DELETE require authentication

## 📊 API Integration

The admin panel uses these API endpoints:

- `GET /api/{endpoint}?page=1&limit=20` - List with pagination
- `POST /api/{endpoint}` - Create new item
- `GET /api/{endpoint}/{id}` - Get single item
- `PUT /api/{endpoint}/{id}` - Update item
- `DELETE /api/{endpoint}/{id}` - Delete item

All write operations require header:
```
x-api-key: YOUR_API_KEY
```

## 🐛 Troubleshooting

**Can't login:**
- Check API key in `.env.local`
- Ensure dev server is running
- Clear browser cache/localStorage

**Images not uploading:**
- Check file size (max 5MB)
- Verify file type (jpg, png, gif, webp, svg only)
- Ensure API key is correct

**Dropdowns empty:**
- Create parties/constituencies first before adding candidates
- Create constituencies before adding results
- Data loads on form open

**Changes not saving:**
- Check browser console for errors
- Verify API key is set
- Ensure required fields are filled

## 🚀 Tips

1. **Bulk Import:** For large datasets, consider using the API directly with scripts
2. **Image Optimization:** Compress images before upload for faster loading
3. **URL Slugs:** Use lowercase, hyphens, no spaces (e.g., "tamil-nadu-election-2026")
4. **Backup:** SQLite database is in `dev.db` file - back it up regularly
5. **Testing:** Use API Browser (`/api-browser.html`) to test filters and pagination
