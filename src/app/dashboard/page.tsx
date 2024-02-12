"use client"


import { useRouter } from "next/navigation";
import Button from "../UI/buttons/button";
import { Cobe } from "../components/cube";
import { useSimbrief } from "../context/simbriefContext";
import Image from "next/image";

export default function Dashboard() {

    const router = useRouter()

    const { simbriefSettings } = useSimbrief();
    const data = simbriefSettings
    const arrival = {
        lat: data.destination.pos_lat,
        long: data.destination.pos_long
    }
    const origin = {
        lat: data.origin.pos_lat,
        long: data.origin.pos_long
    }
    return <main className="flex h-full w-full flex-col ">
        <div className="flex justify-start items-start">
            {data?.crew?.cpt}
        </div>
        <div className="h-1/2 scale-110 px-6 mt-[100px]">
        <Cobe originCords={arrival} arrivalCords={origin} />
        </div>
        <div className=" flex h-1/2 justify-center w-full items-center">
            <div className="w-full grid grid-cols-1 gap-6 place-content-center place-items-center">
            <Button handleFunction={function (): void { router.push("/result") }} text="Calculate takeoff"></Button>
            </div>
          </div>
    </main>;
}