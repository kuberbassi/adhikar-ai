const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);
const CLEANUP_KEY = 'adhikar-local-sw-cleanup';

const startApp = async () => {
  try {
    await import('./main.jsx');
  } catch (error) {
    console.error('Unable to load the application:', error);
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <main style="max-width:560px;margin:15vh auto;padding:24px;font-family:system-ui;color:#2c2418;text-align:center">
          <h1 style="font-size:24px;margin-bottom:12px">Unable to load Adhikar.ai</h1>
          <p style="color:#6f6251;line-height:1.6">A browser extension may have blocked an application file. Please refresh the page or allow localhost in your privacy extension.</p>
          <button onclick="location.reload()" style="margin-top:18px;padding:11px 18px;border:0;border-radius:10px;background:#8b6914;color:white;font-weight:600;cursor:pointer">Refresh page</button>
        </main>`;
    }
  }
};

const cleanLocalServiceWorkers = async () => {
  if (!LOCAL_HOSTS.has(window.location.hostname) || !('serviceWorker' in navigator)) {
    return startApp();
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(registration => registration.unregister()));

    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
    }

    if (navigator.serviceWorker.controller && !sessionStorage.getItem(CLEANUP_KEY)) {
      sessionStorage.setItem(CLEANUP_KEY, 'done');
      window.location.reload();
      return;
    }

    sessionStorage.removeItem(CLEANUP_KEY);
  } catch (error) {
    console.warn('Local service worker cleanup failed:', error);
  }

  return startApp();
};

cleanLocalServiceWorkers();
