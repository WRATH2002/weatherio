import "./App.css";
import { useEffect, useState } from "react";
import { PLACE_API_KEY, placeOne, placeTwo, weather } from "./utils/constant";
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
import { BiErrorCircle } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

// ----------------
import snow_morning from "./assets/img/snow_morning.jpg";
import snow_afternoon from "./assets/img/snow_afternoon.jpg";
import snow_night from "./assets/img/snow_night.jpg";
import thunderstorm from "./assets/img/thunderstorm.jpg";

import rain from "./assets/img/rain.jpg";
import cloudy from "./assets/img/cloudy.jpg";
import bg from "./assets/img/bg.jpg";
import morning from "./assets/img/morning3.jpg";
import cloudy2 from "./assets/img/cloudy2.jpg";
import morning2 from "./assets/img/morning3.jpg";
import night from "./assets/img/night.jpg";
import afternoon from "./assets/img/afternoon3.jpg";
import { FiPlus } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

import { CgArrowLongDown } from "react-icons/cg";
import { CgArrowLongUp } from "react-icons/cg";
import { CgArrowLongLeft } from "react-icons/cg";
import { CgArrowLongRight } from "react-icons/cg";
import { HiLocationMarker } from "react-icons/hi";
function App() {
  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [city, setCity] = useState("Kolkata");
  const [country, setCountry] = useState("IN");

  // ------------
  const [data, setData] = useState([]);
  const [weatherType, setWeatherType] = useState("");
  const [subWeatherType, setSubWeatherType] = useState("");
  const [search, setSearch] = useState("Kolkata");
  const [searchCity, setSearchCity] = useState("Kolkata");
  const [temperature, setTemperature] = useState("");
  const [tempmax, setTempmax] = useState("");
  const [tempmin, setTempmin] = useState("");
  const [error, setError] = useState("");
  const [degreee, setDegreee] = useState("");
  const [degree, setDegree] = useState();
  // "https://api.geoapify.com/v1/geocode/autocomplete?text=kol&apiKey=b4f5759d940f4110845dbd09c3804bf0";
  const [suggestion, setSuggestion] = useState();
  const [wind, setWind] = useState([]);
  // console.log(temperature);
  // console.log(subWeatherType);
  // console.log(tempmin);
  // console.log(data?.visibility);

  useEffect(() => {
    if (search.length != 0) {
      const timer = setTimeout(() => SearchSuggestionn(), 200);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [search]);

  const SearchSuggestionn = async () => {
    const data = await fetch(placeOne + search + placeTwo + PLACE_API_KEY);
    const json = await data.json();
    console.log("search suggestion");
    console.log(json);
    setSuggestion(json?.features);
    // console.log(searSuggestion);
    // setVideos(json.items);
  };

  useEffect(() => {
    console.log("useEffect");

    clearData();
    getWeather();
    getDate();
    console.log(data);
  }, [searchCity]);

  useEffect(() => {
    console.log("degreeeeeeee");
    console.log(degree);
  }, [degree]);

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
    setDegreee(json?.wind?.deg + "deg");
    setDegree(json?.wind?.deg);

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
    // if (e.key === "Enter") {
    //   console.log("entered");

    capletter();
    // }
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
  const [show, setShow] = useState(false);
  const [timeOne, setTimeOne] = useState("00:00");
  const [timeTwo, setTimeTwo] = useState("00:00");

  useEffect(() => {
    if (data?.sys?.sunrise !== undefined) {
      convertTo24HourOne(data?.sys?.sunrise);
      convertTo24HourTwo(data?.sys?.sunset);
    }
  }, [data]);

  function convertTo24HourOne(timeString) {
    // Extract hours and minutes from the string
    var hours = parseInt(timeString.toString().substring(0, 2));
    var minutes = parseInt(timeString.toString().substring(2, 4));

    // Convert to 24-hour format
    var suffix = hours >= 12 ? "PM" : "AM";
    hours = hours >= 12 ? hours - 12 : hours;
    hours = hours == 0 ? 12 : hours;

    // Add leading zeros if necessary
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the 24-hour time string
    var time24Hour = hours + ":" + minutes;

    setTimeOne(time24Hour);
  }

  function convertTo24HourTwo(timeString) {
    // Extract hours and minutes from the string
    var hours = parseInt(timeString.toString().substring(0, 2));
    var minutes = parseInt(timeString.toString().substring(2, 4));

    // Convert to 24-hour format

    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the 24-hour time string
    var time24Hour = hours + ":" + minutes;

    setTimeTwo(time24Hour);
  }

  const [side, setSide] = useState(false);

  return (
    <>
      <div className="w-full h-[100dvh] fixed">
        <img className="w-full h-full object-cover   fixed " src={bg}></img>
      </div>
      {side == true ? (
        <div
          className="w-full h-[100svh] bg-black fixed z-20 px-[15px]"
          style={{ transition: ".4s" }}
        >
          <div
            className="w-full font-[roboto] h-[60px] flex   text-[white] text-[22px] lg:text-[25px] md:text-[25px] font-normal justify-between items-center  "
            style={{ zIndex: "5" }}
          >
            <span
              className=" flex justify-center items-center h-full w-[40px] z-50"
              onClick={(e) => {
                setShow(!show);
                setSide(!side);
              }}
            >
              {show == true ? (
                <FiPlus
                  className="text-white text-[25px] rotate-[135deg] z-50"
                  style={{ transition: ".4s", zIndex: 100 }}
                />
              ) : (
                <FiPlus
                  className="text-white text-[25px] z-30"
                  style={{ transition: ".4s" }}
                />
              )}
            </span>
            <span className="tracking-wide h-full flex justify-center items-center w-[calc(100%-80px)]">
              <b></b>
            </span>
            <span className=" flex justify-center items-center h-full w-[40px]"></span>
          </div>
          <div className="text-white text-[35px] font-[300] font-[roboto]">
            Search Cities
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // onKeyDown={(e) => detectKeyDown(e)}
            // onKeyPress={handleKeypress}
            placeholder="Enter Location"
            className="w-[calc(100%)] text-white text-[15px] mt-[20px] outline-none rounded-xl bg-[#1f1f1f] pl-[25px] pr-[55px] h-[50px] drop-shadow-sm "
            style={{ transition: ".4s" }}
          ></input>
          <div className="flex flex-col w-full mt-[20px]">
            {search.length !== 0 ? (
              <>
                {suggestion?.map((Element) => {
                  return (
                    <>
                      {Element?.properties?.city ? (
                        <>
                          <div
                            className="bg-[#424b54] w-full h-[70px] mt-[10px] rounded-lg text-white px-[25px] text-[20px] font-[roboto] flex justify-start items-center"
                            onClick={(e) => {
                              setCity(Element?.properties?.city);
                              setCountry(
                                Element?.properties?.country_code.toUpperCase()
                              );
                              setSearch(Element?.properties?.city);
                              detectKeyDown(e);
                              setSide(false);
                              setShow(false);
                            }}
                          >
                            <HiLocationMarker className="text-[20px] mt-[-6px] text-white mr-[5px]" />
                            <span className="h-[26px] flex justify-start items-end">
                              {Element?.properties?.city ? (
                                <>{Element?.properties?.city}</>
                              ) : (
                                <>
                                  {Element?.properties?.address_line1}
                                  <span className="text-[14px] ml-[2px] text-[#9fa6ae]">
                                    {Element?.properties?.address_line2}
                                  </span>
                                </>
                              )}
                            </span>
                            <span className="text-[14px] ml-[3px] text-[#9fa6ae]">
                              {Element?.properties?.state},
                            </span>

                            <span className="text-[14px] ml-[3px] text-[#9fa6ae]">
                              {Element?.properties?.country_code.toUpperCase()}
                            </span>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div
          className="w-full h-[100svh] bg-black fixed ml-[100%] z-20 px-[15px]"
          style={{ transition: ".4s" }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => detectKeyDown(e)}
            // onKeyPress={handleKeypress}
            placeholder="Enter Location"
            className="w-[calc(100%)] text-[15px] outline-none rounded-xl bg-white pl-[25px] pr-[55px] h-[50px] drop-shadow-sm "
            style={{ transition: ".4s" }}
          ></input>
        </div>
      )}
      <div className="bg-gradient-to-b from-transparent from-[20%] to-[#615f60] to-[80%] backdrop-blur-lg px-[15px] h-[100dvh]">
        {error === 404 ? <>not dounf</> : <></>}
        <div
          className="w-full font-[roboto] h-[60px] flex   text-[white] text-[22px] lg:text-[25px] md:text-[25px] font-normal justify-between items-center  "
          style={{ zIndex: "5" }}
        >
          <span
            className=" flex justify-center items-center h-full w-[40px] z-50"
            onClick={(e) => {
              setShow(!show);
              setSide(!side);
            }}
          >
            {show == true ? (
              <FiPlus
                className="text-white text-[25px] rotate-[135deg] z-50"
                style={{ transition: ".4s", zIndex: 100 }}
              />
            ) : (
              <FiPlus
                className="text-white text-[25px] z-30"
                style={{ transition: ".4s" }}
              />
            )}
          </span>
          <span className="tracking-wide h-full flex justify-center items-center w-[calc(100%-80px)]">
            <b>{city}</b>,<b className="ml-[3px]">{country}</b>
          </span>
          <span className=" flex justify-center items-center h-full w-[40px]">
            <BsThreeDotsVertical className="text-white text-[21px]" />
          </span>
        </div>
        {/* <div className="w-full px-[15px] fixed flex justify-center items-center top-[60px]"> */}
        {/* {show === true ? (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => detectKeyDown(e)}
            // onKeyPress={handleKeypress}
            placeholder="Enter Location"
            className="w-[calc(100%-30px)] opacity-100 left-[15px] text-[15px] outline-none rounded-2xl bg-white pl-[25px] pr-[55px] h-[55px] fixed top-[60px] drop-shadow-sm "
            style={{ transition: ".4s" }}
          ></input>
        ) : (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => detectKeyDown(e)}
            // onKeyPress={handleKeypress}
            placeholder="Enter Location"
            className="w-[calc(100%-30px)] opacity-0 left-[15px] text-[15px] outline-none rounded-2xl bg-white pl-[25px] pr-[55px] h-[0] fixed top-[60px] drop-shadow-sm "
            style={{ transition: ".4s" }}
          ></input>
        )} */}
        {/* <button
            // onKeyDown={(e) => detectKeyDown(e)}
            onClick={() => capletter()}
            className="w-[35px] ml-[-44px] text-white drop-shadow-lg  h-[35px] rounded-full flex justify-center items-center   bg-[#651e3e] hover:bg-[#451e3e] mr-[4px] "
            style={{ transition: ".1s" }}
          >
            <BiSearch className="drop-shadow-lg" />
          </button> */}
        {/* </div> */}
        <div className="w-full h-[calc(100dvh-285px)]  flex flex-col justify-center items-center">
          <div className="flex justify-start items-center h-[140px] w-[140px]  ">
            <div className="text-[120px] w-full text-white font-[400] h-full flex justify-end items-center">
              {temperature === undefined ? (
                <>0</>
              ) : (
                <>{Math.round(temperature)}</>
              )}
            </div>
            <div className="text-[30px] text-white font-[400] flex justify-center items-start h-full pt-[16px]">
              <b>°C</b>
            </div>
          </div>
          <div className="text-white text-[20px] font-[roboto] font-[400]">
            {weatherType}{" "}
            <span className="ml-[4px]">
              {temperature === undefined ? <>0</> : <>{Math.round(tempmax)}°</>}
              /
              {temperature === undefined ? <>0</> : <>{Math.round(tempmin)}°</>}
            </span>
          </div>
        </div>
        <div className="w-full h-[210px]  flex justify-center items-center  rounded-2xl">
          <div className="h-full w-[calc((100%-15px)/2)] ">
            <div className="w-full h-[calc((100%-15px)/2)] bg-[#00000025] rounded-2xl flex justify-between items-center px-[15px]">
              <div className="text-white text-[16px] font-[roboto] flex flex-col justify-center items-start">
                <span>
                  {degree === 0 ? (
                    <>West</>
                  ) : degree > 0 && degree < 90 ? (
                    <>NorthWest</>
                  ) : degree == 90 ? (
                    <>North</>
                  ) : degree > 90 && degree < 180 ? (
                    <>NorthEast</>
                  ) : degree == 180 ? (
                    <>East</>
                  ) : degree > 180 && degree < 270 ? (
                    <>SouthEast</>
                  ) : degree == 270 ? (
                    <>South</>
                  ) : degree > 270 && degree < 360 ? (
                    <>SouthWest</>
                  ) : (
                    <>West</>
                  )}
                </span>
                <span>{data?.wind?.speed}km/h</span>
              </div>
              <div className="border border-[#c1c0c0] font-[roboto] rounded-full flex flex-col justify-center items-center w-[70px] h-[70px] text-[#cecece] text-[11px]">
                <div className="w-full h-[calc(100%/3)] flex justify-center items-center">
                  <div className="w-[calc(100%/3)] h-full flex justify-center items-center"></div>
                  <div className="w-[calc(100%/3)] h-full flex justify-center items-start px-[4px]">
                    N
                  </div>
                  <div className="w-[calc(100%/3)] h-full flex justify-center items-center"></div>
                </div>
                <div className="w-full h-[calc(100%/3)] flex justify-center items-center">
                  <div className="w-[calc(100%/3)] h-full flex justify-start items-center px-[4px]">
                    W
                  </div>
                  <div className="w-[calc(100%/3)] h-full flex justify-center items-center overflow-visible">
                    <CgArrowLongRight
                      className="text-[40px] fixed text-white "
                      style={{ rotate: `${degreee}` }}
                    />
                  </div>
                  <div className="w-[calc(100%/3)] h-full flex justify-end items-center px-[4px]">
                    E
                  </div>
                </div>
                <div className="w-full h-[calc(100%/3)] flex justify-center items-center">
                  <div className="w-[calc(100%/3)] h-full flex justify-center items-center"></div>
                  <div className="w-[calc(100%/3)] h-full flex justify-center items-end px-[4px]">
                    S
                  </div>
                  <div className="w-[calc(100%/3)] h-full flex justify-center items-center"></div>
                </div>
              </div>
            </div>
            <div className="h-[15px] w-full"></div>
            <div className="w-full h-[calc((100%-15px)/2)] bg-[#00000025] rounded-2xl flex justify-between items-center px-[15px]">
              <div className="text-white text-[16px] font-[roboto] flex flex-col justify-center items-start">
                <span className="flex justify-start items-end">
                  {timeOne}{" "}
                  <span className="text-[#cecece] text-[14px] ml-[5px]">
                    Sunrise
                  </span>
                </span>
                <span className="flex justify-start items-end">
                  {timeTwo}{" "}
                  <span className="text-[#cecece] text-[14px] ml-[5px]">
                    Sunset
                  </span>
                </span>
              </div>
              <div className=""></div>
            </div>
          </div>
          <div className="h-full w-[15px]"></div>
          <div className="h-full w-[calc((100%-15px)/2)] bg-[#00000025]  rounded-2xl flex flex-col justify-start text-white items-center p-[15px]">
            <span className="w-full flex justify-between items-center text-[#c1c0c0] h-[40px] text-[14px]">
              <span>Humidity</span>
              <span className="text-white text-[17px]">
                {data?.main?.humidity === undefined ? (
                  <></>
                ) : (
                  <>
                    <span>
                      <b>{data?.main?.humidity}%</b>
                    </span>
                  </>
                )}
              </span>
            </span>
            <div className="w-full border-[.5px] border-[#c1c0c0]"></div>
            <span className="w-full flex justify-between items-center text-[#c1c0c0] h-[40px] text-[14px]">
              <span>Real feel</span>
              <span className="text-white text-[17px]">
                {data?.main?.feels_like === undefined ? (
                  <></>
                ) : (
                  <>
                    <span>
                      <b>{data?.main?.feels_like}°</b>
                    </span>
                  </>
                )}
              </span>
            </span>
            <div className="w-full border-[.5px] border-[#c1c0c0]"></div>
            <span className="w-full flex justify-between items-center text-[#c1c0c0] h-[40px] text-[14px]">
              <span>Pressure</span>
              <span className="text-white text-[17px]">
                {data?.main?.pressure === undefined ? (
                  <></>
                ) : (
                  <>
                    <span>
                      <b>
                        {data?.main?.pressure}
                        <span className="text-[13px]">mbar</span>
                      </b>
                    </span>
                  </>
                )}
              </span>
            </span>
            <div className="w-full border-[.5px] border-[#c1c0c0]"></div>
            <span className="w-full flex justify-between items-center text-[#c1c0c0] h-[40px] text-[14px]">
              <span>Visibility</span>
              <span className="text-white text-[17px]">
                {data?.visibility === undefined ? (
                  <></>
                ) : (
                  <>
                    <span className="" style={{ transition: ".4s" }}>
                      <b>{data?.visibility / 100}%</b>
                    </span>
                  </>
                )}
              </span>
            </span>

            <span></span>
          </div>
        </div>
        {/* <div className="w-full h-[100vh]  flex justify-center items-center  drop-shadow-lg ">
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
                      <span className="font-bold font-[roboto] text-[15px] drop-shadow-lg">
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
                      <span className=" font-[roboto] text-[12px] mt-[-4px] drop-shadow-lg">
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
                      <span className="font-bold font-[roboto] text-[15px] drop-shadow-lg">
                        {data.length === 0 ? <>__ , __</> : <>{data?.name}</>}
                      </span>
                      <span className=" font-[roboto] text-[12px] mt-[-4px] drop-shadow-lg">
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
                        className="text-[50px] font-semibold text-white  mt-[18px] font-[roboto] flex flex-row justify-between w-full items-center select-none drop-shadow-lg"
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
                      </span>
                    </>
                  )}
                  <span
                    className="w-full  text-white  text-[13px] select-none drop-shadow-lg font-[roboto] flex justify-center items-center mt-[18px]"
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
                  <span className="text-[12px] font-[robototwo] w-[60%] flex flex-col items-start justify-center drop-shadow-lg">
                    <span
                      className="text-[13px]  font-semibold font-[robototwo] "
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
                  <span className="text-[12px] font-[robototwo] w-[60%] flex flex-col items-start justify-center drop-shadow-lg">
                    <span
                      className="text-[13px]  font-semibold font-[robototwo]"
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
                  <span className="text-[12px]  font-[robototwo] w-[60%] flex flex-col items-start justify-center drop-shadow-lg">
                    <span
                      className="text-[13px] font-semibold font-[robototwo]"
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

                <div className="w-[120px] h-[70px] drop-shadow-2xl bg-[white] text-black rounded-xl  my-[10px] flex justify-center items-center flex-row p-[15px]">
                  <div className="flex justify-start  items-start w-[40%]">
                    <MdVisibility className="text-[20px]  " />
                  </div>
                  <span
                    className="text-[12px]  font-[robototwo] w-[60%] flex flex-col items-start justify-center drop-shadow-lg"
                    style={{ transition: ".4s" }}
                  >
                    <span
                      className="text-[13px] font-semibold font-[robototwo]"
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
          </div> */}
      </div>
    </>
  );
}

export default App;
