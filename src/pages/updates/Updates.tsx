import React from 'react';
import '@pages/updates/Updates.css';
import ggbb528cheer from '@assets/img/ggbb528cheer.gif';
import ChangeLogSection from './components/ChangeLogSection';

export default function Updates(): JSX.Element {
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="flex flex-row p-4 mx-auto justify-center items-center">
        <div className="mx-4">
          <img
            src={ggbb528cheer}
            className="pointer-events-none h-12 w-12"
            alt="ggbb528cheer"
          />
        </div>
        <div className="mx-4">
          <h1 className="font-medium leading-tight text-5xl">
            ggbb528now 更新紀錄
          </h1>
        </div>
      </div>
      <ChangeLogSection />
    </div>
  );
}
