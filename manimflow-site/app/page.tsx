import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/main";
import styles from "../styles/Home.module.css";
import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manim Flow | AI Generated Manim Videos",
  description:
    "Generate maths videos with the Manim Python library by prompting this AI assistant.",
  generator: "Next.js",
  applicationName: "Manim Flow",
  referrer: "origin-when-cross-origin",
  keywords: ["Manim Flow", "Manim", "Python", "AI", "Maths", "Videos"],
  authors: [{ name: "Richard Collins" }],
  creator: "Richard Collins",
  publisher: "Richard Collins",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Main />
    </div>
  );
};

export default Home;
