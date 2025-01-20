import { useState } from "react";
import { CarouselContentType } from "../type/carouselType.tsx";
import point from "../assets/point.svg";
import arrowRight from "../assets/Arrow_right.png";
import arrowLeft from "../assets/Arrow_left.png";
import { Typewriter } from "react-typewriter-plus";

type CarouselProps = {
  company: string;
  project: string;
  data: CarouselContentType[];
};
export const Carousel = ({ company, project, data }: CarouselProps) => {
  const [selected, setSelected] = useState<number>(0);

  const handleLastItemOnclick = () => {
    if (selected === 0) {
      setSelected(data.length - 1);
    } else {
      setSelected(selected - 1);
    }
  };
  const handleNextItemOnclick = () => {
    if (selected === data.length - 1) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  };
  return (
    <div className="w-full rounded-lg">
      {/* <img className="w-full" src={data[selected].image} alt="" /> */}
      <img
        className="w-full"
        src={`/yoshi_portfolio/images/${company}/${project}/${data[selected].image}.png`}
        alt=""
      />
      <div
        className={`${
          project == "hakka_li" ? "bg-[#D5CFC4] text-[#58351F]" : "bg-[#DFDFDF]"
        } w-full border-2 border-[#DFDFDF] rounded-lg flex flex-col p-4 ring-4 ring-inset ring-white`}
        style={{ transform: "translateY(-0.5rem)" }}
      >
        {data[selected].decs && (
          <div className="flex py-6 px-4 mb-2.5">
            <Typewriter text={data[selected].decs} speed={100} cursor={true} loop={false}/>
            {/* {data[selected].decs} */}
          </div>
        )}
        <div className="flex justify-between">
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
          <div className="flex gap-4">
            <button
              className={`w-10 h-10  rounded-full flex justify-center items-center ${
                project == "hakka_li" ? "bg-[#58351F]" : "bg-[#3D506A]"
              }`}
              onClick={handleLastItemOnclick}
            >
              <img className="w-4 h-4" src={arrowLeft} alt="" />
            </button>
            <button
              className={`w-10 h-10  rounded-full flex justify-center items-center ${
                project == "hakka_li" ? "bg-[#58351F]" : "bg-[#3D506A]"
              }`}
              onClick={handleNextItemOnclick}
            >
              <img className="w-4 h-4" src={arrowRight} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CustomCarousel = ({ company, project, data }: CarouselProps) => {
  const [selected, setSelected] = useState<number>(0);

  const handleLastItemOnclick = () => {
    if (selected === 0) {
      setSelected(data.length - 1);
    } else {
      setSelected(selected - 1);
    }
  };
  const handleNextItemOnclick = () => {
    if (selected === data.length - 1) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  };

  return (
    <div id="customCarousel" className="w-full rounded-lg">
      {/* <img className="w-full" src={data[selected].image} alt="" /> */}
      {selected !== data.length - 1 ? (
        <img
          className="w-full"
          src={`/yoshi_portfolio/images/${company}/${project}/${data[selected].image}.png`}
          alt=""
        />
      ) : (
        <div className="relative">
          <img
            src={`/yoshi_portfolio/images/${company}/${project}/${data[selected].image}.png`}
            alt=""
          />
          <img
            className="absolute top-[6.04%] left-[6.25%] w-[26%]"
            src={`/yoshi_portfolio/images/${company}/${project}/gif-1.GIF`}
            alt=""
          />
          <img
            className="absolute bottom-[6.04%] right-[6.25%] w-[26%]"
            src={`/yoshi_portfolio/images/${company}/${project}/gif-2.GIF`}
            alt=""
          />
        </div>
      )}
      <div
        className="w-full border-2  bg-[#D5CFC4] border-[#DFDFDF] rounded-lg flex flex-col p-4 ring-4 ring-inset ring-white text-[#58351F]"
        style={{ transform: "translateY(-1rem)" }}
      >
        {data[selected].decs && (
          <div className="flex py-6 px-4 mb-2.5">{data[selected].decs}</div>
        )}
        <div className="flex justify-between">
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
          <div className="flex gap-4">
            <button
              className={`w-10 h-10  rounded-full flex justify-center items-center ${
                project == "hakka_li" ? "bg-[#58351F]" : "bg-[#3D506A]"
              }`}
              onClick={handleLastItemOnclick}
            >
              <img className="w-4 h-4" src={arrowLeft} alt="" />
            </button>
            <button
              className={`w-10 h-10  rounded-full flex justify-center items-center ${
                project == "hakka_li" ? "bg-[#58351F]" : "bg-[#3D506A]"
              }`}
              onClick={handleNextItemOnclick}
            >
              <img className="w-4 h-4" src={arrowRight} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
