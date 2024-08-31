import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import Navbar from '@/components/organisms/Navbar';
import { Notifications } from '@mantine/notifications';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Next.js with Express and DynamoDB</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Notifications />
    </MantineProvider>
  );
}
