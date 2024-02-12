"use client"
// text color  class duplicated to easy change

import { useMCDU } from "../context/mcduContext";

const MCDU = () => {
    const { mcduSettings } = useMCDU();

    function removeLeadingZeros(number: any) {
        // Convertir el número a una cadena
        let numberString = number.toString();
    
        // Eliminar los ceros iniciales utilizando expresiones regulares
        let trimmedNumber = numberString.replace(/^0+/, '');
    
        // Convertir de nuevo la cadena a un número y devolverlo
        return parseInt(trimmedNumber, 10);
    }

    return (
        <div style={{ filter: 'drop-shadow(0 0px 60px rgba(255, 255, 255, 0.1))' }} className="w-full border rounded-[40px] border-[#1f1f1f] bg-[#0e0e0ea1] p-4 mb-8 font-mono !text-[#888888] flex justify-center items-center">
            <table className="w-full">
                <tbody>
                    <tr>
                        <td colSpan={4} className="text-4xl">
                            <center>TAKE OFF RWY <span className="text-[#04b404] text-[#fcfcfc]">{mcduSettings.runway}</span></center>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg" width="33%">
                            V1
                        </td>
                        <td colSpan={2} className="text-lg">
                            FLP RETR
                        </td>
                        <td className="text-lg">
                        </td>
                    </tr>
                    <tr>
                        <td className="text-2xl">
                            <span className="text-[#fe9a2e] text-[#fcfcfc]">{mcduSettings.V1}</span>
                        </td>
                        <td className="text-2xl">
                            F=<span className="text-[#04b404] text-[#fcfcfc]">{mcduSettings.flpretr}</span>
                        </td>
                        <td className="text-2xl"></td>
                    </tr>
                    <tr>
                        <td className="text-lg">
                            VR
                        </td>
                        <td colSpan={2} className="text-lg">
                            SLT RETR
                        </td>
                        <td className="text-lg" align="right">
                            TO SHIFT
                        </td>
                    </tr>
                    <tr>
                        <td className="text-2xl">
                            <span className="text-[#fe9a2e] text-[#fcfcfc]">{mcduSettings.VR}</span>
                        </td>
                        <td className="text-2xl" colSpan={2}>
                            S=<span className="text-[#04b404] text-[#fcfcfc]">{mcduSettings.slrretr}</span>
                        </td>
                        <td className="text-2xl" align="right">
                            [M]<span className="text-[#2eccfa] text-[#fcfcfc]">[&nbsp;&nbsp;&nbsp;]*</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-lg">
                            V2
                        </td>
                        <td colSpan={2} className="text-lg">
                            CLEAN
                        </td>
                        <td className="text-lg" align="right">
                            FLAPS/THS
                        </td>
                    </tr>
                    <tr>
                        <td className="text-2xl">
                            <span className="text-[#fe9a2e] text-[#fcfcfc]">{mcduSettings.V2}</span>
                        </td>
                        <td className="text-2xl" colSpan={2}>
                            O=<span className="text-[#04b404] text-[#fcfcfc]">{mcduSettings.clean}</span>
                        </td>
                        <td className="text-2xl" align="right">
                            <span className="text-[#2eccfa] text-[#fcfcfc]">{mcduSettings.flaps}/{mcduSettings.trim}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-lg">
                            TRANS ALT
                        </td>
                        <td colSpan={2} className="text-lg" align="right">
                            FLEX TO TEMP
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-lg">
                            <span className="text-[#2eccfa] text-[#fcfcfc]">{removeLeadingZeros(mcduSettings.transitionAltitude)}</span>
                        </td>
                        <td colSpan={2} className="text-2xl" align="right">
                            <span className="text-[#2eccfa] text-[#fcfcfc]">{mcduSettings.flexTemp}&deg;</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-lg">
                            THR RED/ACC
                        </td>
                        <td colSpan={2} className="text-lg" align="right">
                            ENG OUT ACC
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-lg">
                            <span className="text-[#2eccfa] text-[#fcfcfc]">{mcduSettings.thrRed}/{mcduSettings.thrAcc}</span>
                        </td>
                        <td colSpan={2} className="text-lg" align="right">
                            <span className="text-[#2eccfa] text-[#fcfcfc]">{mcduSettings.engOut}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-lg">
                        </td>
                        <td colSpan={2} className="text-lg" align="right">
                            NEXT&nbsp;&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-lg">
                        </td>
                        <td colSpan={2} className="text-2xl" align="right">
                            PHASE&gt;
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MCDU;
