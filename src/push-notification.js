self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'PT AMP';
  const options = {
    body: event.data.text(),
    icon: 'assets/icon-push.png',
    badge: 'assets/icon-badge.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
