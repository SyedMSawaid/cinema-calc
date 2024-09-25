import { ComponentProps } from "react";

type Props = { label: string; unit?: string } & ComponentProps<"input">;

export const Input = ({ label, unit, className, ...props }: Props) => {
  return (
    <div className="flex flex-col items-start justify-between grow">
      <label className="text-xs md:hidden" htmlFor={props.id}>
        {label}
      </label>
      <div className="flex border-2 border-yellow-300 rounded-xl">
        <input
          {...props}
          className={`grow px-2 py-0.5 without-ring rounded-xl ${
            !!unit && "text-right"
          } ${className}`}
        />
        {unit && (
          <label
            htmlFor={props.id}
            className="flex items-center justify-center w-8 text-center bg-yellow-100 border-l-2 border-yellow-300 rounded-r-xl"
          >
            {unit}
          </label>
        )}
      </div>
    </div>
  );
};
