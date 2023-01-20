import React from 'react';
import useChangeLogs from '../hooks/useChangeLogs';
import ChangeLogItem from './ChangeLogItem';

export default function ChangeLogSection() {
  const [changeLogs] = useChangeLogs();
  return (
    <section>
      {changeLogs.map((changeLog, index) => (
        <ChangeLogItem key={index} {...changeLog} />
      ))}
    </section>
  );
}
