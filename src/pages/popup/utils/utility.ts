export function openURL(link: string) {
  chrome.tabs.create({ url: link });
}
