import '@/pages/options/Options.css';
import OptionItem from './components/OptionItem';
import { OptionKeys } from '@/configs/optionKeys';
import { Separator } from '@/components/ui/separator';
import { FaGithub, FaHistory } from 'react-icons/fa';
import { openURL } from '../popup/utils/utility';
import { Constants } from '@/configs/constants';

export default function Options(): JSX.Element {
  return (
    <div className="container mx-auto text-lg block max-w-sm">
      <div className="flex flex-col items-start gap-4 p-4">
        {Object.keys(OptionKeys).map((key) => (
          <OptionItem key={key} {...OptionKeys[key]} />
        ))}
      </div>
      <Separator />
      <div className="flex gap-2 py-2 px-4 text-sm">
        <div className="w-20">
          <a
            className="flex items-center justify-start gap-1  text-gray-500 hover:text-primary"
            href="#"
            onClick={() => openURL(Constants.PROJECT_GITHUB_URL)}
          >
            <FaGithub />
            <span>Github</span>
          </a>
        </div>
        <div className="w-20">
          <a
            className="flex items-center justify-start gap-1  text-gray-500 hover:text-primary"
            href="#"
            onClick={() => openURL('src/pages/updates/index.html')}
          >
            <FaHistory />
            <span>更新紀錄</span>
          </a>
        </div>
      </div>
    </div>
  );
}
