import { useEffect, useState, useRef, PropsWithChildren } from "react";
import { Modal3Type, Modal4Type, Modal5Type } from "../type/modalType.tsx";
import { modalTV } from "../tailwindVariant/modal_style.tsx";
import { tagTV } from "../tailwindVariant/tag_style.tsx";
import cross from "../assets/Close.svg";
import point from "../assets/point.svg";
import unsupportIcon from "../assets/unsupportIcon.png";
import locker from "../assets/locker.png";
import contactIcon from "../assets/contact.png";
import arrowDown from "../assets/Arrow_down.png";
import { useSearchParams } from "react-router-dom";
import { PasswordState, useUserStore } from "../store.tsx";

type Modal3TypeClass = {
  data: Modal3Type;
};

export const Modal3 = ({ data }: Modal3TypeClass) => {
  return (
    <div
      className={`${modalTV({
        withbgc: true,
      })} px-9 w-[331px] h-[360px] pixel_modal z-10`}
    >
      <h1 className="text-3xl mt-10 mb-8">{data.title}</h1>
      <p className="text-base mb-3">{data.desc}</p>
      <p className="text-base mb-9">{data.desc2}</p>
      <div className="flex gap-3">
        <button className="gap-2 h-10 rounded-full bg-white border-2 button_border flex justify-center items-center px-3 py-4">
          {data.buttonText2}
          <img className="w-4 h-4" src={contactIcon} alt="" />
        </button>
        <button className="gap-2 h-10 rounded-full bg-white border-2 button_border flex justify-center items-center px-3 py-4">
          {data.buttonText}
          <img className="w-4 h-4" src={arrowDown} alt="" />
        </button>
      </div>
    </div>
  );
};

type Modal4TypeClass = {
  data: Modal4Type;
};

export const Modal4 = ({ data }: Modal4TypeClass) => {
  const { setShowModal } = useUserStore<PasswordState>((state) => state);

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
      className={`max-w-[419px] pixel_modal_shadow top-12 ${modalTV({
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
              <li className="my-1 flex gap-2 items-center" key={link.name}>
                {i === selecting && (
                  <img className="w-4 h-4 select_arrow" src={point} alt="" />
                )}
                <button
                  className={`text-base ${i === selecting ? "" : "ml-6"}`}
                  onClick={() => {
                    console.log(`click com: ${data.name} index: ${i}`);
                    setShowModal(link.password, data.name, i);
                  }}
                >
                  {link.name}
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
    <div className="relative bg-[rgba(0,0,0,0.88)] w-full h-full min-h-screen min-w-full overflow-auto">
      <div className="font-roboto absolute z-20 w-10/12 top-1 left-[8.3%] rounded-3xl bg-white px-8">
        <div
          className={`absolute right-5 top-5  ${
            data.tagColor == 1 ? "bg-[#3D506A]" : "bg-[#58351F]"
          } w-[60px] h-[60px] rounded-full`}
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
            <h1
              className={`text-2xl ${
                data.tagColor == 1 ? "text-[#3D506A]" : "text-[#58351F]"
              }`}
            >
              {data.title}
            </h1>
            <p
              className={`text-base ${
                data.tagColor == 1 ? "text-[#949494]" : "text-[#D38E49]"
              }`}
            >
              {data.desc}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export const UnsupportModal = () => {
  return (
    <div className="relative bg-[rgba(0,0,0,0.88)] w-full h-full min-h-screen min-w-full overflow-auto">
      <div
        className={`max-w-[231px] pixel_modal_shadow top-52 justify-center left-1/2 -translate-x-1/2 ${modalTV(
          {
            withbgc: false,
            isCenter: true,
          }
        )}`}
      >
        <div className="pixel_modal_header unsupport_modal flex justify-between px-6 items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl">不支援手機</h1>
          </div>
        </div>
        <div className="pixel_modal_body px-6 py-3 flex flex-col justify-center items-center">
          <img className="w-[72px] h-[72px] mb-3" src={unsupportIcon} alt="" />
          <p className="text-base mb-3 leading-8">
            為了良好的使用體驗，
            <br />
            請使用電腦裝置瀏覽
          </p>
        </div>
      </div>
    </div>
  );
};

export const PasswordModal = () => {
  const { password, closeModal } = useUserStore<PasswordState>(
    (state) => state
  );

  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const [isError, setIsError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    // 只允許數字
    if (/^\d*$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // 自動跳到下一個輸入框
      if (value && index < values.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  useEffect(() => {
    if (`${values[0]}${values[1]}${values[2]}${values[3]}` === password) {
      setIsError(false);
      closeModal();
    } else {
      if (
        values[0] != "" &&
        values[1] != "" &&
        values[2] != "" &&
        values[3] != ""
      ) {
        setIsError(true);
      }
    }
  }, [values]);
  return (
    <div className="relative bg-[rgba(0,0,0,0.88)] w-full h-full min-h-screen min-w-full overflow-auto z-20">
      <div
        className={`max-w-[372px] pixel_modal_shadow top-1/2 -translate-y-1/2 justify-center left-1/2 -translate-x-1/2  ${modalTV(
          {
            withbgc: false,
            isCenter: true,
            priority: 2,
          }
        )}`}
      >
        <div className="pixel_modal_header password_modal flex justify-between px-6 items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl">請輸入密碼</h1>
          </div>
          <div
            className="w-[60px] h-[60px] bg-[#3D506A] rounded-full"
            onClick={() => {
              closeModal();
            }}
          >
            <img className="w-4 h-4 m-[22px]" src={cross} alt="" />
          </div>
        </div>
        <div className="pixel_modal_body px-6 py-3 flex flex-col justify-center items-center">
          <img className="w-[72px] h-[72px] mb-3" src={locker} alt="" />
          <p className="text-base mb-3 leading-8">
            因專案無法對外公開，請輸入密碼檢視內容
          </p>
          <div className="flex gap-5 mb-5">
            {values.map((value, index) => (
              <input
                className="w-10 h-10 pxiel_input"
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleChange(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1} // 限制每個輸入框只能輸入一位數字
              />
            ))}
          </div>
          {isError && (
            <p className="text-red-700">
              密碼錯誤，請不要再嘗試 ＼(º □ º l|l)/
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
