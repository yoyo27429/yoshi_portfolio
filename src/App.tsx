import { useEffect, useState } from "react";
import { Modal3Type, Modal4Type } from "./type/modalType.tsx";
import { Modal3, Modal4 } from "./component/modal.tsx";
import "./App.css";
import city from "./assets/city.svg";
import building1 from "./assets/trend.png";
import building2 from "./assets/asus.png";
import building3 from "./assets/side_project.png";
import building4 from "./assets/stockfeel.png";
import building5 from "./assets/tolka.png";

type getGoogleSheetType = {
  apiKey: string;
  sheetId: string;
};

type clickPropsType = {
  id: string;
  name: string;
};

function App() {
  const [profile, setProfile] = useState<Modal3Type>();
  const [workList, setWorkList] = useState<Modal4Type[]>();
  const [showWorkData, setShowWorkData] = useState<Modal4Type>();
  const [clickBuilding, setClickBuilding] = useState<string>("");
  const [wheelCount, setWheelCount] = useState(0);

  useEffect(() => {
    getProfile({
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID,
    });
    getWorkDetail({
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID,
    });
  }, []);

  const getProfile = async (params: getGoogleSheetType) => {
    // Sheets 中要取得的資料範圍，格式如下
    const range = "Database!A1:H2";
    // Sheets API 的 URL
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${params.sheetId}/values/${range}?key=${params.apiKey}`;

    // 使用 fetch 打 API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfile({
          title: data.values[1][1],
          desc: data.values[1][2],
          desc2: data.values[1][3],
          buttonText: data.values[1][4],
          buttonText2: data.values[1][6],
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  const getWorkDetail = async (params: getGoogleSheetType) => {
    // Sheets 中要取得的資料範圍，格式如下
    const range = "work!A1:P6";
    // Sheets API 的 URL
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${params.sheetId}/values/${range}?key=${params.apiKey}`;

    // 使用 fetch 打 API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(`work detail: ${data}`, data);
        const resWork: Modal4Type[] = [];
        for (let i = 1; i < data.values.length; i++) {
          const linkList: string[] = [];
          for (let j = 12; j < data.values[i].length; j++) {
            if (data.values[i][j] != "") {
              linkList.push(data.values[i][j]);
            } else {
              continue;
            }
          }
          resWork.push({
            name: data.values[i][0],
            title: data.values[i][1],
            time: data.values[i][2],
            desc: data.values[i][4],
            desc2: data.values[i][5],
            link: linkList,
            closeFun: () => {
              console.log("點擊");

              setShowWorkData();
            },
          });
        }
        setWorkList(resWork);
      })
      .catch((error) => console.error("Error:", error));
  };

  const buildings = [
    {
      id: "building1",
      name: "trend",
      color: "red",
      path: "M96.8792 511.473L97.8621 510.892V509.751V330.266L108.32 325.786L109.532 325.267V323.948V314.266L163.261 283.006L171.375 288.905L172.501 289.724L173.66 288.951L185.66 280.955H199.226H224.496L271.414 310.063V326.447V327.593L272.403 328.173L319.761 355.922V518.083V521.456L322.721 519.837L365.771 496.292L370.61 499.919V552.702L355.84 560.472L354.772 561.034V562.242V589.35L236.849 649.921L79.5234 548.653V521.724L96.8792 511.473Z",
    },
    {
      id: "building2",
      name: "asus",
      color: "red",
      path: "M637.687 317.282L375.944 474.756L322.595 441.428V355.609L273.414 325.614V159.807L348.436 116.481L350.937 80.6537L435.128 30.6619L464.303 48.159L500.98 23.1631L517.652 36.4942L525.154 30.6619L581.004 63.9897V105.65L637.687 136.478V308.116V317.282Z",
    },
    {
      id: "building3",
      name: "side_project",
      color: "red",
      path: "M644.355 56.4914V168.973L743.551 223.964V132.312L927.772 231.463V126.48L710.208 4V97.3181L644.355 56.4914Z",
    },
    {
      id: "building4",
      name: "stockfeel",
      color: "red",
      path: "M428.457 770.541L565.164 849.695L631.85 805.535L644.353 813.034L677.696 792.204V558.909L653.523 546.411V535.58L661.025 531.414L599.34 493.92V479.755L579.334 468.924L540.99 489.754V506.418L530.987 520.582L492.642 540.579V721.383L469.302 735.547V577.239L428.457 599.736V770.541Z",
    },
    {
      id: "building5",
      name: "tolka",
      color: "red",
      path: "M779.395 673.89L854.416 714.717L937.774 659.726L1042.8 721.383L1112.83 678.056V493.92L1098.65 485.588V440.595L984.454 375.606V418.099L944.443 393.103L857.751 443.095L779.395 489.754V673.89Z",
    },
  ];

  useEffect(() => {
    if (wheelCount < 300) {
      setClickBuilding("");
    } else if (wheelCount > 300 && wheelCount < 600) {
      setClickBuilding("building4");
    } else if (wheelCount > 600 && wheelCount < 900) {
      setClickBuilding("building1");
    } else if (wheelCount > 900 && wheelCount < 1200) {
      setClickBuilding("building2");
    } else if (wheelCount > 1200 && wheelCount < 1500) {
      setClickBuilding("building5");
    } else if (wheelCount > 1500 && wheelCount < 1800) {
      setClickBuilding("building3");
    } else {
      setClickBuilding("");
    }
  }, [wheelCount]);

  const handleOnWheel = (event) => {
    if (event.deltaY > 0) {
      // 滾輪向下
      // 執行下一步邏輯
      console.log(`Next step triggered! ${event.deltaY}`);
      const newDeltaY = wheelCount + event.deltaY;
      setWheelCount(newDeltaY);
    } else if (event.deltaY < 0) {
      // 滾輪向上
      console.log("previous step triggered!");
      const newDeltaY = wheelCount + event.deltaY;
      setWheelCount(newDeltaY);
    }
  };

  useEffect(() => {
    switch (clickBuilding) {
      case "building1": {
        const work = workList.find((w) => w.name == "trend");
        setShowWorkData(work);
        setWheelCount(601);
        break;
      }
      case "building2": {
        const work = workList.find((w) => w.name == "asus");
        setShowWorkData(work);
        setWheelCount(901);
        break;
      }
      case "building3": {
        const work = workList.find((w) => w.name == "side_project");
        setShowWorkData(work);
        setWheelCount(1501);
        break;
      }
      case "building4": {
        const work = workList.find((w) => w.name == "stockfeel");
        setShowWorkData(work);
        setWheelCount(301);
        break;
      }
      case "building5": {
        const work = workList.find((w) => w.name == "tolka");
        setShowWorkData(work);
        setWheelCount(1201);
        break;
      }
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickBuilding]);

  const CityMap = () => {
    const handleBuildingClick = (props: clickPropsType) => {
      // alert(`你點擊了: ${buildingName}`);
      console.log(`click building: ${props.id}`);
      setClickBuilding(props.id);
      // const work = workList.find((w) => w.name == props.name);
      // setShowWorkData(work);
    };

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1142 1019"
        className="city"
      >
        <image
          href={
            clickBuilding == ""
              ? city
              : clickBuilding == "building1"
              ? building1
              : clickBuilding == "building2"
              ? building2
              : clickBuilding == "building3"
              ? building3
              : clickBuilding == "building4"
              ? building4
              : building5
          }
        />
        {buildings.map((building) => (
          <path
            key={building.id}
            d={building.path}
            fill="transparent"
            stroke={building.color}
            strokeWidth="2"
            onClick={() =>
              handleBuildingClick({ id: building.id, name: building.name })
            }
          />
        ))}
      </svg>
    );
  };

  return (
    <>
      <div
        className="w-screen h-screen overflow-hidden relative"
        onWheel={handleOnWheel}
      >
        <CityMap />
        <div className="top_cloud"></div>
        <div className="top_cloud cloud"></div>
        <div className="bottom_cloud"></div>
        <div className="bottom_cloud bottom_cloud2"></div>
        <div className="sky_bgc"></div>
        <div className="sky_bgc bgc2"></div>
      </div>
      {!showWorkData && profile && <Modal3 props={profile} />}
      {showWorkData && <Modal4 props={showWorkData} />}
    </>
  );
}

export default App;
