import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './styles.css';
import { SWRConfig } from 'swr';
import { theme } from '../theme';
import { fetcher } from '@/hooks/useApi';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Mantine Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <nav>
        <ul>
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/super-heroes">Super Heroes</Link>
          </li>
          <li>
            <Link href="/rq-super-heroes">RQ Super Heroes</Link>
          </li>
          <li>
            <Link href="/tanstack-table">Tanstack Table</Link>
          </li>
          <li>
            <Link href="/swr">SWR</Link>
          </li>
        </ul>
      </nav>

      <QueryClientProvider client={queryClient}>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </MantineProvider>
  );
}
