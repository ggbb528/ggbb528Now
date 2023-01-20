import { ChangeLog } from './../models/changeLog-type';
import moment from 'moment';

const changeLogs: ChangeLog[] = [
  {
    version: 'v1.0.2',
    date: moment('2023-01-20').toDate(),
    catalogs: [
      {
        title: '# Feat',
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
        title: '# BugFix',
        items: ['新增 OP.GG 網域的 Host permissions', '縮減 library 檔案大小'],
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: moment('2022-04-19').toDate(),
    catalogs: [
      {
        title: '# Feat',
        items: ['開台自動通知', 'OP.GG 韓服資訊', 'VOD 連結'],
      },
    ],
  },
];

function useChangeLogs() {
  return [changeLogs];
}

export default useChangeLogs;
