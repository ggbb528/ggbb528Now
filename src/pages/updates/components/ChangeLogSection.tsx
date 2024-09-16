import useChangeLogs from '../hooks/useChangeLogs';
import ChangeLogItem from './ChangeLogItem';
import { Separator } from '@/components/ui/separator';

export default function ChangeLogSection() {
  const [changeLogs] = useChangeLogs();
  return (
    <section>
      {changeLogs.map((changeLog, index) => (
        <>
          {index !== 0 && <Separator />}
          <ChangeLogItem key={index} {...changeLog} />
        </>
      ))}
    </section>
  );
}
