import { ComponentProps } from "react";
import { cn } from "../helpers";

type Props = {
  label: string;
  containerClassName?: string;
  unit?: string;
} & ComponentProps<"input">;

export const Input = ({
  label,
  unit,
  className,
  containerClassName,
  ...props
}: Props) => {
  return (
    <div className={cn(containerClassName)}>
      <label className="text-xs sm:hidden" htmlFor={props.id}>
        {label}
      </label>
      <div className="flex border-2 border-yellow-300 rounded-xl grow">
        <input
          {...props}
          className={cn(
            "grow px-2 py-0.5 without-ring text-sm md:text-base rounded-xl w-full",
            !!unit && "text-right",
            className
          )}
        />
        {unit && (
          <label
            htmlFor={props.id}
            className="flex items-center justify-center w-6 text-sm text-center bg-yellow-100 border-l-2 border-yellow-300 md:text-base md:w-8 rounded-r-xl"
          >
            {unit}
          </label>
        )}
      </div>
    </div>
  );
};
