// Vercel serverless proxy: /api/railway/:path* -> Railway backend
// Requires env var: RAILWAY_API_BASE_URL=https://interview-training-slideshow-production.up.railway.app

function normalizeBaseUrl(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withProtocol.replace(/\/+$/, '');
}

module.exports = async function handler(req, res) {
  const base = normalizeBaseUrl(process.env.RAILWAY_API_BASE_URL);
  if (!base) {
    return res.status(500).json({
      success: false,
      error: 'Missing RAILWAY_API_BASE_URL environment variable'
    });
  }

  const rawPath = req.query.path;
  const pathFromRewrite = Array.isArray(rawPath) ? rawPath.join('/') : String(rawPath || '');
  const normalizedPath = pathFromRewrite.replace(/^\/+/, '');
  const targetUrl = new URL(`${base}/${normalizedPath}`);

  // Preserve query params except internal "path" parameter.
  Object.entries(req.query || {}).forEach(([key, value]) => {
    if (key === 'path' || value == null) return;
    if (Array.isArray(value)) value.forEach((v) => targetUrl.searchParams.append(key, String(v)));
    else targetUrl.searchParams.set(key, String(value));
  });

  const headers = {};
  if (req.headers['content-type']) headers['content-type'] = req.headers['content-type'];
  if (req.headers.accept) headers.accept = req.headers.accept;
  if (req.headers.authorization) headers.authorization = req.headers.authorization;

  const method = (req.method || 'GET').toUpperCase();
  const hasBody = !['GET', 'HEAD'].includes(method);

  try {
    const upstreamResponse = await fetch(targetUrl.toString(), {
      method,
      headers,
      body: hasBody ? JSON.stringify(req.body || {}) : undefined
    });

    const contentType = upstreamResponse.headers.get('content-type') || 'application/json; charset=utf-8';
    const text = await upstreamResponse.text();
    res.status(upstreamResponse.status);
    res.setHeader('content-type', contentType);
    return res.send(text);
  } catch (err) {
    return res.status(502).json({
      success: false,
      error: 'Failed to reach Railway backend',
      details: err && err.message ? err.message : 'Unknown error'
    });
  }
};
