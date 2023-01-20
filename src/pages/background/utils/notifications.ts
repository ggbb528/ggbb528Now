export function sendLiveNotification(
  id: string,
  title: string,
  message: string
) {
  if (!chrome.notifications) return;

  chrome.notifications.clear(id);

  const notificationOptions: chrome.notifications.NotificationOptions<true> = {
    type: 'basic',
    iconUrl: '/icons/TwitchGlitchPurple.png',
    title: title,
    message: message,
    isClickable: true,
  };

  chrome.notifications.create(id, notificationOptions);
}
