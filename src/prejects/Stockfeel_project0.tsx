import { Modal5 } from "../component/modal.tsx";
import { useEffect, useState } from "react";

export const StockfeelPreject0 = () => {
  const [projectDetail, setProjectDetail] = useState();

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
        setProjectDetail({
          title: data.values[1][1],
          desc: data.values[1][2],
          tagColor: "#42C5BF",
          tag: "",
        });
      })
      .catch((error) => console.error("Error:", error));
  };
  return projectDetail && <Modal5 props={projectDetail}></Modal5>;
};
