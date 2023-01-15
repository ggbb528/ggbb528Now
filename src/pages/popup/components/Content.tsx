import React from 'react';
import TabRanking from './tab-contents/TabRanking';
import TabStatistics from './tab-contents/TabStatistics';
import TabVod from './tab-contents/TabVod';

interface TabPaneProps {
  target: string;
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
}
function TabPane(props: TabPaneProps) {
  return (
    <div
      className={`tab-pane fade ${props.active ? 'show active' : ''} ${
        props.className
      }`}
      id={`${props.target}`}
      role="tabpanel"
      aria-labelledby={`${props.target}-tab`}
    >
      {props.children}
    </div>
  );
}

export default function Content() {
  return (
    <div className="tab-content" id="tabs-tabContent">
      <TabPane target="ranking" active>
        <TabRanking />
      </TabPane>
      <TabPane target="statistics">
        <TabStatistics />
      </TabPane>
      <TabPane target="vod">
        <TabVod />
      </TabPane>
    </div>
  );
}
