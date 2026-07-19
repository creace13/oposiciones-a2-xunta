export default {
  async fetch(request, env) {
    try {
      const res = await env.ASSETS.fetch(request);
      if (res.status === 404) {
        return new Response('404 Not Found', {
          status: 404,
          headers: { 'content-type': 'text/plain; charset=utf-8' }
        });
      }
      return res;
    } catch (_) {
      return new Response('404 Not Found', {
        status: 404,
        headers: { 'content-type': 'text/plain; charset=utf-8' }
      });
    }
  }
};
