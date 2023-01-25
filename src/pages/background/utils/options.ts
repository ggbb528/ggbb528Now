import { OptionKey } from '@configs/optionKeys';
import { getSyncStorageValue } from './storage';

export async function getOptionValue(optionKey: OptionKey) {
  try {
    const optionValue = await getSyncStorageValue<OptionKey['defaultValue']>(
      optionKey.name
    );
    if (optionValue === undefined) return optionKey.defaultValue;
    return optionValue;
  } catch (e) {
    return optionKey.defaultValue;
  }
}
