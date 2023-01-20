import { OptionKey } from '@src/configs/optionKeys';
import React from 'react';
import useChromeSyncStorage from '../hooks/useChromeSyncStorage';

export default function OptionItem({ name, text, defaultValue }: OptionKey) {
  const [value, setValue] = useChromeSyncStorage(name, defaultValue);

  return (
    <div className="form-group form-check text-center mb-6">
      <input
        type="checkbox"
        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
        id={`option-${name}`}
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
      />
      <label
        className="form-check-label inline-block text-gray-800"
        htmlFor={`option-${name}`}
      >
        {text}
      </label>
    </div>
  );
}
