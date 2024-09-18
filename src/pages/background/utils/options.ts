import { OptionKey } from '@/configs/optionKeys';
import { getSyncStorageValue } from './storage';

export async function getOptionValue(optionKey: OptionKey) {
  const optionValue = await getSyncStorageValue(optionKey.name);

  if (optionValue === undefined) return optionKey.defaultValue;
  return optionValue;
}
