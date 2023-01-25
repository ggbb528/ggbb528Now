import { Constants } from '@configs/constants';
import { refreshAccessToken, validateToken } from './tokens';

export default async function syncVod() {
  if (!chrome.storage?.local) return;

  validateToken();

  chrome.storage.local.get(
    {
      twitchAccessToken: { accessToken: '', expired: '' },
    },
    (items) => {
      const accessToken = items.twitchAccessToken.accessToken;
      const API_URL = new URL(Constants.TWITCH_API_URL + '/videos');
      const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
      const searchParams = new URLSearchParams({
        user_id: '35154593',
        first: '20',
        type: 'highlight',
      });
      API_URL.search = searchParams.toString();

      fetch(API_URL, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Client-ID': clientId,
        },
      })
        .then((response) => {
          if (response.status == 401) {
            refreshAccessToken();
            syncVod();
            return false;
          }
          return response.json();
        })
        .then((response) => {
          if (response) {
            chrome.storage.local.set({ vodList: response.data });
          }
        });
    }
  );

  return;
}
