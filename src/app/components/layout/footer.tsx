import Link from "next/link";
import packageJson from '../../../../package.json'
import generalSettings from "@/config/general";

export default function Footer() {

    const version = packageJson.version; // TODO: Get version from package.json

    return (
        <div className="w-full z-10 fixed px-10 bottom-0 flex justify-between pb-8 items-end">
            <div className="flex justify-between w-full items-center">
            <span className="text-tertiary">v{version}</span>
            <Link href={"https://github.com/ZeroxyDev"} target="_blank" className="text-primary text-sm cursor-pointer">
            <p style={{ filter: 'drop-shadow(0 0px 3px rgba(255, 255, 255, 0.2))' }} className="text-[12px] max-w-[500px] font-bold bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent bg-[linear-gradient(to_right,#e0e0e0,#b4b4b4,#e0e0e0,#7c7c7c,#b4b4b4,#e0e0e0)]">
                Powered by {generalSettings.AppDeveloper}
            </p>
            </Link>
            </div>
        </div>
    );
}