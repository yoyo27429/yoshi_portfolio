import { useState } from "react";
import { CarouselContentType } from "../type/carouselType.tsx";
import point from "../assets/point.svg";

type CarouselProps = {
  company: string;
  project: string;
  data: CarouselContentType[];
};
export const Carousel = ({ company, project, data }: CarouselProps) => {
  const [selected, setSelected] = useState<number>(0);
  return (
    <div className="w-full rounded-lg bg-[#F4F4F4]">
      {/* <img className="w-full" src={data[selected].image} alt="" /> */}
      <img
        className="w-full"
        src={`/images/${company}/${project}/${data[selected].image}.png`}
        alt=""
      />
      <div className="w-full border-2 border-[#DFDFDF] rounded-lg flex flex-col p-4 ring-4 ring-inset ring-white">
        {data[selected].decs && (
          <div className="flex py-6 px-4 mb-2.5">{data[selected].decs}</div>
        )}
        <ul className="px-4 flex gap-4">
          {data.map((link, i) => {
            return (
              <li className="my-1 flex gap-2 items-center" key={i}>
                {i === selected && (
                  <img className="w-4 h-4 select_arrow" src={point} alt="" />
                )}
                <button
                  className={`text-base ${i === selected ? "" : "ml-6"}`}
                  onClick={() => {
                    console.log(`click com: ${link.tabName} index: ${i}`);
                    setSelected(i);
                    // data.clickLink(data.name, i);
                  }}
                >
                  {link.tabName}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
