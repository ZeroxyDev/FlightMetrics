"use client"

import ButtonSimple from "@/app/UI/buttons/buttonSimple";
import { useRouter } from "next/navigation";
import ErrorItem from "./components/errors/errors";




export default function NotFound({ }) {

    const router = useRouter()
    
    return (
        <ErrorItem errorCode={"x0404"}></ErrorItem>
    );
}
