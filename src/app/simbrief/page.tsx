"use client"


import { Cobe } from "../components/cube";
import { useSimbrief } from "../context/simbriefContext";
import Image from "next/image";
import { PiAirplaneTakeoffBold, PiAirplaneLandingBold } from "react-icons/pi";
import { FaPlaneArrival } from "react-icons/fa6";
import { MdOutlineTimer,MdOutlineTrendingUp , MdAvTimer , MdNumbers, MdOutlineBatteryAlert, MdOutlineCalendarMonth  } from "react-icons/md";
import { TbSpeedboat } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { FiType } from "react-icons/fi";
import Button from "../UI/buttons/button";
import { fetchLocalAPI } from "../utils/API";
import { convertAircraftModel, formatNumberToThousands, kgToLbs, parseMETARResponse, timestampToDate, timestampToHourAndMinute } from "../utils/convert";
import { useEffect, useState } from "react";
import { useMCDU } from "../context/mcduContext";
import { useRouter } from "next/navigation";
import ErrorItem from "../components/errors/errors";
import { getSettings } from "../utils/states";

export default function Simbrief() {

    const { simbriefSettings } = useSimbrief();
    const { mcduSettings } = useMCDU();
    const data = simbriefSettings?.raw
    const originairport = data?.origin
    const destination = data?.destination
    const alternative = data?.alternate
    const [aircraftData, setAircraftData] = useState({});
    const [metar, setMetar] = useState({} as any);
    const router = useRouter()


        // Settings variables
        const [defaultLBS, setDefaultLBS] = useState(false);
        const [isLoaded, setIsLoaded] = useState(false);
    
        useEffect(() => {
            if (typeof window === 'object') {
                const storedValue = getSettings();
    
                if (storedValue !== null) {
                    setDefaultLBS(storedValue['useLBSwitch'] === 'true');
                    console.log(storedValue);

                }
                setIsLoaded(true);
            }
        }, []);

    useEffect(() => {
        if(data){
            convertAircraftModel(data?.aircraft?.base_type).then((type) => {
                fetchLocalAPI(`aircraft/${type?.type}`).then((data) => {
                    setAircraftData(data)
                })
            })
            const metar = parseMETARResponse(data?.origin?.metar)
            setMetar(metar)
        }
    }, [])

    if (!data) {
        return <div><ErrorItem errorCode="x0005"></ErrorItem></div>
    }

    function correctFormat(num : any) {
        if(defaultLBS) {
            num = parseInt(kgToLbs(num).toFixed(0))
        }
        return formatNumberToThousands(num)
    }

 
    const arrival = {
        lat: data?.destination?.pos_lat,
        long: data?.destination?.pos_long
    }
    const origin = {
        lat: data?.origin?.pos_lat,
        long: data?.origin?.pos_long
    }

    const alternate = {
        lat: data?.alternate?.pos_lat,
        long: data?.alternate?.pos_long
    }

    return <main className="flex rounded-t-big font-mono p-4 h-full justify-center items-center bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#ffffff10_1px)] bg-[size:20px_20px] flex-col overflow-x-hidden relative w-full ">

        <div className="scale-75 mt-[-100px] xl:scale-100 h-[85%] xl:h-1/1 xl:mb-4 overflow-hidden flex rounded-[40px] justify-start w-full border-tertiary items-start">
        <Cobe originCords={arrival} arrivalCords={origin} alternateCords={alternate} />
        </div>
        <div className="grid mt-[-100px] pt-4 xl:pt-0 h-[50%] xl:h-[43%] rounded-3xl grid-cols-1 sm:grid-cols-2  overflow-y-scroll max-w-[1000px] p-12  gap-16  md:grid-cols-3 xl:grid-cols-3 grid-auto-rows-auto">
          
          <div className="grid bg-[#141414a4] border border-[#272727] rounded-3xl p-4" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.05))' }}>
           <span className="font-bold text-[30px] h-fit border-b border-[#272727] pb-2">Flight Info</span>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><PiAirplaneTakeoffBold className="text-[30px]" /> </span> <span>{originairport?.icao_code}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><PiAirplaneLandingBold className="text-[30px]"/> </span> <span>{destination?.icao_code}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><FaPlaneArrival  className="text-[30px]"/> </span> <span>{alternative?.icao_code}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><MdNumbers  className="text-[30px]" /> </span> <span>{data?.general?.icao_airline}{data?.general?.flight_number}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2"><MdOutlineCalendarMonth   className="text-[30px]" /> </span> <span>{timestampToDate(data?.times?.est_out)}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><MdAvTimer  className="text-[30px]" /> </span> <span>{timestampToHourAndMinute(data?.times?.est_out)}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><MdOutlineTimer  className="text-[30px]" /> </span> <span>{timestampToHourAndMinute(data?.times?.est_in)}</span></div>
          </div>

          <div className="grid bg-[#141414a4] border border-[#272727] rounded-3xl p-4" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.05))' }}>
          <div> <span className="font-bold text-[30px] h-fit border-b border-[#272727] pb-2">Aircraft</span>
      
          <img src={`/images/aircrafts/${data?.aircraft?.base_type || 'A20N'}.png`} alt="Simbrief logo" width={300} height={300} /></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Type </span> <span>{data?.aircraft?.base_type}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Empty Weight </span> <span>{correctFormat(data?.weights?.oew)} {defaultLBS ? "lbs" : "kg"}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Max MZFW </span> <span>{correctFormat(data?.weights?.max_zfw)} {defaultLBS ? "lbs" : "kg"}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Max TOW </span> <span>{correctFormat(data?.weights?.max_tow)} {defaultLBS ? "lbs" : "kg"}</span></div>
          </div>

          <div className="grid row-span-1 border border-[#272727] bg-[#141414a4] rounded-3xl p-4" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.05))' }}>
           <span className="font-bold text-[30px] h-fit border-b border-[#272727] pb-2">Flight Plan</span>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><MdOutlineTrendingUp  className="text-[30px]" /> </span> <span>{formatNumberToThousands(data?.general?.initial_altitude)} ft</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><TbSpeedboat className="text-[30px]"/> </span> <span>{data?.general?.cruise_profile}</span></div>
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><FaWind className="text-[30px]"/> </span> <span>{data?.general?.avg_wind_comp}</span></div>
      {/*     <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex items-center  gap-2"><MdOutlineBatteryAlert  className="text-[30px]"/> </span> <span>{data?.general?.avg_tropopause}</span></div> */}
          <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">AVG Tropo </span>  <span>{formatNumberToThousands(data?.general?.avg_tropopause)}</span></div>
          <div className="flex w-full flex-col justify-start items-start text-lg mt-3"><span className="flex font-bold  items-center  gap-2 border-b border-[#272727] w-full mb-2">Route </span>  <span className=" rounded-full text-[13px] font-mono">{data?.general?.route}</span></div>
          
          </div>

          <div className="grid bg-[#141414a4] border border-[#272727] rounded-3xl p-4" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.05))' }}>
           <span className="font-bold text-[30px] h-fit border-b border-[#272727] pb-2">Local weather</span>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Barometer </span> <span>{metar?.barometer?.mb} QNH</span></div>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Temperature </span> <span>{metar?.temperature?.celsius} °C</span></div>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Dewpoint </span><span>{metar?.dewpoint?.celsius} °C</span></div>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Visibility </span> <span>{formatNumberToThousands(metar?.visibility?.meters)} M</span></div>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Humidity </span> <span>{metar?.humidity_percent?.toFixed(1)} %</span></div>
          </div>

          <div className="grid bg-[#141414a4] border border-[#272727] rounded-3xl p-4" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.05))' }}>
           <span className="font-bold text-[30px] h-fit border-b border-[#272727] pb-2">Loadsheet</span>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Enroute Burn </span> <span>{correctFormat(data?.general?.total_burn)} {defaultLBS ? "lbs" : "kg"}</span></div>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Passengers </span> <span>{formatNumberToThousands(data?.general?.passengers)}</span></div>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Passgr. (avg/wgt)</span> <span>{correctFormat(data?.weights?.pax_weight)} {defaultLBS ? "lbs" : "kg"}</span></div>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold  items-center  gap-2">Tow </span> <span>{correctFormat(data?.weights?.est_tow)} {defaultLBS ? "lbs" : "kg"}</span></div>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold items-center  gap-2">Block Fuel </span> <span>{correctFormat(data?.fuel?.plan_ramp)} {defaultLBS ? "lbs" : "kg"}</span></div>
           <div className="flex w-full justify-between items-center text-lg mt-3"><span className="flex font-bold items-center  gap-2">Takeoff Fuel </span> <span>{correctFormat(data?.fuel?.plan_takeoff)} {defaultLBS ? "lbs" : "kg"}</span></div>
          </div>

          <div className="grid w-full bg-[#141414a4] border border-[#272727] rounded-3xl p-4 " style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.05))' }}>
           <span className="font-bold w-full text-[30px] h-fit border-b border-[#272727] pb-2">Prefile on</span>
           <div className="w-full grid grid-cols-1 gap-6 mt-6 place-content-center place-items-center">

           {Object?.values(data?.prefile).map((item: any, index: number) => (
    <a key={index} className="w-full" href={item.link} target="_blank" rel="noopener noreferrer">
        <button className="bg-[#222222] hover:bg-secondary duration-300 transition-all text-white font-bold py-2 px-4 rounded-full w-full" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.05))' }}>
            {item.name}
        </button>
    </a>
))}



            </div>
          </div>



        </div>

        <div className="h-1/6 flex justify-center w-full items-center">
            <div className="w-full grid grid-cols-1 gap-6 place-content-center place-items-center">
            <Button handleFunction={function (): void { router.push("/result") }} text="Calculate takeoff"></Button>
            </div>
          </div>

    </main>;
}