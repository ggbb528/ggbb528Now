import moment from 'moment';
import { ChangeLog } from '../models/changeLog-type';

const parseMarkdownLinks = (text: string) => {
  // Regular expression to match Markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)]\((https?:\/\/[^\\)]+)\)/g;

  // Split the text and map over it
  const parts = [];
  let lastIndex = 0;

  text.replace(markdownLinkRegex, (match, p1, p2, offset) => {
    // Add text before the match
    if (offset > lastIndex) {
      parts.push(text.substring(lastIndex, offset));
    }
    // Add the link
    parts.push(
      <a
        className="text-blue-500 underline"
        key={offset}
        href={p2}
        target="_blank"
        rel="noopener noreferrer"
      >
        {p1}
      </a>
    );
    lastIndex = offset + match.length;
    return match;
  });

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

export default function ChangeLogItem({ version, date, catalogs }: ChangeLog) {
  return (
    <article className="text-base p-4 my-4">
      <div className="grid grid-cols-3 gap-4 items-start">
        <div>
          <h2 className="font-medium leading-tight text-3xl mt-0 mb-2 text-black">
            {version}
          </h2>
          <time className="text-gray-400">
            {moment(date).format('MMMM DD, YYYY')}
          </time>
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          {catalogs.map((catalog, i) => (
            <div key={i}>
              <h4 className="font-medium leading-tight text-2xl mt-0 mb-2 text-black">
                {catalog.title}
              </h4>
              <ul className="text-lg list-disc">
                {catalog.items.map((item, j) => (
                  <li key={j}>{parseMarkdownLinks(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
