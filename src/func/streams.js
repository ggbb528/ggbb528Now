module.exports = () => {
  // Variable
  var clientId = 'gwku24kcuvzugy1tw91leenhku1133';
  var client_secret = '3nlfof3bmonndmp2y1gobh0byk40l9';
  var twitchAPIUrl = 'https://api.twitch.tv/helix';
  var twitchIDUrl = 'https://id.twitch.tv/oauth2';

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

  const refreshAccessToken = () => {
    var url = new URL(twitchIDUrl + '/token');

    let formData = new FormData();
    formData.append('client_id', clientId);
    formData.append('client_secret', client_secret);
    formData.append('grant_type', 'client_credentials');

    var option = {
      method: 'POST',
      body: formData
    };
    fetch(url, option)
      .then((response) => response.json())
      .then((response) => {
        chrome.storage.local.set({
          twitchAccessToken:{
            accessToken: response.access_token, 
            expired: new Date().getTime() + response.expires_in
          }
        });
    });
  }

  const validateToken = () => {
    chrome.storage.local.get({
      twitchAccessToken:{accessToken: "", expired: ""}
    }, function(items) {
        // local not token or token expired less in 1 day.
        if (items.twitchAccessToken.accessToken == "" || items.twitchAccessToken.expired - new Date().getTime() < 86400) {
          refreshAccessToken();
        }
    });
  }

  const checkStreams = () => {
    validateToken();
    
    // when support multi channel
    // searchParams.append('user_login', 'muse_tw');
    chrome.storage.local.get({
      twitchAccessToken:{accessToken: "", expired: ""}
    }, function(items) {
      accessToken = items.twitchAccessToken.accessToken;

      var url = new URL(twitchAPIUrl + '/streams');
      searchParams = new URLSearchParams({ user_login: 'ggbb528' });

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
          if (response.data && response.data.length > 0) {
            chrome.action.setIcon({ path: Icons.online });
            chrome.storage.local.set({ ggbb528Open: true });
          } else {
            chrome.action.setIcon({ path: Icons.offline });
            chrome.storage.local.set({ ggbb528Open: false });
          }
        });

    });
  };

  return {
    checkStreams,
    Icons,
  };
};
