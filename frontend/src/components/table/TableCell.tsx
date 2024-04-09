import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function TableCell({ ...rest }: ComponentProps<"th">) {
  return (
    <td
      {...rest}
      className={twMerge("py-3 px-4 text-sm text-zinc-300", rest.className)}
    />
  );
}
