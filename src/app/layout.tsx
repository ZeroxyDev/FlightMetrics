"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Titlebar from "./components/titlebar";
import { MCDUContextProvider } from "./context/mcduContext";
import { useEffect, useState } from "react";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

interface WindowProps extends Window {
  __TAURI__?: boolean;
}
declare const window: WindowProps;


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isTauri, setIsTauri] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener('contextmenu', event => event.preventDefault());

    if (window?.__TAURI__) {
      console.log('Tauri detected');
      setIsTauri(true);
    }
  }, []);

  return (
    <html lang="en">
      <body className={`rounded-[40px] m-0 ${isTauri ? 'bg-transparent' : 'bg-background'} overflow-hidden`}>
        <div style={{ height: isTauri ? '600px' : '100vh' }} className={`bg-background w-full ${isTauri ? 'h-[600px]' : 'h-screen'} flex justify-center items-center bordernone border-tertiary rounded-big`}>
        {isTauri && <div className='h-12 block z-20'><Titlebar /></div>}
        <div className='w-full z-10 flex justify-center items-center h-full '>
        <MCDUContextProvider>
          {children}
        </MCDUContextProvider>
          </div>
          {isTauri && <Footer/>}
      </div>
      </body>
    </html>
  );
}
