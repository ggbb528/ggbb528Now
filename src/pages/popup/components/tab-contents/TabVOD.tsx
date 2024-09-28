import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useVODList from '@/pages/popup/hooks/useVODList';
import { VOD } from '../../models/vod-type';
import moment from 'moment';
import { openURL } from '../../utils/utility';
import ggbb528cry from '@/assets/img/ggbb528cry.png';
import { Skeleton } from '@/components/ui/skeleton';

const WIDTH = 350;
const HEIGHT = 200;

function LoadingReplacer() {
  return (
    <div className="space-y-2 my-2">
      {Array.from({ length: 2 }).map((_, id) => (
        <div key={id} className="px-2 flex flex-col space-y-2">
          <Skeleton className={`h-[150px] rounded-xl`} />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px] rounded-xl" />
            <Skeleton className="h-4 w-[250px] rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyReplacer() {
  return (
    <div className="w-full  flex justify-center pt-20">
      <img
        src={ggbb528cry}
        className="pointer-events-none h-40 w-40 opacity-50"
        alt="ggbb528cheer"
      />
    </div>
  );
}

function VodItem({ vod }: { vod: VOD }) {
  const thumbnailURL = `${vod.thumbnail_url}`
    .replace('%{width}', `${WIDTH}`)
    .replace('%{height}', `${HEIGHT}`);

  const handleOnClick = () => {
    openURL(vod.url);
  };

  return (
    <div className="flex flex-col justify-center ">
      <a href={vod.url} title={vod.title} onClick={handleOnClick}>
        <img src={thumbnailURL} alt={vod.title} />
      </a>
      <div className="px-2 flex flex-row">
        <div className="p-1 flex justify-center items-center w-1/12 mx-1">
          <FontAwesomeIcon
            className="m-auto"
            icon={faTwitch}
            size={'2x'}
            color={'#6441a5'}
          />
        </div>
        <div className="p-1 flex flex-col w-11/12 text-left">
          <div className="truncate text-base ">
            <a
              onClick={handleOnClick}
              href={vod.url}
              title={vod.title}
              className="text-blue-500 hover:text-blue-800 transition duration-300 ease-in-out"
            >
              {vod.title}
            </a>
          </div>
          <div className="flex flex-row  text-xs">
            <div className="w-1/2">觀看次數: {vod.view_count}</div>
            <div className="w-1/2">{moment(vod.published_at).fromNow()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TabVOD() {
  const { data: vods, isLoading } = useVODList();

  return (
    <>
      {isLoading && <LoadingReplacer />}
      {vods && vods.map((vod: VOD) => <VodItem key={vod.id} vod={vod} />)}
      {vods && vods.length === 0 && <EmptyReplacer />}
    </>
  );
}
