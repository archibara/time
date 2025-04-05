const createNotification = (title: string) => {
  new Notification(
    new Date().toLocaleTimeString(),
    {
      body: title,
      icon: 'icon.svg',
      badge: 'icon.svg',
      requireInteraction: true,
      tag: title,
      silent: false,
    }
  );
};

const requestPermission = async () => {
  if (Notification.permission === 'denied') {
    return Notification.permission;
  }
  if (Notification.permission === 'granted') {
    return Notification.permission;
  }
  return Notification.requestPermission();
};

export const scheduleNotification = (date: Date, title: string) => {
  requestPermission().catch(alert);

  const now = new Date();
  const timeToNotification = date.getTime() - now.getTime();
  if (timeToNotification <= 0) {
    return;
  }
  setTimeout(
    async () => {
      const permission = await requestPermission();
      if (permission !== 'granted') {
        return;
      }
      createNotification(title);
    },
    timeToNotification
  );
};
