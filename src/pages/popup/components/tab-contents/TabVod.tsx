import React from 'react';
import { useVodList } from '../../hooks/useVodList';

function TabVod() {
  const [vodList] = useVodList();
  return <div>TabVod</div>;
}

export default TabVod;
