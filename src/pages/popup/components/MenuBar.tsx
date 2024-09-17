import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  faDiscord,
  faFacebook,
  faTwitch,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import opggLogo from '@/assets/img/opgglogo.svg';
import useGgbb528Accounts from '../hooks/useGgbb528Accounts';
import { openURL } from '../utils/utility';
import { Separator } from '@/components/ui/separator';
import { Constants } from '@/configs/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function MenuBar() {
  const { data: accounts } = useGgbb528Accounts();
  enum ServerName {
    kr = '韓服',
    tw = '台服',
  }

  return (
    <div className="w-full p-1">
      <Menubar className="flex justify-between">
        <MenubarMenu>
          <Tooltip>
            <TooltipTrigger>
              <MenubarTrigger
                className="flex justify-center items-center"
                onClick={() => openURL(Constants.TWITCH_CHANNEL_URL)}
              >
                <FontAwesomeIcon
                  icon={faTwitch}
                  size={'xl'}
                  color={'#6441a5'}
                />
              </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent>Twitch 頻道</TooltipContent>
          </Tooltip>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <MenubarTrigger className="flex justify-center items-center">
            <img alt="opgg logo" src={opggLogo} className="h-[22px] w-[40px]" />
          </MenubarTrigger>
          <MenubarContent>
            {accounts?.map((account) => (
              <MenubarItem
                key={account.summoner_id}
                onClick={() => openURL(account.url)}
              >
                {ServerName[account.server]} - {account.account_id}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <MenubarTrigger
            className="flex justify-center items-center"
            onClick={() => openURL(Constants.YOUTUBE_CHANNEL_URL)}
          >
            <FontAwesomeIcon icon={faYoutube} size={'xl'} color={'#ff0000'} />
          </MenubarTrigger>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <MenubarTrigger
            className="flex justify-center items-center"
            onClick={() => openURL(Constants.DISCORD_SERVER_URL)}
          >
            <FontAwesomeIcon icon={faDiscord} size={'xl'} color={'#5865f2'} />
          </MenubarTrigger>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <MenubarTrigger
            className="flex justify-center items-center"
            onClick={() => openURL(Constants.FACEBOOK_FANPAGE_URL)}
          >
            <FontAwesomeIcon icon={faFacebook} size={'xl'} color={'#4267b2'} />
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
