import { ComponentProps } from "react";

export function TableRow({ ...rest }: ComponentProps<"tr">) {
  return <tr {...rest} className="border-b border-white/10 hover:bg-white/5" />;
}
