import { createRoot } from 'react-dom/client';
import appLog from '../../utils/log';
import MottoMenuButton from './components/MottoMenuButton';

const CHAT_SETTINGS_BUTTON_CONTAINER_SELECTOR =
  '.chat-input div[data-test-selector="chat-input-buttons-container"]';

export default function mottoMenu() {
  appLog('mottoMenu');

  const container = document.querySelector(
    CHAT_SETTINGS_BUTTON_CONTAINER_SELECTOR
  );
  if (container == null) {
    return;
  }
  const rightContainer = container.lastChild;
  const buttonContainer = document.createElement('div');
  rightContainer?.insertBefore(buttonContainer, rightContainer.lastChild);

  const mountedRoot = createRoot(buttonContainer);
  mountedRoot.render(<MottoMenuButton />);
}
