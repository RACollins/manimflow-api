import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/main";
import styles from "../styles/Home.module.css";
import "../styles/globals.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Manim Flow | AI Generated Manim Videos</title>
        <meta
          name="description"
          content="Generate maths videos with the Manim Python library by prompting an AI."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />
    </div>
  );
};

export default Home;
