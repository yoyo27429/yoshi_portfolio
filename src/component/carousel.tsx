import { useState } from "react";
import {
  CarouselPropsType,
  CarouselContentType,
} from "../type/carouselType.tsx";

export const Carousel = (props: CarouselContentType[]) => {
  const [selected, setSelected] = useState<number>(0);
  const data = props.props;
  return (
    <div className="w-full rounded-lg bg-[#F4F4F4]">
      <img className="w-full" src={data[selected].image} alt="" />
      <div className="w-full border-2 border-[#DFDFDF] rounded-lg flex flex-col">
        <div className="flex">{data[selected].decs}</div>
        <div className="flex">
          {data.map((link) => {
            return <a href="">{link.tabName}</a>;
          })}
        </div>
      </div>
    </div>
  );
};
