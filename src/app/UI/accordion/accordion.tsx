import React, { FC } from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
}

const Accordion: FC<AccordionProps> = ({ items }) => (
  <RadixAccordion.Root
    className="-mt-3 w-full "
    type="single"
    defaultValue="item-1"
    collapsible
  >
    {items.map((item, index) => (
      <AccordionItem key={index} className="last:mb-2 " value={`item-${index + 1}`}>
        <AccordionTrigger><span className="text-primary opacity-75 text-[20px]	-ml-2">{item.title}</span></AccordionTrigger>
        <AccordionContent>{item.content}</AccordionContent>
      </AccordionItem>
    ))}
  </RadixAccordion.Root>
);

const AccordionItem: FC<React.ComponentProps<typeof RadixAccordion.Item>> = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <RadixAccordion.Item
    className="overflow-hidden"
    {...props}
    ref={forwardedRef}
  >
    {children}
  </RadixAccordion.Item>
));

const AccordionTrigger: FC<React.ComponentProps<typeof RadixAccordion.Trigger>> = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      className=" group flex h-[45px] flex-1 cursor-default items-center justify-between px-5 text-[15px] leading-none outline-none"
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] text-primary transition-transform duration-300 group-data-[state=open]:rotate-180 "
        aria-hidden
      />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));

const AccordionContent: FC<React.ComponentProps<typeof RadixAccordion.Content>> = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <RadixAccordion.Content
    className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden "
    {...props}
    ref={forwardedRef}
  >
    <div className="">{children}</div>
  </RadixAccordion.Content>
));

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';

export default Accordion;
