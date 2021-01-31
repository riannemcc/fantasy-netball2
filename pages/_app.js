import React, { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NavBar } from "../src/components/NavBar";
import { Provider } from "next-auth/client";

import "../styles/tailwind.css";

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
