import { ChangeLog } from './../models/changeLog-type';
import moment from 'moment';

const changeLogs: ChangeLog[] = [
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

function useChangeLogs() {
  return [changeLogs];
}

export default useChangeLogs;
