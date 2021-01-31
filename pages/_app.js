import React, { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NavBar } from "../src/components/NavBar";
import { Provider } from "next-auth/client";
// import { AppProps } from 'next/app'

import "../styles/main.css";

const MyApp = ({ Component, pageProps }) => {
  const { basePath } = useRouter();

  return (
    <>
      <Provider session={pageProps.session}>
        <Head>
          <title>Fantasy Netball</title>
          <link rel="icon" href="/favicon.ico" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="Fantasy Netball" />
        </Head>
        <main>
          <NavBar />
          <h1 className="title">Welcome to Macca's Fantasy Netball</h1>
          {/* <Layout /> */}
        </main>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
