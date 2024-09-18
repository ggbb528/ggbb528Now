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
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGgbb528Accounts from '../hooks/useGgbb528Accounts';
import { openURL } from '../utils/utility';
import { Separator } from '@/components/ui/separator';
import { Constants } from '@/configs/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import OPGGLogo from '@/assets/img/opgg.jpeg';

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
            <TooltipTrigger asChild>
              <MenubarTrigger
                className="flex-1 flex justify-center items-center"
                onClick={() => openURL(Constants.TWITCH_CHANNEL_URL)}
              >
                <FontAwesomeIcon
                  icon={faTwitch}
                  size={'xl'}
                  color={'#6441a5'}
                />
              </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">ggbb528 - Twitch 頻道</TooltipContent>
          </Tooltip>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <MenubarTrigger className="flex-1 flex justify-center items-center">
                <img src={OPGGLogo} alt="OP.GG" className="rounded-full" />
              </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">LOL戰績</TooltipContent>
          </Tooltip>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <MenubarTrigger
                className="flex-1 flex justify-center items-center"
                onClick={() => openURL(Constants.YOUTUBE_CHANNEL_URL)}
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  size={'xl'}
                  color={'#ff0000'}
                />
              </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              勝敗難免 - YouTube 頻道
            </TooltipContent>
          </Tooltip>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <MenubarTrigger
                className="flex-1 flex justify-center items-center"
                onClick={() => openURL(Constants.DISCORD_SERVER_URL)}
              >
                <FontAwesomeIcon
                  icon={faDiscord}
                  size={'xl'}
                  color={'#5865f2'}
                />
              </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              勝敗難免作文博士補習班🖍
            </TooltipContent>
          </Tooltip>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <MenubarTrigger
                className="flex-1 flex justify-center items-center"
                onClick={() => openURL(Constants.FACEBOOK_FANPAGE_URL)}
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  size={'xl'}
                  color={'#4267b2'}
                />
              </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">勝敗難免 - 臉書粉絲團</TooltipContent>
          </Tooltip>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <MenubarTrigger
                className="flex-1 flex justify-center items-center"
                onClick={() => openURL(Constants.INSTAGRAM_URL)}
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  size={'xl'}
                  color="#c13584"
                />
              </MenubarTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">jeffery0821_@IG</TooltipContent>
          </Tooltip>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
