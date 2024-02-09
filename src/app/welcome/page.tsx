"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Welcome() {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        // Simula un tiempo de montaje para mostrar animaciones o transiciones
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0); // Sin retraso para mostrar la bienvenida inmediatamente

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`text-center flex justify-center items-center flex-col h-full w-full ${isMounted ? 'opacity-100 transform scale-100 transition-all duration-1000' : 'opacity-0 transform scale-95'}`}>
            <h1 style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.2))' }} className="text-5xl max-w-[500px] font-bold bg-[length:200%_auto] p-2 animate-gradient bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]">
                Welcome to Flight Metrics
            </h1>
            <p className="text-lg max-w-[600px] mt-2 text-gray-600">
                Your go-to platform for accurate flight data and analysis.
            </p>
            <Link legacyBehavior href="/choose">
                <a>
                    <button className="relative hover:scale-105 transition-all duration-[.8s] group mt-6 overflow-hidden px-6 h-12 rounded-full flex space-x-2 animate-gradient bg-[length:200%_auto]  items-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.3))' }}>
                        <span className="relative text-sm text-black font-bold">Get Started</span>
                        <div className="flex items-center -space-x-3 translate-x-3">
                            <div className="w-2.5 h-[1.6px] rounded bg-black origin-left scale-x-0 transition duration-[.8s] group-hover:scale-x-100"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-black -translate-x-2 transition duration-[.8s] group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                </a>
            </Link>
        </div>
    );
}
