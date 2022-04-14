module.exports = () => {
    // Variable
    var accessToken = 'gs2cxwq056jcelg0knaw6gl4pxnygd';
    var clientId = '3cppb0bah5pvz8p27qy1c5i3zbfwg7';
    var twitchAPIUrl = 'https://api.twitch.tv/helix';

    const checkStreams = () => {
        var url = new URL(twitchAPIUrl + '/streams');
        searchParams = new URLSearchParams({user_login: 'ggbb528'});
        // when support multi channel
        // searchParams.append('user_login', 'muse_tw');

        url.search = searchParams.toString()
        var option = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Client-ID': clientId
            }
        }

        fetch(url, option)
        .then((response) => response.json())
        .then((response) => {
            if (response.data.length > 0) {
                chrome.action.setBadgeBackgroundColor({color: "#ff0000"});
                chrome.action.setBadgeText({text: "Live"});
                chrome.storage.local.set({ggbb528Open: true});
            } else {
                chrome.action.setBadgeText({text: ""});
                chrome.storage.local.set({ggbb528Open: false});
            }            
        });
    }

    return {
        checkStreams,
    }
}