import * as fs from 'fs';
import * as path from 'path';
import colorLog from '../log';
import { PluginOption } from 'vite';
import useChangeLogs from '../../src/pages/updates/hooks/useChangeLogs';
import { ChangeLog } from '../../src/pages/updates/models/changeLog-type';

const { resolve } = path;

const outDir = resolve(__dirname, '..', '..');

function jsonToMarkdown(changeLogs: ChangeLog[]): string {
  return changeLogs
    .map((log) => {
      const formattedDate = new Date(log.date).toISOString().split('T')[0]; // "YYYY-MM-DD"
      // Convert catalog items to Markdown list
      const catalogMarkdown = log.catalogs
        .map((catalog) => {
          const title = catalog.title.replace('# ', '### '); // Convert "# " to "### "
          const items = catalog.items.map((item) => `- ${item}`).join('\n');
          return `${title}\n\n${items}`;
        })
        .join('\n\n');

      return `## ${log.version} (${formattedDate})\n\n${catalogMarkdown}`;
    })
    .join('\n\n');
}

export default function makeChangeLog(): PluginOption {
  return {
    name: 'make-changelog',
    buildEnd() {
      const [changeLogs] = useChangeLogs();
      const changeLogPath = resolve(outDir, 'CHANGELOG.md');

      fs.writeFileSync(changeLogPath, jsonToMarkdown(changeLogs));

      colorLog(`CHANGELOG.md file copy complete: ${changeLogPath}`, 'success');
    },
  };
}
