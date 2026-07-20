export default {
  async fetch(request, env) {
    try {
      const res = await env.ASSETS.fetch(request);
      if (res.status === 404) {
        return withSecurityHeaders(request, new Response('404 Not Found', {
          status: 404,
          headers: { 'content-type': 'text/plain; charset=utf-8' }
        }));
      }
      return withSecurityHeaders(request, res);
    } catch (_) {
      return withSecurityHeaders(request, new Response('404 Not Found', {
        status: 404,
        headers: { 'content-type': 'text/plain; charset=utf-8' }
      }));
    }
  }
};

const MAIN_DOCUMENT_PATHS = new Set(['/', '/index.html']);

function withSecurityHeaders(request, response) {
  const url = new URL(request.url);
  const headers = new Headers(response.headers);
  const isMainDocument = MAIN_DOCUMENT_PATHS.has(url.pathname);

  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Strict-Transport-Security', 'max-age=31536000');

  if (isMainDocument) {
    headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        'upgrade-insecure-requests'
      ].join('; ')
    );
    headers.set('Cache-Control', 'no-cache, must-revalidate');
  } else if (!headers.has('Cache-Control')) {
    headers.set('Cache-Control', 'public, max-age=86400');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
