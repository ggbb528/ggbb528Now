import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ButtonsGroup from './components/ButtonsGroup';
import Content from './components/Content';
import Header from './components/Header';
import NavigatorBar from './components/NavigatorBar';

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

export default function Popup(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-white flex flex-col">
        <Header />
        <ButtonsGroup />
        <Content className="flex-1 overflow-auto" />
        <NavigatorBar />
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="top-left" />
      {import.meta.env.VITE_DEV_MODE && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction position="top-left" />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
}
