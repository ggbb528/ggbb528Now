import { ChangeLog } from './../models/changeLog-type';
import React from 'react';

const changeLogs: ChangeLog[] = [];

function useChangeLogs() {
  return [changeLogs];
}

export default useChangeLogs;
