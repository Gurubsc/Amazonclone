import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Navbar from "../publicWebsite/layout/header";
import { Main } from "next/document";
import Hero from "@/publicWebsite/components/Home/main";
import Cards from "@/publicWebsite/components/Home/cards";
import Features from "@/publicWebsite/components/Home/support";
import Footer from "@/publicWebsite/layout/footer";
import SecondCard from "@/publicWebsite/components/Home/secondCard";
import Products from "@/publicWebsite/components/Home/Sample";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
   
    <Hero />
    <Cards />
    <Features />
    <SecondCard />
    <Products />
    </>
  );
}