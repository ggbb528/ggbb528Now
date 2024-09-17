import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import Header from './components/Header';
import TabPages from './components/TabPages';
import MenuBar from './components/MenuBar';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

export default function Popup(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-white flex flex-col">
          <Header />
          <MenuBar />
          <TabPages />
        </div>
      </TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      {import.meta.env.VITE_DEV_MODE && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction buttonPosition="top-right" />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
}
