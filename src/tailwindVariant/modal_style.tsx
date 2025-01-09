import { tv } from "tailwind-variants";

export const modalTV = tv({
  base: "absolute",
  variants: {
    withbgc: {
      true: "bg-neutral-100",
      false: "",
    },
    isCenter: {
      true: "",
      false: "top-52 left-52",
    },
    priority: {
      1: "z-10",
      2: "z-20",
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
    isCenter: false,
    priority: 1,
  },
});
