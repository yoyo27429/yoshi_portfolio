import { useEffect, useState, useRef, PropsWithChildren } from "react";
import { Modal3Type, Modal4Type, Modal5Type } from "../type/modalType.tsx";
import { modalTV } from "../tailwindVariant/modal_style.tsx";
import { tagTV } from "../tailwindVariant/tag_style.tsx";
import cross from "../assets/Close.svg";
import point from "../assets/point.svg";
import { useSearchParams } from "react-router-dom";

type Modal3TypeClass = {
  data: Modal3Type;
};

export const Modal3 = ({ data }: Modal3TypeClass) => {
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

type Modal4TypeClass = {
  data: Modal4Type;
};

export const Modal4 = ({ data }: Modal4TypeClass) => {
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
          className="w-[60px] h-[60px] bg-[#ebedf1] rounded-full"
          onClick={data.closeFun}
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

type Modal5TypeClass = {
  data: Modal5Type;
};

export const Modal5: React.FC<PropsWithChildren<Modal5TypeClass>> = ({
  data,
  children,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="font-roboto absolute z-20 w-10/12 top-1 left-[8.3%] rounded-3xl bg-white px-8">
      <div
        className="absolute right-5 top-5 bg-[#3D506A] w-[60px] h-[60px] rounded-full"
        onClick={() => {
          searchParams.delete("company");
          searchParams.delete("project");
          setSearchParams();
        }}
      >
        <img
          className="absolute top-[23px] left-[23px] w-3.5 h-3.5"
          src={cross}
          alt=""
        />
      </div>
      <div
        className={`mt-10 ${tagTV({
          type: data.tagColor,
        })}`}
      >
        <span className="text-base">{data.tag}</span>
      </div>
      <div className="flex mt-4 mb-10">
        <img className="w-4 h-4 select_arrow mt-3" src={point} alt="" />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">{data.title}</h1>
          <p className="text-base">{data.desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
