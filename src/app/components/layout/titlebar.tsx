'use client'

import { FaWindowMinimize, FaRegWindowMaximize , FaWindowClose  } from "react-icons/fa";
import { IoMdClose, IoMdSettings, IoIosArrowBack } from "react-icons/io";
import { HiMiniMinusSmall } from "react-icons/hi2";
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation'
import { MdOutlineMinimize } from "react-icons/md";



export default function Titlebar() {

  const actualPage = usePathname()


    const onClose = React.useCallback(async () => {
        const { appWindow } = await import("@tauri-apps/api/window");
        appWindow.close();
      }, []);

    const onMinimize = React.useCallback(async () => {
        const { appWindow } = await import("@tauri-apps/api/window");
        appWindow.minimize();
      }, []);

  return (
    <div data-tauri-drag-region className="h-12 z-100 fixed justify-between px-3 items-center bordernone-t bordernone-b bordernone-x border-tertiary flex rounded-t-big w-full select-none top-0 left-0 right-0 text-primary">
      <div className="flex items-center">
        {actualPage != "/" ? (
          <Link href={"/"} className="inline-flex justify-center items-center w-[30px] h-[30px] cursor-pointer text-primary">
            <IoIosArrowBack/>
          </Link>
        ) : (
          <div className="flex items-center justify-center">
            <Link href={"/settings"} className="inline-flex justify-center items-center w-[30px] h-[30px] cursor-pointer text-primary">
              <IoMdSettings/>
            </Link>
          </div>
        )}
      </div>
      <h1 data-tauri-drag-region className="font-bold text-primary text-sm absolute left-1/2 -translate-x-1/2">FlightMetrics</h1>
      <div className="flex items-center gap-2 mr-2">
        <div className="inline-flex justify-center text-primary items-center size-[20px] -mt-2 cursor-pointer" onClick={onMinimize} id="titlebar-minimize">
          <MdOutlineMinimize />
        </div>
        <div className="inline-flex justify-center text-primary items-center w-[30px] h-[30px] cursor-pointer" onClick={onClose} id="titlebar-close">
          <IoMdClose />
        </div>
      </div>
    </div>
  )
}
