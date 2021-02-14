import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NavBar } from "../src/components/NavBar";
import { Provider } from "next-auth/client";
import { Footer } from "../src/components/Footer";

import "../styles/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  const [userState, setUserState] = useState({
    currentUser: null,
    isFetchingUser: true
  })
  const { basePath } = useRouter();

  useEffect(() => {
    let cancelRequest = false
    const loadUser = async () => {
      let currentUser = null
      try {
        const res = await fetch("/api/current-user");
        currentUser = await res.json();
      } catch (error) {
        cancelRequest = true
      }
      if (!cancelRequest) {
        setUserState({ currentUser, isFetchingUser: false })
      }
    }
    loadUser()
    return () => {
      cancelRequest = true
    }
  }, [pageProps.session])

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="XRn9mH8E2RDlxqaaVopqOaBVs20gv2FnvvE4KjRrquo" />
        <title>Fantasy Netball</title>
        <link rel="icon" href="/logo.png" />
        {/* <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="Fantasy Netball" /> */}
      </Head>
      <Provider session={pageProps.session}>
        <NavBar currentUser={userState.currentUser} />
        <main>
          <Component {...pageProps} currentUser={userState.currentUser} />
        </main>
        {/* <Footer /> */}
      </Provider>
    </>
  );
};

export default MyApp;
