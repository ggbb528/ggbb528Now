import { Constants } from '@/configs/constants';
import { refreshAccessToken, validateToken } from './tokens';

export const Icons = {
  offline: {
    16: '/icons/icon_16.png',
    32: '/icons/icon_32.png',
    48: '/icons/icon_48.png',
    128: '/icons/icon_128.png',
  },
  online: {
    16: '/icons/icon-Live_16.png',
    32: '/icons/icon-Live_32.png',
    48: '/icons/icon-Live_48.png',
    128: '/icons/icon-Live_128.png',
  },
};

export function checkStreams() {
  validateToken();

  // when support multi channel
  // searchParams.append('user_login', 'muse_tw');
  chrome.storage.local.get(
    {
      twitchAccessToken: { accessToken: '', expired: '' },
    },
    (items) => {
      const accessToken = items.twitchAccessToken.accessToken;
      const API_URL = new URL(Constants.TWITCH_API_URL + '/streams');
      const searchParams = new URLSearchParams({ user_login: 'ggbb528' });
      const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
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
            checkStreams();
            return false;
          }
          return response.json();
        })
        .then((response) => {
          if (response.data && response.data.length > 0) {
            chrome.action.setIcon({ path: Icons.online });
            chrome.storage.local.set({ ggbb528Open: true });
          } else {
            chrome.action.setIcon({ path: Icons.offline });
            chrome.storage.local.set({ ggbb528Open: false });
          }
        });
    }
  );
}
