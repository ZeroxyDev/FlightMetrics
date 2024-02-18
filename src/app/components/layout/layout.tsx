"use client";

import { Inter } from "next/font/google";


import { useEffect, useState } from "react";

import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import { MCDUContextProvider } from "@/app/context/mcduContext";
import { SimbriefContextProvider } from "@/app/context/simbriefContext";
import Footer from "./footer";
import Titlebar from "./titlebar";

const inter = Inter({ subsets: ["latin"] });

interface WindowProps extends Window {
  __TAURI__?: boolean;
}
declare const window: WindowProps;

export default function Layout({
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
    <div className={` m-0 ${isTauri ? 'bg-transparent rounded-[40px] ' : 'bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#ffffff10_1px)] bg-[size:20px_20px]'} overflow-hidden`}>
    <div style={{ height: isTauri ? '700px' : '100vh' }} className={`bg-[#000000] bg-[radial-gradient(#ffffff20_1px,#ffffff10_1px)] bg-[size:20px_20px] w-full ${isTauri ? 'h-[600px]' : 'h-screen'} flex justify-center items-center bordernone border-tertiary rounded-big`}>
    {isTauri && <div className='h-12 mb-8 block z-20'><Titlebar /></div>}
    {!isTauri &&<Link href={"/settings"} className="inline-flex z-50 fixed top-[20px] right-[20px] justify-center items-center w-[30px] h-[30px] cursor-pointer text-primary"><IoMdSettings/></Link>}
    <div className='w-full z-10 flex justify-center items-center h-full '>
      <SimbriefContextProvider>
    <MCDUContextProvider>
      {children}
    </MCDUContextProvider>
    </SimbriefContextProvider> 
      </div>
      {isTauri && <Footer/>}
  </div>
  </div>
  );
}
