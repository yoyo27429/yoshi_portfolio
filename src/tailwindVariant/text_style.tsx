import { tv } from "tailwind-variants";

export const textTV = tv({
  base: "",
  variants: {
    type: {
      title: "text-[28px] leading-9",
      subtitle: "text-[28px] leading-9",
    },
    color: {
      type1: "",
      type2: "",
    },
  },
  compoundVariants: [
    {
      type: "title",
      color: "type1",
      class: "text-[#3D506A]",
    },
    {
      type: "subtitle",
      color: "type1",
      class: "text-[#949494]",
    },
    {
      type: "title",
      color: "type2",
      class: "text-[#58351F]",
    },
    {
      type: "subtitle",
      color: "type2",
      class: "text-[#D38E49]",
    },
  ],
  defaultVariants: {
    type: "title",
    color: "type1",
  },
});
