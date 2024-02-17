"use client";
import React from "react";
import { CreateSwitch } from "../UI/switch/switch";
import Accordion from "../UI/accordion/accordion";
import { getSetting, useSwitchState } from "../utils/states";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import CreateInput from "../UI/inputs/label";

export default function Settings() {
  const [useSimBriefSwitch, handleUseSimBriefSwitch] = useSwitchState('useSimBriefSwitch', false);
  const [useLBSwitch, handleUseLBSwitch] = useSwitchState('useLBSwitch', false);
  const [useInfoViewerSwitch, handleUseInfoViewerSwitch] = useSwitchState('useInfoViewerSwitch', true);
  const [useMetarSwitch, handleUseMetarSwitch] = useSwitchState('useMetarSwitch', true);
  const [useSimbriefInput, handleSimBriefInput] = useSwitchState('useSimbriefInput', "");
  
  const accordionItems = [
    {
      title: 'General Settings',
      content: (
        <form>
          {CreateInput('useSimbriefInput', 'Set your simbrief username', 'Enter your simbrief username', handleSimBriefInput, '', 'Your simbrief username...', 'text')}
          {CreateSwitch('useSimBriefSwitch', 'Use SimBrief Integration automatically', 'Enable integration with SimBrief for flight metrics', handleUseSimBriefSwitch)}
          {CreateSwitch('useInfoViewerSwitch', 'View Simbrief information before takeoff calculation', 'View Simbrief information before takeoff calculation', handleUseInfoViewerSwitch)}
          {CreateSwitch('useLBSwitch', 'Use LBS by default', 'Use LBS instead of KG by default', handleUseLBSwitch)}
          {CreateSwitch('useMetarSwitch', 'Use metar API', 'Use metar API by default', handleUseMetarSwitch)}
          
        </form>
      ),
    }
    // Puedes agregar más secciones y ajustes aquí según sea necesario
  ];


  const router = useRouter();
  return (
    <div className="w-screen max-w-[1200px] overflow-hidden max-h-[100vh] flex justify-between items-center h-screen">
    
       <div style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.1))' }} className="w-full px-[50px] border-secondary h-full max-h-[calc(100vh-100px)] backdrop-blur-[2px] rounded-[30px]">
        
       <div className="flex items-center justify-start">
       <button className='transition h-fit mr-4 duration-300 border border-tertiary bg-button hover:bg-buttonHover text-white py-2 px-2 rounded-[20px] text-center' onClick={() => router.back()}><IoIosArrowBack /></button>
      <h1 className="text-primary opacity-90 text-start py-4 border-tertiary font-main text-[30px] rounded-[20px] ">Settings</h1>
       </div>
      <section className='text-primary w-full pt-5  cursor-pointer max-h-[calc(100vh-100px)]'>
        <Accordion items={accordionItems} />
      </section>
       </div>
    </div>
  );
}
