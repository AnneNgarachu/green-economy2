import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface SliderProps extends SliderPrimitive.SliderProps {}

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  ({ className, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={`relative flex items-center select-none touch-none w-full h-4 ${className}`}
      {...props}
    >
      <SliderPrimitive.Track className="relative bg-gray-200 rounded-full grow h-[4px]">
        <SliderPrimitive.Range className="absolute h-full bg-green-500 rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border-2 border-green-500 rounded-full shadow-sm focus:outline-none" />
    </SliderPrimitive.Root>
  )
);

Slider.displayName = "Slider";

export { Slider };
