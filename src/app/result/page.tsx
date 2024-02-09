"use client"

import { useRouter } from "next/navigation";
import Button from "../UI/buttons/button";
import MCDU from "../components/mcdu";

export default function Result() {

    const router = useRouter();
    return (
        <div className="w-[80%] flex-col aspect-square h-full flex justify-center items-center">
            <MCDU></MCDU>
            <Button text="New Flight" handleFunction={function (): void {
                router.push("/choose")
            } }></Button>
        </div>
    );
}