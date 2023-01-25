const REACT_ROOT = '#root';
const CHAT_CONTAINER =
  'section[data-test-selector="chat-room-component-layout"]';
const VOD_CHAT_CONTAINER = '.qa-vod-chat,.va-vod-chat';
const CHAT_LIST = '.chat-list,.chat-list--default,.chat-list--other';
const VOD_CHAT_LIST = '.chat-shell';
const PLAYER =
  'div[data-a-target="player-overlay-click-handler"],.video-player';
const CLIPS_BROADCASTER_INFO = '.clips-broadcaster-info';
const CHAT_MESSAGE_SELECTOR = '.chat-line__message';
const CHAT_INPUT =
  'textarea[data-a-target="chat-input"], div[data-a-target="chat-input"]';
const CHAT_WYSIWYG_INPUT_EDITOR = '.chat-wysiwyg-input__editor';
const COMMUNITY_HIGHLIGHT = '.community-highlight';

function searchReactParents(
  node: any,
  predicate: (node: any) => boolean,
  maxDepth = 15,
  depth = 0
): any {
  try {
    if (predicate(node)) {
      return node;
    }
  } catch (e) {
    console.log(e);
  }

  if (!node || depth > maxDepth) {
    return null;
  }

  const { return: parent } = node;
  if (parent) {
    return searchReactParents(parent, predicate, maxDepth, depth + 1);
  }

  return null;
}

export function getReactInstance(element: Element | null) {
  if (element === null) return null;
  for (const [key, value] of Object.entries(element)) {
    if (key.startsWith('__reactInternalInstance$')) {
      return value;
    }
  }
  return null;
}

export function getCurrentChat() {
  const node = searchReactParents(
    getReactInstance(document.querySelector(CHAT_CONTAINER)),
    (n) => n.stateNode && n.stateNode.props && n.stateNode.props.onSendMessage
  );

  return node.stateNode;
}
