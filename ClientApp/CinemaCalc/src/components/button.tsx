import { ComponentProps } from "react";

type Props = {} & ComponentProps<"button">;

export const Button = ({ children, onClick, ...props }: Props) => {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-green-400 rounded-full max-w-40"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
