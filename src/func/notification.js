module.exports = () => {
    const streamOpen = (id, title, message) => {
        chrome.notifications.clear(id, function(){});

        var notificationOptions = {
            type: "basic",
            iconUrl: "images/TwitchGlitchPurple.png",
            title: title,
            message: message,
            isClickable: true
        };
        
        chrome.notifications.create(id, notificationOptions, function(){});
    }

    return {
        streamOpen,
    }
}