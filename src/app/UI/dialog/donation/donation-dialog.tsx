"use client"

import React from 'react'
import { FaHeart, FaCoffee, FaRocket } from 'react-icons/fa'
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
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-background to-background/95" modal>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
            <FaRocket className="h-6 w-6 text-primary animate-pulse" />
            Hey there! I&apos;m ZeroxyDev
          </DialogTitle>
          <DialogDescription className="pt-2 text-primary/90">
            Your support helps me keep FlightMetrics free and push the boundaries of what&apos;s possible in flight simulation!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 animate-pulse">
            <FaCoffee className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm text-primary/90">
              Every donation, no matter how small, helps me:
            </p>
            <ul className="text-sm text-primary/80 space-y-1">
              <li className="flex items-center gap-2">
                <FaHeart className="h-3 w-3 text-primary" />
                Keep FlightMetrics completely free
              </li>
              <li className="flex items-center gap-2">
                <FaHeart className="h-3 w-3 text-primary" />
                Add new features you&apos;ve been asking for
              </li>
              <li className="flex items-center gap-2">
                <FaHeart className="h-3 w-3 text-primary" />
                Maintain and improve existing features
              </li>
            </ul>
          </div>
          <div className="w-full bg-primary/5 rounded-big p-3 text-center">
            <p className="text-xs text-primary/70">
              This message appears once a week to keep FlightMetrics sustainable
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            text="Maybe next time"
            handleFunction={() => onOpenChange(false)}
          />
          <Link 
            href={generalSettings.donateLink} 
            target="_blank" 
            className="w-[50%] hover:w-[60%] transition-all duration-500" 
            onClick={() => onOpenChange(false)}
          >
            <button className="relative z-[1]  border-primary bg-primary/10 w-full justify-center hover:bg-primary/20 transition-all duration-500 group overflow-hidden h-12 rounded-full flex space-x-2 items-center" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.1))' }}>
              <div className='flex rounded-big justify-center items-center'>
                <span className="relative text-sm font-bold text-primary">Support My Work</span>
                <div className="flex items-center -space-x-3 translate-x-3">
                  <div className="w-2.5 h-[1.6px] rounded bg-primary origin-left scale-x-0 transition duration-500 group-hover:scale-x-100"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-primary -translate-x-2 transition duration-500 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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