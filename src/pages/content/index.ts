// import ts module
const script = document.createElement('script');
script.setAttribute('type', 'module');
script.setAttribute(
  'src',
  chrome.extension.getURL('src/pages/content/content.js')
);
const head =
  document.head ||
  document.getElementsByTagName('head')[0] ||
  document.documentElement;
head.insertBefore(script, head.lastChild);

// import tailwindCSS
const link = document.createElement('script');
link.setAttribute('src', 'https://cdn.tailwindcss.com');
head.insertBefore(link, head.lastChild);
