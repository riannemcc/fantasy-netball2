import React, { ReactElement } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { NavBar } from '_components/NavBar';
import { SessionProvider } from 'next-auth/react';

import '_styles/tailwind.css';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="XRn9mH8E2RDlxqaaVopqOaBVs20gv2FnvvE4KjRrquo"
        />
        <title>Fantasy Netball</title>
        <link rel="icon" href="/logo.png" />
        {/* <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="Fantasy Netball" /> */}
      </Head>
      <SessionProvider session={pageProps.session}>
        <NavBar />
        <main>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  );
};

export default MyApp;
