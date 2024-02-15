"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import HighlightButton from '../UI/buttons/highlight-button';

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

    <h1 style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.2))' }} className="text-5xl max-w-[500px] font-bold bg-[length:200%_auto] p-2 animate-gradient bg-clip-text text-transparent bg-plate">
        Welcome to Flight Metrics
    </h1>
    <p className=" max-w-[600px] mt-2 italic text-sm text-[#7c7c7c]">
        Your go-to application for accurate flight simulation data.
    </p>
    <Link legacyBehavior href="/choose">
        <a><HighlightButton text="Get Started" loading={false}></HighlightButton>
        </a>
    </Link>
</div>

    );
}
