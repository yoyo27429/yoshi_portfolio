import { Modal5 } from "../component/modal.tsx";
import { useEffect, useState } from "react";
import banner from "../assets/stockfeel/project0/banner.png";
import parse from "html-react-parser";

export const StockfeelPreject0 = () => {
  const [projectDetail, setProjectDetail] = useState();
  const [rawData, setRawData] = useState();

  useEffect(() => {
    console.log("stockfeel 0 init");

    getProjectDetail();
  }, []);

  const getProjectDetail = async () => {
    const range = "新光-會員專區DB!A1:Q17";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${
      import.meta.env.VITE_GOOGLE_SHEET_ID
    }/values/${range}?key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(`project detail: `, data);
        setRawData(data.values);
        setProjectDetail({
          title: data.values[1][1],
          desc: data.values[2][1],
          tagColor: 1,
          tag: data.values[0][1],
        });
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    projectDetail && (
      <Modal5 props={projectDetail}>
        <img className="w-full" src={banner} alt="" />
        <div className="flex gap-10 my-[60px]">
          <div className="flex flex-col w-1/2 border-t-2 py-3 border-[rgba(148,148,148,0.2)">
            {parse(rawData[5][1])}
            <a
              className="w-fit rounded-full bg-white border-2 button_border py-3 px-4 mt-3"
              href={rawData[5][3]}
            >
              {rawData[5][2]}
            </a>
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <div className="flex flex-col border-t-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
              <span className="text-sm text-[#949494]">{rawData[5][4]}</span>
              <span className="text-xs text-[#3D506A]">
                {parse(rawData[5][5])}
              </span>
            </div>
            <div className="flex flex-col border-t-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
              <span className="text-sm text-[#949494]">{rawData[5][6]}</span>
              <span className="text-xs text-[#3D506A]">
                {parse(rawData[5][7])}
              </span>
            </div>
            <div className="flex flex-col border-t-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
              <span className="text-sm text-[#949494]">{rawData[5][8]}</span>
              <span className="text-xs text-[#3D506A]">
                {parse(rawData[5][9])}
              </span>
            </div>
          </div>
        </div>
      </Modal5>
    )
  );
};
