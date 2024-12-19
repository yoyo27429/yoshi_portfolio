import { tv } from "tailwind-variants";

export const twoColumnContainerTV = tv({
  base: "",
  variants: {
    type: {
      title: "text-[28px] leading-9 text-[#3D506A]",
      subtitle: "text-[28px] leading-9 text-[#949494]",
    },
  },
  defaultVariants: {
    type: "title",
  },
});
