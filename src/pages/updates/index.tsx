import React from 'react';
import { createRoot } from 'react-dom/client';
import Updates from '@pages/updates/Updates';
import '@pages/updates/index.css';

function init() {
  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Updates root element");
  const root = createRoot(rootContainer);
  root.render(<Updates />);
}

init();
