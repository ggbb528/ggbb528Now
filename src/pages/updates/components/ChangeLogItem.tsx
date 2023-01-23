import moment from 'moment';
import React from 'react';
import { ChangeLog } from '../models/changeLog-type';

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
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
