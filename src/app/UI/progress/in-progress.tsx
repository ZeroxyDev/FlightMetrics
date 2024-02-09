import { FaPlane, FaCloud, FaCheck } from "react-icons/fa";
import { MdConnectingAirports } from "react-icons/md";


interface InProgressProps {
    actualStep: number
}
export default function InProgress({actualStep}: InProgressProps) {
    return (
<div className="flex w-full items-center justify-center gap-4 rounded-big border-tertiary p-2 px-4">
            <MdConnectingAirports size={24} className={actualStep >= 0 ? "text-primary" : "text-secondary"} />
            <div className={actualStep >= 0 ? "flex-grow h-1 bg-primary" : "flex-grow h-1 text-secondary"}></div>
            <FaPlane size={24} className={actualStep >= 3 ? "text-primary" : "text-secondary"} />
            <div className={actualStep >= 4 ? "flex-grow h-1 bg-primary" : "flex-grow h-1 text-secondary"}></div>
            <FaCloud size={24} className={actualStep >= 10 ? "text-primary" : "text-secondary"} />
            <div className={actualStep >= 11 ? "flex-grow h-1 bg-primary" : "flex-grow h-1 text-secondary"}></div>
            <FaCheck size={24} className={actualStep >= 13 ? "text-primary" : "text-secondary"} />
           </div>
    );
}