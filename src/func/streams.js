module.exports = () => {
  // Variable
  var accessToken = 'gs2cxwq056jcelg0knaw6gl4pxnygd';
  var clientId = '3cppb0bah5pvz8p27qy1c5i3zbfwg7';
  var twitchAPIUrl = 'https://api.twitch.tv/helix';

  const Icons = {
    offline: {
      16: 'icons/icon_16.png',
      32: 'icons/icon_32.png',
      48: 'icons/icon_48.png',
      128: 'icons/icon_128.png',
    },
    online: {
      16: 'icons/icon-Live_16.png',
      32: 'icons/icon-Live_32.png',
      48: 'icons/icon-Live_48.png',
      128: 'icons/icon-Live_128.png',
    },
  };

  const checkStreams = () => {
    var url = new URL(twitchAPIUrl + '/streams');
    searchParams = new URLSearchParams({ user_login: 'ggbb528' });
    // when support multi channel
    // searchParams.append('user_login', 'muse_tw');

    url.search = searchParams.toString();
    var option = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Client-ID': clientId,
      },
    };

    fetch(url, option)
      .then((response) => response.json())
      .then((response) => {
        if (response.data.length > 0) {
          //   chrome.action.setBadgeBackgroundColor({ color: '#ff0000' });
          //   chrome.action.setBadgeText({ text: 'Live' });
          chrome.action.setIcon({ path: Icons.online });
          chrome.storage.local.set({ ggbb528Open: true });
        } else {
          //   chrome.action.setBadgeText({ text: '' });
          chrome.action.setIcon({ path: Icons.offline });
          chrome.storage.local.set({ ggbb528Open: false });
        }
      });
  };

  return {
    checkStreams,
    Icons,
  };
};
