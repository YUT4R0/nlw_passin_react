import { ComponentProps } from "react";

export function TableHeader({ ...rest }: ComponentProps<"th">) {
  return <th {...rest} className="py-3 px-4 text-sm font-semibold text-left" />;
}
