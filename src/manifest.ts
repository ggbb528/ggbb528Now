import pkg from '../package.json';
import { ManifestType } from '@src/manifest-type';

const manifest: ManifestType = {
  manifest_version: 3,
  name: pkg.displayName,
  version: pkg.version,
  description: pkg.description,
  options_page: 'src/pages/options/index.html',
  permissions: ['alarms', 'storage', 'notifications'],
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icons/icon_32.png',
  },
  chrome_url_overrides: {},
  icons: {
    '16': 'icons/icon_16.png',
    '32': 'icons/icon_32.png',
    '48': 'icons/icon_48.png',
    '128': 'icons/icon_128.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      css: ['contentStyle.css'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'contentStyle.css',
        'icons/icon_16.png',
        'icons/icon_32.png',
        'icons/icon_48.png',
        'icons/icon_128.png',
      ],
      matches: [],
    },
  ],
};

export default manifest;
