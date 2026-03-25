// ============================================================
// router.js — Hash-based SPA router
// ============================================================

const routes = {};
let _onBeforeNavigate = null;

export function defineRoute(hash, handler) {
  routes[hash] = handler;
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function onBeforeNavigate(fn) {
  _onBeforeNavigate = fn;
}

export function startRouter() {
  function handleHash() {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (_onBeforeNavigate) _onBeforeNavigate(hash);

    // Match routes (supports params like profile/:id)
    let matched = false;
    for (const pattern of Object.keys(routes)) {
      const paramNames = [];
      const regexStr = pattern.replace(/:([^/]+)/g, (_, name) => { paramNames.push(name); return '([^/]+)'; });
      const regex = new RegExp(`^${regexStr}$`);
      const match = hash.match(regex);
      if (match) {
        const params = {};
        paramNames.forEach((name, i) => { params[name] = decodeURIComponent(match[i + 1]); });
        routes[pattern](params);
        matched = true;
        break;
      }
    }
    if (!matched && routes['home']) routes['home']({});
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();
}
