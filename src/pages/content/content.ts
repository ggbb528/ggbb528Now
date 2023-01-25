import { runModules } from './modules';
import { AppError } from './utils/error';
import appLog from './utils/log';
import { isValidPlatform } from './utils/platform';

async function runExtensionContentScript() {
  try {
    if (!isValidPlatform()) return;
    appLog('[' + __APP_VERSION__ + '] running...');

    // running modules
    runModules();
  } catch (e) {
    if (!(e instanceof AppError)) {
      throw e;
    }
    appLog(e.appMsg, 'error');
  }
}

try {
  runExtensionContentScript();
} catch (e) {
  console.error(e);
}
