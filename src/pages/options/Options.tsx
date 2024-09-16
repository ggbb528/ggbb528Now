import React from 'react';
import '@/pages/options/Options.css';
import OptionItem from './components/OptionItem';
import { OptionKeys } from '@/configs/optionKeys';

export default function Options(): JSX.Element {
  return (
    <div className="container mx-auto pt-4 text-lg block max-w-sm">
      <div className="flex flex-col items-start">
        {Object.keys(OptionKeys).map((key) => (
          <OptionItem key={key} {...OptionKeys[key]} />
        ))}
      </div>
    </div>
  );
}
