import Tooltip from './Tooltip';

function LiveIcon({
  tooltipPos = 'top',
  showTooltip = true,
}: {
  tooltipPos?: 'top' | 'bottom';
  showTooltip?: boolean;
}) {
  const Icon = (
    <div className="inline-flex items-center justify-center h-3 w-3 relative">
      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </div>
  );

  if (!showTooltip) return Icon;

  return (
    <Tooltip message="正在遊戲中" position={tooltipPos}>
      {Icon}
    </Tooltip>
  );
}

export default LiveIcon;
