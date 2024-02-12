"use client"

import ButtonSimple from "@/app/UI/buttons/buttonSimple";
import errors from "./errors.json";
import { useRouter } from "next/navigation";

type ErrorsType = {
    [key: string]: {
        title: string,
        message: string
    };
};

type ErrorProps = {
    errorCode?: keyof ErrorsType; // Esto limitará los posibles valores de errorCode a las claves válidas de errors
};

export default function ErrorItem({ errorCode }: ErrorProps) {

    const error = errors as ErrorsType
    const router = useRouter()
    
    return (
        <div className="flex max-w-[400px] text-center flex-col justify-center items-center">
            <span className="font-bold text-lg mb-2">{errorCode && error[errorCode].title}</span>
            <span className="text-quaternary mb-2">{errorCode && error[errorCode].message}</span>
            <span className="text-quaternary scale-90 text-sm mb-4 bg-[#292929e5] rounded-full px-2 py-1">Error code: <span className="">{errorCode}</span></span>
            <ButtonSimple handleFunction={() => router.back()} text="Back"></ButtonSimple>
        </div>
    );
}
