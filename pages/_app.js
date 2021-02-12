import React, { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NavBar } from "../src/components/NavBar";
import { Provider } from "next-auth/client";
import { Footer } from "../src/components/Footer";

import "../styles/tailwind.css";

const MyApp = ( { Component, pageProps } ) => {
  const { basePath } = useRouter();

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="XRn9mH8E2RDlxqaaVopqOaBVs20gv2FnvvE4KjRrquo" />
        <title>Fantasy Netball</title>
        <link rel="icon" href="/logo.png" />
        {/* <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="Fantasy Netball" /> */}
      </Head>
      <Provider session={ pageProps.session }>
        <NavBar />
        <main>
          <Component { ...pageProps } />
        </main>
        {/* <Footer /> */ }
      </Provider>
    </>
  );
};

export default MyApp;

export async function getServerSideProps ( context ) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
