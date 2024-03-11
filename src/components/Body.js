import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { weather } from "../utils/constant";
import { API_KEY } from "../utils/constant";
import { BiSearch } from "react-icons/bi";
import mist from "../assets/img/mist.png";
import { LuWind } from "react-icons/lu";
import { LuWaves } from "react-icons/lu";
import { MdVisibility } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsThermometerHalf } from "react-icons/bs";
import { BiSolidUpArrow } from "react-icons/bi";
import { LuAlarmClock } from "react-icons/lu";
import { BiErrorCircle } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

// ----------------
import snow_morning from "../assets/img/snow_morning.jpg";
import snow_afternoon from "../assets/img/snow_afternoon.jpg";
import snow_night from "../assets/img/snow_night.jpg";
import thunderstorm from "../assets/img/thunderstorm.jpg";

import rain from "../assets/img/rain.jpg";
import cloudy from "../assets/img/cloudy.jpg";
import morning from "../assets/img/morning3.jpg";
import cloudy2 from "../assets/img/cloudy2.jpg";
import morning2 from "../assets/img/morning3.jpg";
import night from "../assets/img/night.jpg";
import afternoon from "../assets/img/afternoon3.jpg";
const Body = () => {
  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // ------------
  const [data, setData] = useState([]);
  const [weatherType, setWeatherType] = useState("");
  const [subWeatherType, setSubWeatherType] = useState("");
  const [search, setSearch] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [tempmax, setTempmax] = useState("");
  const [tempmin, setTempmin] = useState("");
  const [error, setError] = useState("");

  const [wind, setWind] = useState([]);
  // console.log(temperature);
  // console.log(subWeatherType);
  // console.log(tempmin);
  // console.log(data?.visibility);

  useEffect(() => {
    console.log("useEffect");

    clearData();
    getWeather();
    getDate();
    console.log(data);
  }, [searchCity]);

  async function getWeather() {
    const data = await fetch(
      weather + "weather?q=" + searchCity + "&units=metric&appid=" + API_KEY
    );
    const json = await data.json();
    console.log(json);
    setData(json);
    setTemperature(json?.main?.temp);
    setTempmax(json?.main?.temp_max);
    setTempmin(json?.main?.temp_min);

    if (json?.cod === "404") {
      setWeatherType("");
      setSubWeatherType("");
    } else if (json?.cod === "400") {
      setWeatherType("");
      setSubWeatherType("");
    } else {
      setWeatherType(json?.weather[0]?.main);
      setSubWeatherType(json?.weather[0]?.description);
    }

    // console.log(month);
  }

  async function getDate() {
    var today = new Date();
    let datee = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let day = today.getDay();
    let hours = today.getHours();
    setDate(datee);
    setYear(year);
    setMonth(month);
    setDay(day);
    setHour(hours);
  }

  async function clearData() {
    setWeatherType("");
    setSubWeatherType("");
    setTemperature("");
    setTempmax("");
    setTempmin("");
    setError("");
    setWind([]);
  }

  // console.log(error);
  // console.log(data);

  const detectKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("entered");

      capletter();
    }
    // console.log(e.key);
  };

  function capletter() {
    if (search === "" || search === " ") {
      setSearchCity(search);
      console.log("nothing");
      setSearch("");
    } else {
      var tempsearch = search;
      var middletempsearch = tempsearch.toLowerCase();
      var updatetempsearch =
        middletempsearch[0].toUpperCase() + middletempsearch.slice(1);
      console.log(updatetempsearch);
      setSearchCity(updatetempsearch);
      setSearch("");
    }
  }

  // const handleKeypress = (e) => {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     console.log("enter");
  //     capletter();
  //   }
  // };

  return (
    <>
      {error === 404 ? <>not dounf</> : <></>}
      <div
        className="w-full font-[CustomFont] h-[60px] lg:h-[70px] md:h-[70px] flex  bg-[#451e3e] fixed text-[white] text-[20px] lg:text-[25px] md:text-[25px] font-bold justify-start items-center pl-[30px] drop-shadow-lg"
        style={{ zIndex: "5" }}
      >
        WEATHER.io
      </div>
      <div className="w-full h-[100vh] bg-[#0b1e33] flex justify-center items-center  drop-shadow-lg ">
        <div className="w-[300px] h-[505px] bg-[#451e3e] rounded-3xl  drop-shadow-2xl p-[20px]">
          <div className="w-full flex justify-center items-center mt-[0px] drop-shadow-lg">
            <FaLocationDot
              className="ml-[11px] mr-[-32px] drop-shadow-lg  "
              style={{ zIndex: "4" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => detectKeyDown(e)}
              // onKeyPress={handleKeypress}
              placeholder="Enter Location"
              className="w-full text-[15px] outline-none rounded-2xl bg-white pl-[45px] pr-[55px] h-[55px] drop-shadow-lg"
            ></input>
            <button
              // onKeyDown={(e) => detectKeyDown(e)}
              onClick={() => capletter()}
              className="w-[35px] ml-[-44px] text-white drop-shadow-lg  h-[35px] rounded-full flex justify-center items-center   bg-[#651e3e] hover:bg-[#451e3e] mr-[4px] "
              style={{ transition: ".1s" }}
            >
              <BiSearch className="drop-shadow-lg" />
            </button>
          </div>
          <div className="w-full flex justify-center">
            <div
              id="imcontainer"
              className="w-full h-[208px] bg- mt-[20px] mb-[10px] rounded-xl p-[14px] flex justify-start items-center flex-col drop-shadow-lg"
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
                    src={cloudy2}
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
                temperature <= 25 ? (
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
                      src={morning2}
                      className="w-full h-full fixed mt-[-14px] rounded-xl drop-shadow-2xl"
                      // style={{ transition: ".4s" }}
                    ></img>
                  </>
                )
              ) : hour > 13 && hour <= 20 ? (
                temperature <= 25 ? (
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
              ) : temperature <= 25 ? (
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
                  className="flex text-white flex-col drop-shadow-lg"
                  style={{ zIndex: "5" }}
                >
                  <span className="font-bold font-[CustomFont] text-[15px] drop-shadow-lg">
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
                  <span className=" font-[CustomFont] text-[12px] mt-[-4px] drop-shadow-lg">
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
                <div className="flex flex-col justify-end items-end select-none drop-shadow-lg">
                  <span className="font-bold font-[CustomFont] text-[15px] drop-shadow-lg">
                    {data.length === 0 ? <>__ , __</> : <>{data?.name}</>}
                  </span>
                  <span className=" font-[CustomFont] text-[12px] mt-[-4px] drop-shadow-lg">
                    {data.length === 0 ? (
                      <>__ , __</>
                    ) : (
                      <>{data?.sys?.country}</>
                    )}
                  </span>
                </div>
              </div>

              {data?.cod === "400" ? (
                <>
                  <span
                    style={{ zIndex: "6" }}
                    className="w-full  mt-[18px] h-[92px] flex justify-center items-center drop-shadow-lg"
                  >
                    <span
                      className="w-full  flex justify-center items-center h-[60px] rounded-xl bg-[#ffffffd4] drop-shadow-lg
                    "
                    >
                      <BiErrorCircle className="text-[#ff6900] text-[17px] mr-[7px] " />
                      Enter city to fetch data
                    </span>
                  </span>
                </>
              ) : data?.cod === "404" ? (
                <>
                  <span
                    style={{ zIndex: "6" }}
                    className="w-full  mt-[18px] h-[92px] flex justify-center items-center drop-shadow-lg"
                  >
                    <span
                      className="w-full  flex justify-center items-center h-[60px] rounded-xl bg-[#ffffffd4] drop-shadow-lg
                    "
                    >
                      <BiErrorCircle className="text-[#ff6900] text-[17px] mr-[7px] " />
                      Enter valid city
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <div
                    className="text-[50px] font-semibold text-white  mt-[18px] font-[CustomFont] flex flex-row justify-between w-full items-center select-none drop-shadow-lg"
                    style={{ transition: ".4s", zIndex: "5" }}
                  >
                    <span className="flex text-[13px] justify-center items-center drop-shadow-lg">
                      {temperature === undefined ? (
                        <>__°C</>
                      ) : (
                        <>{Math.round(tempmax)}°C</>
                      )}
                      <BiSolidUpArrow className="text-[15px] mx-[7px]" />
                    </span>
                    {temperature === undefined ? (
                      <>0°C</>
                    ) : (
                      <>{Math.round(temperature)}°C</>
                    )}
                    <span className="flex text-[13px] justify-center items-center drop-shadow-lg">
                      <BiSolidDownArrow className="text-[15px] mx-[7px]" />
                      {temperature === undefined ? (
                        <>__°C</>
                      ) : (
                        <>{Math.round(tempmin)}°C</>
                      )}
                    </span>
                  </div>
                  <span
                    className="font-semibold text-white mt-[-10px] text-[14px] select-none drop-shadow-lg"
                    style={{ zIndex: "5" }}
                  >
                    {/* {data?.cod === "400" ? (
                  <>
                    <span>Miss</span>
                  </>
                ) : (
                  <>
                    <span>Not miss</span>
                  </>
                )} */}
                    {data?.cod == "404" ? (
                      <>
                        <span>not found</span>
                      </>
                    ) : (
                      <>
                        {weatherType},{" "}
                        <span
                          style={{ zIndex: "6" }}
                          className="font-normal drop-shadow-lg"
                        >
                          {subWeatherType}
                        </span>
                      </>
                    )}

                    {/* {data?.cod === "404" ? (
                  <>
                    <span style={{ zIndex: "6" }}>City not Found</span>
                  </>
                ) : (
                  <>
                    {data?.weather[0]?.main},{" "}
                    <span
                      style={{ zIndex: "6" }}
                      className="font-normal drop-shadow-lg"
                    >
                      {data?.weather[0]?.description}
                    </span>
                  </>
                )} */}
                  </span>
                </>
              )}
              <span
                className="w-full  text-white  text-[13px] select-none drop-shadow-lg font-[CustomFont] flex justify-center items-center mt-[18px]"
                style={{ zIndex: "5" }}
              >
                {hour >= 6 && hour <= 13 ? (
                  <>
                    <span className="flex justify-center items-center drop-shadow-lg">
                      <LuAlarmClock className="mr-[8px]" /> Morning
                    </span>
                  </>
                ) : hour > 13 && hour <= 20 ? (
                  <>
                    <span className="flex justify-center items-center drop-shadow-lg">
                      <LuAlarmClock className="mr-[8px]" /> Afternoon
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex justify-center items-center drop-shadow-lg">
                      <LuAlarmClock className="mr-[8px]" /> Night
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="w-full flex justify-between items-center flex-wrap  drop-shadow-xl select-none">
            <div className="w-[120px] h-[70px] drop-shadow-2xl bg-[white] text-black rounded-xl  my-[10px] flex justify-center items-center flex-row p-[15px]">
              <div className="flex justify-start  items-start w-[40%]">
                <LuWind className="text-[20px]  " />
              </div>
              <span className="text-[12px] font-[CustomFonttwo] w-[60%] flex flex-col items-start justify-center drop-shadow-lg">
                <span
                  className="text-[13px]  font-semibold font-[CustomFonttwo] "
                  style={{ transition: ".4s" }}
                >
                  Wind
                </span>
                {data?.wind?.speed === undefined ? (
                  <></>
                ) : (
                  <>
                    <span className="">{data?.wind?.speed} Mph</span>
                  </>
                )}
              </span>
            </div>
            <div className="w-[120px] h-[70px] drop-shadow-2xl bg-[white] text-black rounded-xl  my-[10px] flex justify-center items-center flex-row p-[15px]">
              <div className="flex justify-start  items-start w-[40%]">
                <LuWaves className="text-[20px]  " />
              </div>
              <span className="text-[12px] font-[CustomFonttwo] w-[60%] flex flex-col items-start justify-center drop-shadow-lg">
                <span
                  className="text-[13px]  font-semibold font-[CustomFonttwo]"
                  style={{ transition: ".4s" }}
                >
                  Humidity
                </span>
                {data?.main?.humidity === undefined ? (
                  <></>
                ) : (
                  <>
                    <span>{data?.main?.humidity} %</span>
                  </>
                )}
              </span>
            </div>
            <div className="w-[120px] h-[70px] drop-shadow-2xl bg-[white] text-black rounded-xl  my-[10px] flex justify-center items-center flex-row p-[15px]">
              <div className="flex justify-start  items-start w-[40%]">
                <BsThermometerHalf className="text-[20px] " />
              </div>
              <span className="text-[12px]  font-[CustomFonttwo] w-[60%] flex flex-col items-start justify-center drop-shadow-lg">
                <span
                  className="text-[13px] font-semibold font-[CustomFonttwo]"
                  style={{ transition: ".4s" }}
                >
                  Pressure
                </span>
                {data?.main?.pressure === undefined ? (
                  <></>
                ) : (
                  <>
                    <span>{data?.main?.pressure} hpa</span>
                  </>
                )}
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
            <div className="w-[120px] h-[70px] drop-shadow-2xl bg-[white] text-black rounded-xl  my-[10px] flex justify-center items-center flex-row p-[15px]">
              <div className="flex justify-start  items-start w-[40%]">
                <MdVisibility className="text-[20px]  " />
              </div>
              <span
                className="text-[12px]  font-[CustomFonttwo] w-[60%] flex flex-col items-start justify-center drop-shadow-lg"
                style={{ transition: ".4s" }}
              >
                <span
                  className="text-[13px] font-semibold font-[CustomFonttwo]"
                  style={{ transition: ".4s" }}
                >
                  Visibility
                </span>
                {data?.visibility === undefined ? (
                  <></>
                ) : (
                  <>
                    <span className="" style={{ transition: ".4s" }}>
                      {data?.visibility / 100} %
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
