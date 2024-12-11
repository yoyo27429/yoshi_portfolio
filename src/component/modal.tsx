import { useEffect, useState, useRef } from "react";
import { Modal3Type, Modal4Type } from "../type/modalType.tsx";
import { modalTV } from "../tailwindVariant/modal_style.tsx";
import cross from "../assets/Close.svg";
import point from "../assets/point.svg";

export const Modal3 = (props: Modal3Type) => {
  const data = props.props as Modal3Type;
  console.log(`modal 3 :${props.props.title}`, props);

  return (
    <div
      className={`${modalTV({
        withbgc: true,
      })} px-9 w-[331px] h-[360px] pixel_modal`}
    >
      <h1 className="text-3xl mt-10 mb-8">{data.title}</h1>
      <p className="text-base mb-3">{data.desc}</p>
      <p className="text-base mb-9">{data.desc2}</p>
      <div className="flex gap-3">
        <button className="w-[106px] h-10 rounded-full bg-white border-2 button_border">
          {data.buttonText}
        </button>
        <button className="w-[106px] h-10 rounded-full bg-white border-2 button_border">
          {data.buttonText2}
        </button>
      </div>
    </div>
  );
};

export const Modal4 = (props: Modal4Type) => {
  const data = props.props as Modal4Type;
  const [selecting, setSelecting] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelecting(0);

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(`Key pressed: ${event.key}`);
      if (event.key === "ArrowUp") {
        setSelecting((prev) => (prev > 0 ? prev - 1 : data.link.length - 1));
      } else if (event.key === "ArrowDown") {
        setSelecting((prev) => (prev < data.link.length - 1 ? prev + 1 : 0));
      }
    };

    // const modalElement = modalRef.current;
    // 添加鍵盤監聽器
    window.addEventListener("keydown", handleKeyDown);

    // 清除監聽器
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data]); // 當 data 改變時觸發

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(`Key pressed: ${event.key}`);
      if (event.key === "ArrowUp") {
        setSelecting((prev) => (prev > 0 ? prev - 1 : data.link.length - 1));
      } else if (event.key === "ArrowDown") {
        setSelecting((prev) => (prev < data.link.length - 1 ? prev + 1 : 0));
      }
    };

    const modalElement = modalRef.current;

    if (modalElement) {
      modalElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("keydown", handleKeyDown);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={` max-w-[419px] pixel_modal_shadow ${modalTV({
        withbgc: false,
      })}`}
      ref={modalRef}
      tabIndex={0}
    >
      <div className="pixel_modal_header flex justify-between px-6 items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl">{data.title}</h1>
          {data.time && <p className="text-sm">{data.time}</p>}
        </div>
        <div
          className="w-[60px] h-[60px] bg-[#3D506A] rounded-full"
          onClick={props.closeFun}
        >
          <img className="w-4 h-4 m-[22px]" src={cross} alt="" />
        </div>
      </div>
      <div className="pixel_modal_body px-6 py-3">
        <p className="text-base mb-3">{data.desc}</p>
        <p className="text-base mb-9">{data.desc2}</p>
        <ul className="ml-7">
          {data.link.map((link, i) => {
            return (
              <li className="my-1 flex gap-2 items-center" key={link}>
                {i === selecting && (
                  <img className="w-4 h-4 select_arrow" src={point} alt="" />
                )}
                <button
                  className={`text-base ${i === selecting ? "" : "ml-6"}`}
                  onClick={() => {
                    console.log(`click com: ${data.name} index: ${i}`);

                    data.clickLink(data.name, i);
                  }}
                >
                  {link}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const Modal5 = (props: Modal5Type) => {
  const data = props.props as Modal5Type;
  return (
    <div className=" w-10/12 rounded-3xl bg-white">
      <div
        className={`flex justify-between items-center px-4 py-1 bg-[#${data.tagColor}]`}
      >
        <span className="text-base">{data.tag}</span>
      </div>
      <h1 className="text-2xl">{data.title}</h1>
      <p className="text-base">{data.desc}</p>
    </div>
  );
};
