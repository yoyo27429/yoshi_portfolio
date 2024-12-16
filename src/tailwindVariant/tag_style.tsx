import { tv } from "tailwind-variants";

export const tagTV = tv({
  base: "flex justify-between items-center px-4 py-1 w-fit rounded-full",
  variants: {
    type: {
      1: "bg-[rgb(66,197,191)]",
      2: "bg-[rgb(211,142,73]",
    },
  },
  //     size: {
  //       sm: "text-sm",
  //       md: "text-base",
  //       lg: "px-4 py-3 text-lg",
  //     },
  //   },
  //   compoundVariants: [
  //     {
  //       size: ["sm", "md"],
  //       class: "px-3 py-1",
  //     },
  //   ],
  defaultVariants: {
    withbgc: true,
  },
});
