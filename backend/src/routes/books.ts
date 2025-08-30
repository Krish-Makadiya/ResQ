import { Router } from 'express';

const router = Router();

// GET /api/books/search?q=query
router.get('/search', async (req, res) => {
  const q = (req.query.q as string)?.trim();
  if (!q) return res.status(400).json({ error: 'Query is required' });

  try {
    const url = new URL('https://www.googleapis.com/books/v1/volumes');
    url.searchParams.set('q', q);
    // If you have an API key, uncomment next line and set env GOOGLE_BOOKS_API_KEY
    // if (process.env.GOOGLE_BOOKS_API_KEY) url.searchParams.set('key', process.env.GOOGLE_BOOKS_API_KEY);

    const resp = await fetch(url.toString());
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json({ error: 'Google Books API error', detail: text });
    }
    const data = await resp.json();
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch from Google Books API', detail: err?.message });
  }
});

export default router;
