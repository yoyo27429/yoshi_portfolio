import { tv } from "tailwind-variants";

export const modalTV = tv({
  base: "absolute z-10 top-52 left-52",
  variants: {
    withbgc: {
      true: "bg-neutral-100",
      false: "",
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
