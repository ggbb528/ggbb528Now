import { Constants } from '@src/configs/constants';
export function refreshAccessToken() {
  const API_URL = new URL(Constants.TWITCH_AUTH_API_URL + '/token');
  const clientID = import.meta.env.VITE_TWITCH_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_TWITCH_CLIENT_SECRET;

  const formData = new FormData();
  formData.append('client_id', clientID);
  formData.append('client_secret', clientSecret);
  formData.append('grant_type', 'client_credentials');

  fetch(API_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((response) => {
      chrome.storage.local.set({
        twitchAccessToken: {
          accessToken: response.access_token,
          expired: new Date().getTime() + response.expires_in,
        },
      });
    });
  return;
}

export function validateToken() {
  if (!chrome.storage?.local) return;
  chrome.storage.local.get(
    { twitchAccessToken: { accessToken: '', expired: '' } },
    (items) => {
      // no token or token expired less 1 day
      if (
        items.twitchAccessToken.accessToken == '' ||
        items.twitchAccessToken.expired - new Date().getTime() < 86400
      ) {
        refreshAccessToken();
      }
    }
  );
  return;
}
