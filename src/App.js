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
import { BiSolidUpArrow } from "react-icons/bi";
import { LuAlarmClock } from "react-icons/lu";
import { BiSolidDownArrow } from "react-icons/bi";

// ----------------
import snow_morning from "./assets/img/snow_morning.jpg";
import snow_afternoon from "./assets/img/snow_afternoon.jpg";
import snow_night from "./assets/img/snow_night.jpg";
import thunderstorm from "./assets/img/thunderstorm.jpg";

import rain from "./assets/img/rain.jpg";
import cloudy from "./assets/img/cloudy.jpg";
import morning from "./assets/img/morning.jpg";
import night from "./assets/img/night.jpg";
import afternoon from "./assets/img/afternoon.jpg";

function App() {
  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);
  const [weatherType, setWeatherType] = useState([]);
  const [subWeatherType, setSubWeatherType] = useState([]);
  const [search, setSearch] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [temperature, setTemperature] = useState([]);
  const [tempmax, setTempmax] = useState([]);
  const [tempmin, setTempmin] = useState([]);

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
    setSubWeatherType(json?.weather[0]?.description);
    setTempmax(json?.main?.temp_max);
    setTempmin(json?.main?.temp_min);
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
              className="w-[35px] ml-[-44px]  drop-shadow-2xl  h-[35px] rounded-full flex justify-center items-center  bg-[#57dae8a6] mr-[4px]"
            >
              <BiSearch className="drop-shadow-xl" />
            </button>
          </div>
          <div className="flex justify-center">
            <div
              id="imcontainer"
              className="w-full h-[208px] bg- mt-[20px] mb-[10px] rounded-xl p-[14px] flex justify-start items-center flex-col drop-shadow-2xl"
              style={{ transition: ".4s" }}
            >
              {weatherType === "Rain" ? (
                <>
                  <img
                    src={rain}
                    className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                    // style={{ transition: ".4s" }}
                  ></img>
                </>
              ) : weatherType === "Clouds" ? (
                <>
                  <img
                    src={cloudy}
                    className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                    // style={{ transition: ".4s" }}
                  ></img>
                </>
              ) : weatherType === "Thunderstorm" ? (
                <>
                  <img
                    src={thunderstorm}
                    className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                    // style={{ transition: ".4s" }}
                  ></img>
                </>
              ) : hour >= 6 && hour <= 13 ? (
                temperature <= 20 ? (
                  <>
                    <img
                      src={snow_morning}
                      className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                      // style={{ transition: ".4s" }}
                    ></img>
                  </>
                ) : (
                  <>
                    <img
                      src={morning}
                      className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                      // style={{ transition: ".4s" }}
                    ></img>
                  </>
                )
              ) : hour > 13 && hour <= 20 ? (
                temperature <= 20 ? (
                  <>
                    <img
                      src={snow_afternoon}
                      className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                      // style={{ transition: ".4s" }}
                    ></img>
                  </>
                ) : (
                  <>
                    <img
                      src={afternoon}
                      className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                      // style={{ transition: ".4s" }}
                    ></img>
                  </>
                )
              ) : temperature <= 20 ? (
                <>
                  <img
                    src={snow_night}
                    className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                    // style={{ transition: ".4s" }}
                  ></img>
                </>
              ) : (
                <>
                  <img
                    src={night}
                    className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                    // style={{ transition: ".4s" }}
                  ></img>
                </>
              )}
              <div className="w-full h-full fixed mt-[-14px] bg-[#00000045] rounded-xl "></div>
              <div
                className="flex  flex-row justify-between items-center w-full text-[white] select-none"
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
                <div className="flex flex-col justify-end items-end select-none">
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
                className="text-[50px] font-semibold text-white drop-shadow-2xl mt-[18px] font-[CustomFont] flex flex-row justify-between w-full items-center select-none"
                style={{ transition: ".4s", zIndex: "5" }}
              >
                <span className="flex text-[13px] justify-center items-center">
                  {Math.round(tempmax)}°C
                  <BiSolidUpArrow className="text-[15px] mx-[7px]" />
                </span>
                {temperature === undefined ? (
                  <>00°C</>
                ) : (
                  <>{Math.round(temperature)}°C</>
                )}
                <span className="flex text-[13px] justify-center items-center">
                  <BiSolidDownArrow className="text-[15px] mx-[7px]" />
                  {Math.round(tempmin)}°C
                </span>
              </div>
              <span
                className="font-semibold text-white mt-[-10px] text-[16px] select-none"
                style={{ zIndex: "5" }}
              >
                {weatherType === null ? (
                  <>__</>
                ) : (
                  <>
                    {weatherType},{" "}
                    <span className="font-normal ">{subWeatherType}</span>
                  </>
                )}
              </span>
              <span
                className="w-full  text-white  text-[13px] select-none drop-shadow-2xl font-[CustomFont] flex justify-center items-center mt-[18px]"
                style={{ zIndex: "5" }}
              >
                {hour >= 6 && hour <= 13 ? (
                  <>
                    <span className="flex justify-center items-center">
                      <LuAlarmClock className="mr-[8px]" /> Morning
                    </span>
                  </>
                ) : hour > 13 && hour <= 20 ? (
                  <>
                    <span className="flex justify-center items-center">
                      <LuAlarmClock className="mr-[8px]" /> Afternoon
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex justify-center items-center">
                      <LuAlarmClock className="mr-[8px]" /> Night
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="w-full flex justify-between items-center flex-wrap  drop-shadow-xl select-none">
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
