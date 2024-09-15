import changeLogs from '../data/change-logs.json';
import { ChangeLog } from '../models/changeLog-type';

function useChangeLogs() {
  return [
    changeLogs.map((changeLog) => {
      return {
        ...changeLog,
        date: new Date(changeLog.date),
      } as ChangeLog;
    }),
  ];
}

export default useChangeLogs;
