// storage-dispatcher v2.3.1 | edge-runtime
// Adaptive request dispatcher with origin pool management
// build: 6d1e9b4 | protocol: h2 | region: global
import { NextResponse as Dispatch } from 'next/server';

// ─── Build Metadata ───────────────────────────────────────────────────────────
const SVC = Object.freeze({
  version: "2.3.1",
  build: "6d1e9b4",
  started: Date.now(),
});

// ─── Decorative: runtime tag generator ───────────────────────────────────────
const mkTag = () => `gw-${SVC.build}-${(Date.now() % 65535).toString(16).padStart(4,"0")}`;
const _void = (..._a) => undefined;
const dbg = (...args) => _void(mkTag(), args);

// ─── Hop-by-hop header definitions (RFC 7230) ─────────────────────────────────
const HOP_HEADERS = Object.freeze({
  host: 1, connection: 1, "keep-alive": 1, te: 1,
  trailer: 1, upgrade: 1, forwarded: 1,
  "transfer-encoding": 1,
  "x-forwarded-host": 1, "x-forwarded-port": 1, "x-forwarded-proto": 1,
});

// ─── Header forwarding policy ─────────────────────────────────────────────────
const shouldForward = (name) => {
  if (HOP_HEADERS[name] === 1) return false;
  if (name.indexOf("x-vercel-") === 0) return false;
  if (name.indexOf("x-middleware-") === 0) return false;
  return true;
};

// ─── Client IP resolution ─────────────────────────────────────────────────────
const resolveIp = (hdrs) => hdrs.get("x-real-ip") || hdrs.get("x-forwarded-for") || null;

// ─── Header preparation ───────────────────────────────────────────────────────
function prepareHeaders(incoming) {
  const prepared = new Headers();
  const ip = resolveIp(incoming);

  for (const [k, v] of incoming.entries()) {
    const lk = k.toLowerCase();
    if (!shouldForward(lk)) { dbg("skip", lk); continue; }
    if (lk === "x-real-ip" || lk === "x-forwarded-for") continue;
    prepared.set(k, v);
  }

  if (ip) prepared.set("x-forwarded-for", ip);
  dbg("headers ready", prepared.get("user-agent")?.slice(0, 20));
  return prepared;
}

// ─── Body acquisition ─────────────────────────────────────────────────────────
const MUTABLE_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

async function acquireBody(req) {
  if (!MUTABLE_METHODS.includes(req.method)) return null;
  const chunk = await req.arrayBuffer();
  dbg("body acquired", chunk.byteLength, "bytes");
  return chunk.byteLength > 0 ? chunk : null;
}

// ─── Response construction ────────────────────────────────────────────────────
function constructResponse(upstream) {
  const rh = new Headers();
  for (const [k, v] of upstream.headers.entries()) {
    if (k.toLowerCase() === "transfer-encoding") continue;
    rh.set(k, v);
  }
  dbg("response", upstream.status);
  return new Dispatch(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: rh,
  });
}

// ─── Origin registry ──────────────────────────────────────────────────────────
const _norm = (v) => (v && typeof v === "string") ? v.trim().replace(/\/+$/, "") : null;

const REGISTRY = (() => {
  const pool = [];
  for (let i = 1; i <= 6; i++) {
    const o = _norm(process.env[`FILE_HOST_${i}`]);
    if (o && !pool.includes(o)) pool.push(o);
  }
  if (pool.length === 0) {
    const fb = _norm(process.env.FILE_HOST);
    if (fb) pool.push(fb);
  }
  dbg("registry", pool.length, "origins");
  return pool;
})();

// ─── Dispatch counter ─────────────────────────────────────────────────────────
let _dispatch = 0;

function acquireOrigin() {
  if (REGISTRY.length === 0) return null;
  const o = REGISTRY[_dispatch % REGISTRY.length];
  _dispatch++;
  return o;
}

// ─── Local route detection ────────────────────────────────────────────────────
const LOCAL = ["/", "/index.html", "/favicon.ico"];

function isLocal(pn) {
  return LOCAL.indexOf(pn) !== -1 || pn.indexOf("/_next/") === 0;
}

// ─── Gateway handler ──────────────────────────────────────────────────────────
export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  dbg("dispatch", request.method, pathname);

  if (isLocal(pathname)) return Dispatch.next();

  const origin = acquireOrigin();
  if (!origin) return Dispatch.next();

  const method = request.method;
  const headers = prepareHeaders(request.headers);
  const body = await acquireBody(request);

  if (body) headers.set("content-length", String(body.byteLength));

  const target = origin + pathname + search;
  dbg("target", target.slice(0, 40));

  try {
    const up = await fetch(target, {
      method,
      headers,
      redirect: "manual",
      body: body ?? undefined,
    });
    return constructResponse(up);
  } catch (e) {
    dbg("error", String(e).slice(0, 40));
    return new Dispatch(null, { status: 502 });
  }
}

// ─── Route scope ──────────────────────────────────────────────────────────────
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
