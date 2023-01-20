import React from 'react';
import '@pages/options/Options.css';
import OptionItem from './components/OptionItem';
import { OptionKeys } from '@src/configs/optionKeys';

export default function Options(): JSX.Element {
  return (
    <div className="container mx-auto pt-4 text-lg block max-w-sm">
      <div className="flex flex-col items-start">
        <OptionItem {...OptionKeys.OPTION_KEY_UPGRADE_NOTIFICATION} />
        <OptionItem {...OptionKeys.OPTION_KEY_LIVE_NOTIFICATION} />
      </div>
    </div>
  );
}
