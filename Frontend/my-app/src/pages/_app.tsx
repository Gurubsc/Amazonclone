import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/Main.css';
import '@/styles/lib/lightbox/css/lightbox.min.css';
import '@/styles/lib/owlcarousel/assets/owl.carousel.min.css';
import Layout from "@/publicWebsite/layout/layoutProvider";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>

        <Head>
          <title>ShopNest</title>
          <link rel="icon" href="/icon.png" />

        </Head>
        <Component {...pageProps} />

    </Layout>
  );
}

