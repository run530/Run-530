// Cloudflare Worker: lets the Run Plan app talk to Strava without exposing your secret.
// Variables to add in Cloudflare: STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET (secret),
// and optionally ALLOWED_ORIGIN (e.g. https://YOURNAME.github.io).
export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const u = new URL(req.url);
    const send = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } });
    try {
      if (u.pathname === '/token' || u.pathname === '/refresh') {
        const b = await req.json();
        const body = new URLSearchParams({ client_id: env.STRAVA_CLIENT_ID, client_secret: env.STRAVA_CLIENT_SECRET });
        if (u.pathname === '/token') { body.set('grant_type', 'authorization_code'); body.set('code', b.code); }
        else { body.set('grant_type', 'refresh_token'); body.set('refresh_token', b.refresh_token); }
        const r = await fetch('https://www.strava.com/oauth/token', { method: 'POST', body });
        const j = await r.json();
        return send({ access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at, error: j.message }, r.status);
      }
      if (u.pathname === '/activities') {
        const r = await fetch('https://www.strava.com/api/v3/athlete/activities' + u.search, { headers: { Authorization: req.headers.get('Authorization') || '' } });
        return new Response(await r.text(), { status: r.status, headers: { ...cors, 'Content-Type': 'application/json' } });
      }
      return send({ error: 'not found' }, 404);
    } catch (e) { return send({ error: String(e) }, 500); }
  }
};
