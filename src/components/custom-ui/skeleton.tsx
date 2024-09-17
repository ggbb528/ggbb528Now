export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-gray-300 rounded-full dark:bg-gray-700 animate-pulse ${className}`}
    ></div>
  );
}
