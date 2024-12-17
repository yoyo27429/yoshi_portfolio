import { tv } from "tailwind-variants";

export const textTV = tv({
  base: "",
  variants: {
    type: {
      title: "text-[28px] leading-9 text-[#3D506A]",
      subtitle: "text-[28px] leading-9 text-[#949494]",
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
