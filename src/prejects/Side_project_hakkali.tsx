import { Modal5 } from "../component/modal.tsx";
import { useEffect, useState } from "react";
import banner from "/images/side_project/hakka_li/banner.png";
import banner2 from "/images/side_project/hakka_li/banner2.png";
import banner3 from "/images/side_project/hakka_li/banner3.png";
import parse from "html-react-parser";
import { textTV } from "../tailwindVariant/text_style.tsx";
import {
  CarouselContentType,
  CarouselPropsType,
} from "../type/carouselType.tsx";
import { Modal5Type } from "../type/modalType.tsx";
import { Carousel, CustomCarousel } from "../component/carousel.tsx";
import {
  ColumnComponent,
  TwoColumnContainer,
} from "../component/two_column.tsx";
import { useSearchParams } from "react-router-dom";

type RawDataType =
  | { type: "carousel"; data: CarouselPropsType }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: "2col"; data: any };

const imageBaseUrl = "/yoshi_portfolio/images/side_project/hakka_li/";
export const SideProjectHakkali = () => {
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
    const range = "SP-會員專區DB!A1:Q18";
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
          tagColor: 2,
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
                    <h3 className={textTV({ type: "title", color: "type2" })}>
                      {data.data.title}
                    </h3>
                    <h3
                      className={textTV({ type: "subtitle", color: "type2" })}
                    >
                      {data.data.subtitle}
                    </h3>
                    {i === 5 ? (
                      <CustomCarousel
                        company="side_project"
                        project="hakka_li"
                        data={data.data.content}
                      />
                    ) : (
                      <Carousel
                        company="side_project"
                        project="hakka_li"
                        data={data.data.content}
                      />
                    )}
                  </div>
                );

              default:
                switch (i) {
                  case 0:
                    return (
                      <TwoColumnContainer key={i}>
                        <ColumnComponent>
                          <p className="text-[#58351F] text-base ">
                            {parse(rowData[1])}
                          </p>
                          <a
                            className="w-fit rounded-full bg-white border-2 button_border py-3 px-4 mt-3"
                            target="_blank"
                            href={rowData[3]}
                          >
                            {rowData[2]}
                          </a>
                        </ColumnComponent>
                        <ColumnComponent>
                          <div className="flex flex-col  py-3 gap-2 ">
                            <span className="text-sm text-[#D38E49]">
                              {rowData[4]}
                            </span>
                            <span className="text-xs text-[#58351F]">
                              {parse(rowData[5])}
                            </span>
                          </div>
                          <div className="flex flex-col border-t-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
                            <span className="text-sm text-[#D38E49]">
                              {rowData[6]}
                            </span>
                            <span className="text-xs text-[#58351F]">
                              {parse(rowData[7])}
                            </span>
                          </div>
                          <div className="flex flex-col border-t-2 py-3 gap-2 border-[rgba(148,148,148,0.2)">
                            <span className="text-sm text-[#D38E49]">
                              {rowData[8]}
                            </span>
                            <span className="text-xs text-[#58351F]">
                              {rowData[9]}
                            </span>
                          </div>
                        </ColumnComponent>
                      </TwoColumnContainer>
                    );
                  case 1:
                    return <img src={banner2} alt="" />;
                  case 2:
                    return (
                      <TwoColumnContainer key={i}>
                        <ColumnComponent>
                          <h3
                            className={textTV({
                              type: "title",
                              color: "type2",
                            })}
                          >
                            {rowData[1]}
                          </h3>
                          <h3
                            className={textTV({
                              type: "subtitle",
                              color: "type2",
                            })}
                          >
                            {rowData[2]}
                          </h3>
                        </ColumnComponent>
                        <ColumnComponent>
                          <p className="text-[#58351F]  text-base ">
                            {parse(rowData[3])}
                          </p>
                          <ul className="list-decimal pl-5 text-[#58351F]">
                            <li>{rowData[4]}</li>
                            <li>{rowData[5]}</li>
                            <li>{rowData[6]}</li>
                          </ul>
                          <img
                            className="my-3"
                            src={`${imageBaseUrl}2col1.png`}
                            alt=""
                          />
                          <p className="text-[#58351F] text-base ">
                            {parse(rowData[7])}
                          </p>
                          <img
                            className="my-3"
                            src={`${imageBaseUrl}2col2.png`}
                            alt=""
                          />
                          <p className="text-[#58351F] text-base ">
                            {parse(rowData[8])}
                          </p>
                          <img
                            className="my-3"
                            src={`${imageBaseUrl}2col3.png`}
                            alt=""
                          />
                          <p className="text-[#58351F] text-base ">
                            {parse(rowData[9])}
                          </p>
                          <a
                            className="text-[#4285F4] underline text-base "
                            target="_blank"
                            href="https://docs.google.com/spreadsheets/d/1xEfYQ-JFvZx56BnP3VXmXr9JtrtCW-LYLDQNNSRmkws/edit?gid=1306051432#gid=1306051432"
                          >
                            {rowData[10]}
                          </a>
                          <img
                            className="my-3"
                            src={`${imageBaseUrl}2col4.png`}
                            alt=""
                          />
                        </ColumnComponent>
                      </TwoColumnContainer>
                    );
                  case 6:
                    return (
                      <div className="border-t-2 py-3 border-[rgba(148,148,148,0.2) my-14">
                        <h3
                          className={textTV({
                            type: "title",
                            color: "type2",
                          })}
                        >
                          {rowData[1]}
                        </h3>
                        <h3
                          className={textTV({
                            type: "subtitle",
                            color: "type2",
                          })}
                        >
                          {rowData[2]}
                        </h3>
                        <img className="w-full mt-5" src={banner3} />
                      </div>
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
