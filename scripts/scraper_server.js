#!/usr/bin/env node
// ============================================================
// scripts/scraper_server.js — Local scraper trigger server
// Run with: node scripts/scraper_server.js
// ============================================================

const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 5001;
const ROOT = path.resolve(__dirname, '..');
const SCRAPER = path.join(ROOT, 'scripts', 'scraper.py');
const PYTHON = process.platform === 'win32' ? 'python' : 'python3';

let scraperStatus = 'idle'; // 'idle' | 'running' | 'done' | 'error'
let scraperProcess = null;

const server = http.createServer((req, res) => {
  // CORS headers so browser fetch() works
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204); res.end(); return;
  }

  if (req.method === 'GET' && req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: scraperStatus }));
    return;
  }

  if (req.method === 'POST' && req.url === '/run-scraper') {
    if (scraperStatus === 'running') {
      res.writeHead(409, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Scraper already running' }));
      return;
    }

    console.log('[scraper_server] Starting scraper:', SCRAPER);
    scraperStatus = 'running';

    scraperProcess = spawn(PYTHON, [SCRAPER], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    scraperProcess.stdout.on('data', d => process.stdout.write('[scraper] ' + d));
    scraperProcess.stderr.on('data', d => process.stderr.write('[scraper] ' + d));

    scraperProcess.on('close', (code) => {
      scraperStatus = code === 0 ? 'done' : 'error';
      console.log(`[scraper_server] Scraper exited with code ${code} → status: ${scraperStatus}`);
      // Reset to idle after 30s so you can run again
      setTimeout(() => { scraperStatus = 'idle'; }, 30000);
    });

    scraperProcess.on('error', (err) => {
      scraperStatus = 'error';
      console.error('[scraper_server] Failed to start scraper:', err.message);
      setTimeout(() => { scraperStatus = 'idle'; }, 30000);
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, message: 'Scraper started' }));
    return;
  }

  res.writeHead(404); res.end('Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[scraper_server] Running at http://localhost:${PORT}`);
  console.log(`  GET  /status      → scraper status`);
  console.log(`  POST /run-scraper → start scraper.py`);
});

process.on('SIGINT', () => {
  console.log('\n[scraper_server] Shutting down...');
  if (scraperProcess) scraperProcess.kill();
  server.close(() => process.exit(0));
});
