import { Modal5 } from "../component/modal.tsx";
import { useEffect, useState } from "react";
import banner from "/images/stockfeel/project0/banner.png";
import parse from "html-react-parser";
import { textTV } from "../tailwindVariant/text_style.tsx";
import {
  CarouselContentType,
  CarouselPropsType,
} from "../type/carouselType.tsx";
import { Modal5Type } from "../type/modalType.tsx";
import { Carousel } from "../component/carousel.tsx";
import {
  ColumnComponent,
  TwoColumnContainer,
} from "../component/two_column.tsx";
import { useSearchParams } from "react-router-dom";

type RawDataType =
  | { type: "carousel"; data: CarouselPropsType }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: "2col"; data: any };

const imageBaseUrl = "/yoshi_portfolio/images/stockfeel/project0/";
export const StockfeelPreject0 = () => {
  const [projectDetail, setProjectDetail] = useState<Modal5Type | null>(null);
  const [rawData, setRawData] = useState<RawDataType[]>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("stockfeel 0 init");

    getProjectDetail();
  }, []);

  useEffect(() => {
    if (!searchParams.get("company") && !searchParams.get("project")) {
      setProjectDetail(null);
    }
  }, [searchParams.get("company"), searchParams.get("project")]);

  const getProjectDetail = async () => {
    const range = "新光-會員專區DB!A1:Q18";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${
      import.meta.env.VITE_GOOGLE_SHEET_ID
    }/values/${range}?key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        console.log(`project detail: `, res);
        const data = res.values;
        const dataComponent: RawDataType[] = [];
        for (let row = 5; row < data.length; row++) {
          if (data[row][0] == "Carousel") {
            const carouselData: CarouselContentType[] = [];
            for (let col = 3; col < data[row].length; col++) {
              const carousel1 = data[row];
              if (col % 2 == 1 && carousel1[col]) {
                carouselData.push({
                  tabName: carousel1[col],
                  decs: carousel1[col + 1] ?? "",
                  image: `Carousel${row}-${(col - 1) / 2}`,
                });
              }
            }
            dataComponent.push({
              type: "carousel",
              data: {
                title: data[row][1],
                subtitle: data[row][2],
                content: carouselData,
              },
            });
          } else {
            dataComponent.push({ type: "2col", data: data[row] });
          }
        }

        console.log("combination data:", dataComponent);
        setRawData(dataComponent);
        setProjectDetail({
          title: data[1][1],
          desc: data[2][1],
          tagColor: 1,
          tag: data[0][1],
        });
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    projectDetail && (
      <Modal5 data={projectDetail}>
        <img className="w-full" src={banner} alt="" />
        {rawData &&
          rawData.map((data, i) => {
            const rowData = data.data;
            switch (data.type) {
              case "carousel":
                return (
                  <div
                    key={i}
                    className="flex flex-col border-t-2 py-3 gap-2 border-[rgba(148,148,148,0.2)"
                  >
                    <h3 className={textTV({ type: "title" })}>
                      {data.data.title}
                    </h3>
                    <h3 className={textTV({ type: "subtitle" })}>
                      {data.data.subtitle}
                    </h3>
                    <Carousel
                      company="stockfeel"
                      project="project0"
                      data={data.data.content}
                    />
                  </div>
                );

              default:
                switch (i) {
                  case 0:
                    return (
                      <TwoColumnContainer key={i}>
                        <ColumnComponent>
                          {parse(rowData[1])}
                          <a
                            className="w-fit rounded-full bg-white border-2 button_border py-3 px-4 mt-3"
                            href={rowData[3]}
                          >
                            {rowData[2]}
                          </a>
                        </ColumnComponent>
                        <ColumnComponent>
                          <div className="flex flex-col  py-3 gap-2 ">
                            <span className="text-sm text-[#949494]">
                              {rowData[4]}
                            </span>
                            <span className="text-xs text-[#3D506A]">
                              {parse(rowData[5])}
                            </span>
                          </div>
                          <div className="flex flex-col border-t-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
                            <span className="text-sm text-[#949494]">
                              {rowData[6]}
                            </span>
                            <span className="text-xs text-[#3D506A]">
                              {parse(rowData[7])}
                            </span>
                          </div>
                          <div className="flex flex-col border-t-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
                            <span className="text-sm text-[#949494]">
                              {rowData[8]}
                            </span>
                            <span className="text-xs text-[#3D506A]">
                              {rowData[9]}
                            </span>
                          </div>
                        </ColumnComponent>
                      </TwoColumnContainer>
                    );
                  case 2:
                    return (
                      <TwoColumnContainer key={i}>
                        <ColumnComponent>
                          <h3 className={textTV({ type: "title" })}>
                            {rowData[1]}
                          </h3>
                          <h3 className={textTV({ type: "subtitle" })}>
                            {rowData[2]}
                          </h3>
                        </ColumnComponent>
                        <ColumnComponent>
                          <img src={`${imageBaseUrl}2col1.png`} alt="" />
                          <div className="flex flex-col border-b-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
                            <p>{rowData[3]}</p>
                            <p>{rowData[4]}</p>
                          </div>
                          <div className="flex flex-col border-b-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
                            <p>{rowData[5]}</p>
                            <p>{rowData[6]}</p>
                          </div>
                          <div className="flex flex-col py-3 gap-2">
                            <p>{rowData[7]}</p>
                            <p>{rowData[8]}</p>
                          </div>
                        </ColumnComponent>
                      </TwoColumnContainer>
                    );
                  case 3:
                    return (
                      <TwoColumnContainer key={i}>
                        <ColumnComponent>
                          <h3 className={textTV({ type: "title" })}>
                            {rowData[1]}
                          </h3>
                          <h3 className={textTV({ type: "subtitle" })}>
                            {rowData[2]}
                          </h3>
                        </ColumnComponent>
                        <ColumnComponent>
                          <p>{rowData[3]}</p>
                          <img src={`${imageBaseUrl}2col2.png`} alt="" />
                          <p>{parse(rowData[4])}</p>
                        </ColumnComponent>
                      </TwoColumnContainer>
                    );
                  case 4:
                    return (
                      <TwoColumnContainer key={i}>
                        <ColumnComponent>
                          <h3 className={textTV({ type: "title" })}>
                            {rowData[1]}
                          </h3>
                          <h3 className={textTV({ type: "subtitle" })}>
                            {rowData[2]}
                          </h3>
                        </ColumnComponent>
                        <ColumnComponent>
                          <img src={`${imageBaseUrl}2col3.png`} alt="" />
                          <div className="flex flex-col border-b-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
                            <p>{rowData[3]}</p>
                            <p>{rowData[4]}</p>
                          </div>
                          <p>{rowData[5]}</p>
                          <p>{rowData[6]}</p>
                        </ColumnComponent>
                      </TwoColumnContainer>
                    );
                  case 6:
                    return (
                      <TwoColumnContainer key={i}>
                        <ColumnComponent>
                          <h3 className={textTV({ type: "title" })}>
                            {rowData[1]}
                          </h3>
                          <h3 className={textTV({ type: "subtitle" })}>
                            {rowData[2]}
                          </h3>
                        </ColumnComponent>
                        <ColumnComponent>
                          <img src={`${imageBaseUrl}2col4.png`} alt="" />
                          <div className="flex flex-col border-b-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
                            <p>{rowData[3]}</p>
                            <p>{rowData[4]}</p>
                          </div>
                          <p>{rowData[5]}</p>
                          <p>{rowData[6]}</p>
                        </ColumnComponent>
                      </TwoColumnContainer>
                    );
                  case 8:
                    return (
                      <TwoColumnContainer key={i}>
                        <ColumnComponent>
                          <h3 className={textTV({ type: "title" })}>
                            {rowData[1]}
                          </h3>
                          <h3 className={textTV({ type: "subtitle" })}>
                            {rowData[2]}
                          </h3>
                        </ColumnComponent>
                        <ColumnComponent>
                          <img src={`${imageBaseUrl}2col5.png`} alt="" />
                        </ColumnComponent>
                      </TwoColumnContainer>
                    );
                  default:
                    break;
                }
                return <div key={i}></div>;
            }
          })}
      </Modal5>
    )
  );
};
