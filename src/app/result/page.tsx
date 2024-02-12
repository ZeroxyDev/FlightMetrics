"use client"

import { useRouter } from "next/navigation";
import Button from "../UI/buttons/button";
import MCDU from "../components/mcdu";
import { IoIosArrowBack } from "react-icons/io";

export default function Result() {

    const router = useRouter();
    return (
        <div className="w-[80%] max-w-[500px] flex-col aspect-square h-full flex justify-center items-center">
            {<button className='transition mb-4 h-fit mr-4 duration-300 border border-tertiary bg-button hover:bg-buttonHover text-white py-2 px-2 rounded-[20px] text-center' onClick={() => router.back()}><IoIosArrowBack /></button>}
            <MCDU></MCDU>
            <Button text="New Flight" handleFunction={function (): void {
                router.push("/choose")
            } }></Button>
        </div>
    );
}