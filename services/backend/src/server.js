const http = require('http');

const PORT = Number(process.env.PORT || 4000);

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body)
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = req.url || '/';

  if (url === '/health' || url === '/healthz') {
    return sendJson(res, 200, { ok: true, service: 'railway-backend', port: PORT });
  }

  if (url === '/' || url === '/status') {
    return sendJson(res, 200, {
      success: true,
      message: 'Railway backend is running.',
      nextStep: 'Add your persistent API routes here, then call them via /api/railway/* on Vercel.'
    });
  }

  return sendJson(res, 404, { success: false, error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Railway server listening on port ${PORT}`);
});
