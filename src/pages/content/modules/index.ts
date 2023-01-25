import { OptionKeys } from '@src/configs/optionKeys';
import { getOptionValue } from '@src/pages/background/utils/options';

import autoClaim from './auto_claim';
import mottoMenu from './motto_menu';

export async function runModules() {
  if (await getOptionValue(OptionKeys.OPTION_KEY_AUTO_CLAIM)) {
    autoClaim();
  }
  if (await getOptionValue(OptionKeys.OPTION_KEY_GGBB528_MOTTO)) {
    mottoMenu();
  }
}
