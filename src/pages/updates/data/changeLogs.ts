import { ChangeLog } from './../models/changeLog-type';
import moment from 'moment';

export const changeLogs: ChangeLog[] = [
  {
    version: 'v1.0.12',
    date: moment('2024-09-15').toDate(),
    catalogs: [
      {
        title: '# Fixed',
        items: ['升級至 Manifest V3', '修正輕微 bug'],
      },
    ],
  },
  {
    version: 'v1.0.11',
    date: moment('2023-10-15').toDate(),
    catalogs: [
      {
        title: '# Add',
        items: [
          '因為勝敗帳號太多了, 帳號清單改由動態抓取, 新增 ggbb528.com 網域權限',
          '帳號根據最後遊玩時間排序, 方便知道主播目前遊玩的帳號',
        ],
      },
    ],
  },
  {
    version: 'v1.0.10',
    date: moment('2023-10-05').toDate(),
    catalogs: [
      {
        title: '# Fixed',
        items: [
          '修正 Live Game Bug',
          '移除 台服帳號 - 愛麗絲班長, 新增 台服帳號 - 心中有劍鋒芒畢現',
        ],
      },
    ],
  },
  {
    version: 'v1.0.9',
    date: moment('2023-04-23').toDate(),
    catalogs: [
      {
        title: '# Add',
        items: ['我艾希＊效應，VOD沒東西時顯示 ggbb528cry'],
      },
    ],
  },
  {
    version: 'v1.0.8',
    date: moment('2023-02-27').toDate(),
    catalogs: [
      {
        title: '# Fixed',
        items: ['修正即時遊戲頁面排版與錯誤資訊'],
      },
    ],
  },
  {
    version: 'v1.0.7',
    date: moment('2023-02-26').toDate(),
    catalogs: [
      {
        title: '# Add',
        items: ['新增台服帳號 - 愛麗絲班長', '新增即時遊戲資訊'],
      },
    ],
  },
  {
    version: 'v1.0.6',
    date: moment('2023-02-25').toDate(),
    catalogs: [
      {
        title: '# Add',
        items: ['新增台服帳號 - 戀愛大師勝敗難免'],
      },
    ],
  },
  {
    version: 'v1.0.5',
    date: moment('2023-02-11').toDate(),
    catalogs: [
      {
        title: '# Add',
        items: [
          '聊天室網址超連結',
          'LOL 牌位顯示包含彈性積分戰績(彈性積分戰績角色名稱右上方紅點標示)',
        ],
      },
    ],
  },
  {
    version: 'v1.0.4',
    date: moment('2023-01-24').toDate(),
    catalogs: [
      {
        title: '# Add',
        items: ['聊天室表情符號&時間紀錄'],
      },
      {
        title: '# Fixed',
        items: ['聊天室 Bug'],
      },
    ],
  },
  {
    version: 'v1.0.3',
    date: moment('2023-01-23').toDate(),
    catalogs: [
      {
        title: '# Add',
        items: ['新增聊天室訊息, 紀錄最近的50筆留言', '新增 Discord 連結'],
      },
      {
        title: '# Fixed',
        items: ['開台通知預設失效問題'],
      },
    ],
  },
  {
    version: 'v1.0.2',
    date: moment('2023-01-20').toDate(),
    catalogs: [
      {
        title: '# Add',
        items: [
          '新增 OPGG 台服積分',
          '增加選項頁面選擇是否關掉部分功能',
          '頁面調整',
        ],
      },
    ],
  },
  {
    version: 'v1.0.1',
    date: moment('2022-04-21').toDate(),
    catalogs: [
      {
        title: '# Fixed',
        items: ['新增 OP.GG 網域的 Host permissions', '縮減 library 檔案大小'],
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: moment('2022-04-19').toDate(),
    catalogs: [
      {
        title: '# Add',
        items: ['開台自動通知', 'OP.GG 韓服資訊', 'VOD 連結'],
      },
    ],
  },
];
