import { ComponentProps } from "react";

type Props = {} & ComponentProps<"input">;

export const Input = (props: Props) => {
  return (
    <>
      <input {...props} />
    </>
  );
};
