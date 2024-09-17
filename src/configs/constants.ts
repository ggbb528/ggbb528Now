import { Account } from '@/pages/popup/models/account-type';

export const Constants = {
  TWITCH_CHANNEL: 'ggbb528',
  TWITCH_CHANNEL_URL: 'https://www.twitch.tv/ggbb528',
  TWITCH_API_URL: 'https://api.twitch.tv/helix',
  TWITCH_AUTH_API_URL: 'https://id.twitch.tv/oauth2',
  YOUTUBE_CHANNEL_URL: 'https://www.youtube.com/c/ggbb528',
  FACEBOOK_FANPAGE_URL: 'https://www.facebook.com/JeffeRy0821',
  DISCORD_SERVER_URL: 'https://discord.gg/XJeWYpUg8t',
  INSTAGRAM_URL: 'https://www.instagram.com/jeffery0821_',
};

export const OPGG_ACCOUNTS: Account[] = [
  {
    url: 'https://www.op.gg/summoners/kr/%EC%A4%80%20%EB%B0%9B',
    summoner_id: '8YQfn73hCIePhQZxcdzhtJFl3HBLPFGD6RM-QVvUMheuw1M',
    server: 'kr',
    account_id: '준 받',
  },
  {
    url: 'https://www.op.gg/summoners/tw/Twitch%E5%8B%9D%E6%95%97%E9%9B%A3%E5%85%8D',
    summoner_id: 'CUqyc-fBVMFvy5tNAyj6IVSG_Sko3Tl1wk6M7H0vDA61NFVgBdOX5SN6LQ',
    server: 'tw',
    account_id: 'Twitch勝敗難免',
  },
];
