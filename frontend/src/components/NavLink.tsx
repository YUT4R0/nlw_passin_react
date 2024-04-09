import { ComponentProps } from "react";

interface Props extends ComponentProps<"a"> {
  children: string;
  href: string;
}

export function NavLink({ children, href, ...rest }: Props) {
  return (
    <a {...rest} href={href} className="font-medium text-sm text-zinc-300">
      {children}
    </a>
  );
}
