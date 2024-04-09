import { ComponentProps } from "react";

export function Table({ ...rest }: ComponentProps<"table">) {
  return (
    <div className="border border-white/10 rounded-lg">
      <table className="w-full" {...rest} />
    </div>
  );
}
