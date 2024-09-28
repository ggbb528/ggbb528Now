import ggbb528cheer from '@/assets/img/ggbb528cheer.gif';

function IconGgbb528cheer() {
  return (
    <img
      src={ggbb528cheer}
      className="pointer-events-none h-6 w-6"
      alt="ggbb528cheer"
    />
  );
}

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center text-black bg-purple-200 p-1">
      <div className="flex items-center justify-center gap-1">
        <div className="flex items-center justify-center">
          {Array.from({ length: 4 }).map((_, id) => (
            <IconGgbb528cheer key={id} />
          ))}
        </div>
        <div className="text-2xl font-bold mx-1">勝敗難免</div>
        <div className="flex items-center justify-center">
          {Array.from({ length: 4 }).map((_, id) => (
            <IconGgbb528cheer key={id} />
          ))}
        </div>
      </div>
    </header>
  );
}
