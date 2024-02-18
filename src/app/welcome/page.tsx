"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import HighlightButton from '../UI/buttons/highlight-button';
import DownloadButton from '../UI/buttons/downloadButton';
import generalSettings from '@/config/general';
import QRGen from '../UI/QR/generateQR';

interface WindowProps extends Window {
    __TAURI__?: boolean;
  }
  declare const window: WindowProps;

export default function Welcome() {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isTauri, setIsTauri] = useState<boolean>(false);

    useEffect(() => {

        if (window?.__TAURI__) {
            console.log('Tauri detected');
            setIsTauri(true);
          }

        // Simula un tiempo de montaje para mostrar animaciones o transiciones
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0); // Sin retraso para mostrar la bienvenida inmediatamente
        return () => clearTimeout(timer);

  
    }, []);

    const handleDownload = () => {
        // Hacer la solicitud a la API
        fetch(generalSettings.appAPI)
        .then(response => response.json())
        .then(data => {
        // Verificar si hay assets disponibles en la respuesta
        if (data.assets && data.assets.length > 0) {
            // Obtener el browser_download_url del primer asset
            const primerAsset = data.assets[0].browser_download_url;
            window.location.href = primerAsset;
            return primerAsset;
        } else {
            console.log("No hay assets disponibles en la respuesta.");
        }
        })
        .catch(error => console.error('Error al obtener los datos:', error));
    };


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

    {!isTauri &&
   <div className='fixed flex-col hidden xl:flex  p-4 justify-end  items-end bottom-4 right-12 '>
    <div className='rounded-[20px] w-fit flex justify-center items-center aspect-square scale-75 border-tertiary border relative'><QRGen link={handleDownload}></QRGen></div>
     <div className='flex justify-end items-center mr-9 -mt-4 w-[440px]'><DownloadButton handleFunction={handleDownload} text="Download App"></DownloadButton></div>
   </div>
    }
</div>

    );
}
