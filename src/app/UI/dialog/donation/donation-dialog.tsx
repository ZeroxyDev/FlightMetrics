"use client"

import React from 'react'
import { FaHeart, FaCoffee } from 'react-icons/fa'
import Button from '@/app/UI/buttons/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../dialog'
import generalSettings from '@/config/general'
import Link from 'next/link'

interface DonationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DonationDialog({ open, onOpenChange }: DonationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" modal>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-primary">
            <FaHeart className="h-5 w-5 text-primary" />
            Support FlightMetrics
          </DialogTitle>
          <DialogDescription className="pt-2 text-primary">
            I&apos;m working hard to keep FlightMetrics free and continue improving it. Your support means the world to me!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <FaCoffee className="h-8 w-8 text-primary" />
          </div>
          <p className="text-center text-sm text-primary">
            Every donation helps me maintain and enhance FlightMetrics. 
            Consider buying me a coffee to show your support!
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            text="Maybe later"
            handleFunction={() => onOpenChange(false)}
          />
          <Link href={generalSettings.donateLink} target="_blank" className="w-[40%] hover:w-[50%] transition-all duration-[.8s]" onClick={() => onOpenChange(false)}>
            <button className="relative z-[1] border border-[#333333e5] bg-[#202020e5] w-full justify-center hover:scale-1 transition-all duration-[.8s] group overflow-hidden h-12 rounded-full flex space-x-2 items-center" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.1))' }}>
              <div className='flex rounded-big justify-center items-center'>
                <span className="relative text-sm text-white font-bold">Donate Now</span>
                <div className="flex items-center -space-x-3 translate-x-3">
                  <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-[.8s] group-hover:scale-x-100"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white -translate-x-2 transition duration-[.8s] group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
} 