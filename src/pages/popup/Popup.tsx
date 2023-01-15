import React from 'react';
import ButtonsGroup from './components/ButtonsGroup';
import Content from './components/Content';
import Header from './components/Header';
import NavigatorBar from './components/NavigatorBar';

export default function Popup(): JSX.Element {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-white flex flex-col">
      <Header />
      <ButtonsGroup />
      <Content className="flex-1 overflow-auto" />
      <NavigatorBar />
    </div>
  );
}
