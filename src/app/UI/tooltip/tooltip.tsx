import React from 'react';
import * as Tooltips from '@radix-ui/react-tooltip';

const Tooltip = ({ text, children, followCursor } : { text: string, children: React.ReactNode, followCursor: boolean }) => {
  return (
    <Tooltips.Provider delayDuration={100}>
      <Tooltips.Root>
        <Tooltips.Trigger asChild>
          {children}
        </Tooltips.Trigger>
        <Tooltips.Portal>
          <Tooltips.Content
            className="z-50 shadow-background border-2 italic text-start text-quinary border-tertiary backdrop-blur-md bg-hover ml-4 max-w-[200px]  data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[12px]  px-[15px] py-[10px] text-[13px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_0px_100px_0px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            sideOffset={5}
          >
            {text}
          </Tooltips.Content>
        </Tooltips.Portal>
      </Tooltips.Root>
    </Tooltips.Provider>
  );
};

export default Tooltip;
