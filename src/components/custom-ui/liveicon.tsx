import { Account } from '@/pages/popup/models/spectate-type';
import Tooltip from './tooltip';

function LiveIcon({
  tooltipPos = 'top',
  showTooltip = true,
  account = undefined,
}: {
  tooltipPos?: 'top' | 'bottom';
  showTooltip?: boolean;
  account?: Account;
}) {
  const Icon = (
    <div className="inline-flex items-center justify-center h-3 w-3 relative">
      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </div>
  );

  if (!showTooltip) return Icon;

  let message = '';
  if (account)
    message += `(${account.server.toUpperCase()}) ${account.accountId} `;
  message += '正在遊戲中';

  return (
    <Tooltip message={message} position={tooltipPos}>
      {Icon}
    </Tooltip>
  );
}

export default LiveIcon;
