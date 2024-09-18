import { createRoot } from 'react-dom/client';
import '@/assets/styles/tailwind.css';
import Updates from '@/pages/updates/Updates';

function init() {
  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Updates root element");
  const root = createRoot(rootContainer);
  root.render(<Updates />);
}

init();
