import Link from "next/link";
import packageJson from '../../../package.json'

export default function Footer() {

    const version = packageJson.version; // TODO: Get version from package.json

    return (
        <div className="w-full z-0 fixed px-10 h-full bottom-0 flex justify-between pb-8 items-end">
            <div className="flex justify-between w-full items-center">
            <span className="text-tertiary">v{version}</span>
            <Link href={"https://github.com/ZeroxyDev"} className="text-primary text-sm">
            <p style={{ filter: 'drop-shadow(0 0px 3px rgba(255, 255, 255, 0.2))' }} className="text-[12px] max-w-[500px] font-bold bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]">
                Powered by Zeroxy Dev
            </p>
            </Link>
            </div>
        </div>
    );
}