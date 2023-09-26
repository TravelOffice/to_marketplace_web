importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
importScripts('/firebase-messaging-config.js');

firebase.initializeApp(firebaseMessagingConfig);
console.log('Firebase initialized');

const messaging = firebase.messaging();

if (firebase.messaging.isSupported()) {
  console.log('Firebase messaging is supported');
  const channel = new BroadcastChannel('notifications');
  messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );

    const { data } = payload;

    const notificationTitle = data['pinpoint.notification.title'];

    self.registration.showNotification(notificationTitle, {
      body: data['pinpoint.notification.body'],
      icon: '/favicon.ico',
      actions: [
        {
          action: 'view',
          title: 'View details',
        },
      ],
      data: {
        url: data['pinpoint.openApp'] ? 'http://localhost:5173/' : data['pinpoint.url'],
      },
    }).then(() => {
      console.log('Push Notification is sent');
    }).finally(() => {
      channel.postMessage(payload);
    });
  });
}

self.addEventListener('notificationclick', (event) => {
  const urlToOpen = event.notification.data.url;
  event.notification.close();
  event.waitUntil(
    clients.matchAll({includeUncontrolled: true, type: 'window'}).then((allClients) => {
      let matchingClient = allClients.find((client) => {
        return client.url === urlToOpen;
      });
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
