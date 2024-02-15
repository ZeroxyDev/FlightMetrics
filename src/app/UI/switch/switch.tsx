import * as Switch from "@radix-ui/react-switch";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, useState, useEffect } from "react";
import Tooltip from "../tooltip/tooltip";
import { getSetting } from "@/app/utils/states";

export const CreateSwitch = (id: string | undefined, label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, tooltipLabel: any, handleChange: (arg0: boolean) => void) => {
    const [defaultChecked, setDefaultChecked] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window === 'object') {
            const storedValue = getSetting(id as string);
            if (storedValue !== null) {
                setDefaultChecked(storedValue === 'true');
            }
            setIsLoaded(true);
        }
    }, [id]);

    return (
        <>
            {isLoaded ? (
                <div className="flex w-full px-5 pb-5 last:pb-2 justify-between items-center">
                    <Tooltip followCursor={true} text={tooltipLabel}>
                        <label className="text-primary opacity-40 font-main text-[13px] text-start leading-none pr-[15px] truncate" htmlFor={id}>
                            {label}
                        </label>
                    </Tooltip>
                    <Switch.Root
                        className="w-[36px] cursor-pointer h-[20px] bg-secondary rounded-full relative focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-tertiary outline-none "
                        id={id}
                        onCheckedChange={(e) => handleChange(e)}
                        defaultChecked={defaultChecked}
                    >
                        <Switch.Thumb className="block w-[18px] h-[18px] bg-primary opacity-40 outline-none data-[state=checked]:opacity-100 border-tertiary data-[state=checked]:brightness-100  rounded-full transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[18px]" />
                    </Switch.Root>
                </div>
            ) : (
                <div role="status" className="flex w-full first:mt-4 px-5 pb-5 last:pb-2 justify-between items-center animate-pulse">
                    <div className="h-4 bg-secondary rounded-full w-full "></div>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </>
    );
};
