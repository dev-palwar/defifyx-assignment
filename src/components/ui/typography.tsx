import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      p: "leading-7 [&:not(:first-child)]:mt-2 mb-2 text-start",
      h1: "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
      h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      muted: "text-muted-foreground text-sm",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

function Typography({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof typographyVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
