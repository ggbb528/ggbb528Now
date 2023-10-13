function LiveIcon() {
  return (
    <div className="inline-flex items-center justify-center h-3 w-3 relative">
      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </div>
  );
}

export default LiveIcon;
