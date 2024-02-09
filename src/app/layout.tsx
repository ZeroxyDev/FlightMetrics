"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Titlebar from "./components/titlebar";
import { MCDUContextProvider } from "./context/mcduContext";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }, []);
  
  return (
    <html lang="en">
      <body className={"rounded-[40px] m-0 bg-transparent overflow-hidden"}>
        <div className='bg-background w-full h-[600px] flex justify-center items-center bordernone border-tertiary rounded-big'>
        <div className='h-12 block'><Titlebar /></div>
        <div className='w-full flex justify-center items-center h-full '>
        <MCDUContextProvider>
          {children}
          </MCDUContextProvider>
          </div>
      </div>
      
      </body>
    </html>
  );
}
