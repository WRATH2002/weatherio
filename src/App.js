import "./App.css";
import { useEffect, useState } from "react";
import { weather } from "./utils/constant";
import { API_KEY } from "./utils/constant";
import { BiSearch } from "react-icons/bi";
import mist from "./assets/img/mist.png";
import { LuWind } from "react-icons/lu";
import { LuWaves } from "react-icons/lu";
import { MdVisibility } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsThermometerHalf } from "react-icons/bs";
import night from "./assets/img/night.jpg";
import morning from "./assets/img/morning.jpg";
import afternoon from "./assets/img/afternoon.jpg";
import snoww from "./assets/img/snoww.jpg";

function App() {
  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);
  const [weatherType, setWeatherType] = useState([]);
  const [search, setSearch] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [temperature, setTemperature] = useState([]);
  const [wind, setWind] = useState([]);

  useEffect(() => {
    getWeather();
  }, [searchCity]);

  async function getWeather() {
    const data = await fetch(
      weather + "weather?q=" + searchCity + "&units=metric&appid=" + API_KEY
    );
    const json = await data.json();
    console.log(json);
    setData(json);
    setTemperature(json?.main?.temp);
    setWeatherType(json?.weather[0]?.main);
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let day = today.getDay();
    let hours = today.getHours();
    setDate(date);
    setYear(year);
    setMonth(month);
    setDay(day);
    setHour(hours);
    console.log(month);
  }
  console.log(data);

  function capletter() {
    var tempsearch = search;
    var middletempsearch = tempsearch.toLowerCase();
    var updatetempsearch =
      middletempsearch[0].toUpperCase() + middletempsearch.slice(1);
    console.log(updatetempsearch);
    setSearchCity(updatetempsearch);
  }

  return (
    <>
      <div
        className="w-full font-[CustomFont] h-[60px] lg:h-[70px] md:h-[70px] flex  bg-[#013c58] fixed text-[white] text-[20px] lg:text-[25px] md:text-[25px] font-bold justify-start items-center pl-[30px]"
        style={{ zIndex: "5" }}
      >
        WEATHER.io
      </div>
      <div className="w-full h-[100vh] bg-[#0b1e33] flex justify-center items-center  drop-shadow-2xl ">
        <div className="w-[300px] h-[505px] bg-[#013c58] rounded-3xl  drop-shadow-2xl p-[20px]">
          <div className="flex justify-center items-center mt-[0px] drop-shadow-lg">
            <FaLocationDot
              className="ml-[11px] mr-[-32px] drop-shadow-2xl  "
              style={{ zIndex: "4" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter Location"
              className="w-full text-[15px] outline-none rounded-2xl bg-white pl-[45px] h-[55px]"
            ></input>
            <button
              onClick={() => capletter()}
              className="w-[35px] ml-[-44px]  drop-shadow-2xl  h-[35px] rounded-full flex justify-center items-center  bg-[#a1f6ffa6] mr-[4px]"
            >
              <BiSearch className="drop-shadow-xl" />
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-full h-[208px] bg- mt-[20px] mb-[10px] rounded-xl p-[14px] flex justify-start items-center flex-col drop-shadow-2xl">
              {hour >= 6 && hour <= 13 ? (
                temperature <= 15 ? (
                  <>
                    <img
                      src={snoww}
                      className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                      style={{ transition: ".4s" }}
                    ></img>
                  </>
                ) : (
                  <>
                    <img
                      src={morning}
                      className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                      style={{ transition: ".4s" }}
                    ></img>
                  </>
                )
              ) : hour > 13 && hour <= 20 ? (
                temperature <= 15 ? (
                  <>
                    <img
                      src={snoww}
                      className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                      style={{ transition: ".4s" }}
                    ></img>
                  </>
                ) : (
                  <>
                    <img
                      src={afternoon}
                      className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                      style={{ transition: ".4s" }}
                    ></img>
                  </>
                )
              ) : temperature <= 15 ? (
                <>
                  <img
                    src={snoww}
                    className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                    style={{ transition: ".4s" }}
                  ></img>
                </>
              ) : (
                <>
                  <img
                    src={night}
                    className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                    style={{ transition: ".4s" }}
                  ></img>
                </>
              )}
              <div className="w-full h-full fixed mt-[-14px] bg-[#00000078] rounded-xl "></div>
              <div
                className="flex  flex-row justify-between items-center w-full text-[white] "
                style={{ zIndex: "5" }}
              >
                <div
                  className="flex text-white flex-col"
                  style={{ zIndex: "5" }}
                >
                  <span className="font-bold font-[CustomFont] text-[15px]">
                    {day === 1 ? (
                      <>Monday</>
                    ) : day === 2 ? (
                      <>Tuesday</>
                    ) : day === 3 ? (
                      <>Wednesday</>
                    ) : day === 4 ? (
                      <>Thursday</>
                    ) : day === 5 ? (
                      <>Friday</>
                    ) : day === 6 ? (
                      <>Saturday</>
                    ) : (
                      <>Sunday</>
                    )}
                  </span>
                  <span className=" font-[CustomFont] text-[12px] mt-[-4px]">
                    {date}{" "}
                    {month === 1 ? (
                      <>Jan, </>
                    ) : month === 2 ? (
                      <>Feb, </>
                    ) : month === 3 ? (
                      <>March, </>
                    ) : month === 4 ? (
                      <>April, </>
                    ) : month === 5 ? (
                      <>May, </>
                    ) : month === 6 ? (
                      <>June, </>
                    ) : month === 7 ? (
                      <>July, </>
                    ) : month === 8 ? (
                      <>Aug, </>
                    ) : month === 9 ? (
                      <>Sept, </>
                    ) : month === 10 ? (
                      <>Oct, </>
                    ) : month === 11 ? (
                      <>Nov, </>
                    ) : (
                      <>Dec, </>
                    )}{" "}
                    {year}
                  </span>
                </div>
                <div className="flex flex-col justify-end items-end">
                  <span className="font-bold font-[CustomFont] text-[15px]">
                    {data.length === 0 ? <>__ , __</> : <>{data?.name}</>}
                  </span>
                  <span className=" font-[CustomFont] text-[12px] mt-[-4px]">
                    {data.length === 0 ? (
                      <>__ , __</>
                    ) : (
                      <>{data?.sys?.country}</>
                    )}
                  </span>
                </div>
              </div>

              <div
                className="text-[50px] font-semibold text-white drop-shadow-2xl mt-[18px] font-[CustomFont]"
                style={{ transition: ".4s", zIndex: "5" }}
              >
                {temperature === undefined ? (
                  <>00°C</>
                ) : (
                  <>{Math.round(temperature)}°C</>
                )}
              </div>
              <span
                className="font-semibold text-white mt-[-10px] text-[16px]"
                style={{ zIndex: "5" }}
              >
                {weatherType === null ? <>__</> : <>{weatherType}</>}
              </span>
            </div>
          </div>
          <div className="w-full flex justify-between items-center flex-wrap  drop-shadow-xl">
            <div className="w-[120px] h-[70px] drop-shadow-2xl bg-[white] text-black rounded-xl  my-[10px] flex justify-center items-center flex-col">
              <div className="flex justify-start mb-[10px] items-start w-[90%]">
                <LuWind className="text-[20px] mx-[10px]" />
                <span className="text-[12px]  font-semibold font-[CustomFonttwo]">
                  Wind
                </span>
              </div>
              <span className="text-[12px] font-[CustomFonttwo] ">
                {data?.wind?.speed} Mph
              </span>
            </div>
            <div className="w-[120px] h-[70px] drop-shadow-2xl bg-[white] text-black rounded-xl  my-[10px] flex justify-center items-center flex-col">
              <div className="flex justify-start mb-[10px] items-start w-[90%]">
                <LuWaves className="text-[20px] mx-[10px]" />
                <span className="text-[12px]  font-semibold font-[CustomFonttwo]">
                  Humidity
                </span>
              </div>
              <span className="text-[12px] font-[CustomFonttwo] ">
                {data?.main?.humidity} %
              </span>
            </div>
            <div className="w-[120px] h-[70px] drop-shadow-2xl bg-[white] text-black rounded-xl  my-[10px] flex justify-center items-center flex-col">
              <div className="flex justify-start mb-[10px] items-start w-[90%]">
                <BsThermometerHalf className="text-[20px] mx-[10px]" />
                <span className="text-[12px] font-semibold font-[CustomFonttwo]">
                  Pressure
                </span>
              </div>
              <span className="text-[12px]  font-[CustomFonttwo] ">
                {data === NaN ? <>00 hpa</> : <>{data?.main?.pressure} hpa</>}
              </span>
            </div>
            {/* <div className="w-[70px] h-[70px] drop-shadow-2xl bg-[#00537a] text-white rounded-xl mx-[10px] my-[10px] flex justify-center items-center flex-col">
              <LuWind className="text-[20px]" />
              <span className="text-[12px] font-semibold">Wind</span>
              <span className="text-[12px] ">23</span>
            </div>
            <div className="w-[70px] h-[70px] drop-shadow-2xl bg-[#00537a] text-white rounded-xl mx-[10px] my-[10px] flex justify-center items-center flex-col">
              <LuWind className="text-[20px]" />
              <span className="text-[12px] font-semibold">Wind</span>
              <span className="text-[12px] ">23</span>
            </div> */}
            <div className="w-[120px] h-[70px] drop-shadow-2xl bg-[white] text-black rounded-xl  my-[10px] flex justify-center items-center flex-col">
              <div className="flex justify-start mb-[10px] items-start w-[90%]">
                <MdVisibility className="text-[20px] mx-[10px]" />
                <span className="text-[12px] font-semibold font-[CustomFonttwo]">
                  Visibility
                </span>
              </div>
              <span className="text-[12px]  font-[CustomFonttwo] ">
                {data?.visibility / 100} %
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
