import React, { useEffect, useState } from 'react';
import * as Label from '@radix-ui/react-label';
import Tooltip from '../tooltip/tooltip';
import { getSetting } from '@/app/utils/states';


const CreateInput = (id: string, label: string, tooltipLabel: string, handleResult: (e: string) => void, defaultValue = '', placeHolder = '', type = 'text') => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [defaultInput, setDefaultInput] = useState<string | undefined>("");

  useEffect(() => {
      if (typeof window === 'object') {
          const storedValue = getSetting(id as string);
          if (storedValue !== null) {
              setDefaultInput(storedValue);
          }
          setIsLoaded(true);
      }
  }, [id]);
  
  return (
   <>
   {isLoaded ? (
      <div className="flex w-full px-5 pb-5 last:pb-2 justify-between items-center">
      <Tooltip followCursor={true} text={tooltipLabel}>
     <Label.Root className="text-primary opacity-40 font-main text-[13px] text-start leading-none pr-[15px] truncate" htmlFor={id}	>
       {label}
     </Label.Root>
     </Tooltip>
     <input
       className="bg-background border placeholder:text-tertiary py-[4px] border-secondary inline-flex outline-none w-[200px] appearance-none items-center justify-center rounded-[16px] px-[10px] text-[15px]"
       type={type}
       id={id}
       defaultValue={defaultInput?.replace(/['"]+/g, '')}
       placeholder={placeHolder}
       onChange={(e) => handleResult(e.target.value)}
     />
   </div>
   ) : (
     <div role="status" className="flex w-full first:mt-4 px-5 pb-5 last:pb-2 justify-between items-center animate-pulse">
       <div className="h-4 bg-secondary rounded-full w-full "></div>
       <span className="sr-only">Loading...</span>
     </div>
   )}
   </>
  );
}

export default CreateInput;