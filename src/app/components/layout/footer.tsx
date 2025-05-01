"use client"

import Link from "next/link";
import packageJson from '../../../../package.json'
import generalSettings from "@/config/general";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { DonationDialog } from "@/app/UI/dialog/donation/donation-dialog";

export default function Footer() {
    const [showDonationDialog, setShowDonationDialog] = useState(false);
    const version = packageJson.version;

    return (
        <>
            <div className="w-full z-10 fixed px-10 bottom-0 flex justify-between pb-8 items-end">
                <div className="flex justify-between w-full items-center">
                    <span className="text-tertiary">v{version}</span>
                    <div className="flex justify-between gap-4 items-center">
                        <Link href={"https://github.com/ZeroxyDev"} target="_blank" className="text-primary text-sm cursor-pointer">
                            <p style={{ filter: 'drop-shadow(0 0px 3px rgba(255, 255, 255, 0.2))' }} className="text-[12px] max-w-[500px] font-bold bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent bg-[linear-gradient(to_right,#e0e0e0,#b4b4b4,#e0e0e0,#7c7c7c,#b4b4b4,#e0e0e0)]">
                                Powered by {generalSettings.AppDeveloper}
                            </p>
                        </Link>

                        <button 
                            onClick={() => setShowDonationDialog(true)}
                            className="relative group overflow-hidden px-3 h-8 rounded-full flex items-center gap-1.5 border border-[#333333e5] bg-[#202020e5] hover:bg-[#252525e5] transition-all duration-300"
                            style={{ filter: 'drop-shadow(0 0px 5px rgba(255, 255, 255, 0.05))' }}
                        >
                            <span className="relative text-xs text-white font-bold">Donate</span>
                            <FaHeart className="h-3 w-3 text-white group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            <DonationDialog 
                open={showDonationDialog} 
                onOpenChange={setShowDonationDialog} 
            />
        </>
    );
}