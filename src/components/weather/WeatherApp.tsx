// import React from "react";

import "./WeatherApp.css";


import { motion } from 'framer-motion';

import { useEffect, useState } from "react";

import reactLogo from "/react.svg";
import viteLogo from '/vite.svg'
import { getWeatherDetails, getWeatherDetailsByLonLat } from "../api/MyAPI";
// import LocationFetcher from "../Location/Location";
import getUserLocation from "../Location/Location";
import {  useNavigate } from "react-router-dom";



// import TypingButton from "../Typing/Typing";
// import { data } from "framer-motion/client";
// import { tr } from "framer-motion/client";



// import Snackbar from '@mui/material/Snackbar';

// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';


function WeatherApp() {

  const [weatherDetails, setWeatherDetails] = useState({});

  const navigate = useNavigate();
  
  const [devText, setDevText] = useState("Developed By Bhushan");

  const devArr = ["Developed By Bhushan", "Vite + React + TS"];


  const [isDataSet, setIsDataSet] = useState(false);

  const [inputDisable, setInputDisable] = useState(false);

  const [btnText, setBtnText] = useState("Check!");

  const [loadingMessage, setLoadingMessage] = useState("Your Weather Details Appears Here !");


  const [addressInput, setAddressInput] = useState("");

  const showUseMyLocBtn = false;

  const [count, setCount] = useState(0);

  // setCount(count);

  // useEffect(()=>{
  //   setShowAboutCompo(!isDataSet);
  // },[isDataSet])

  useEffect(() => {
    setCount(count);
    // console.log("Use Effect Started.");
    const temp = setInterval(() => {
      setCount((prevCount) => {

        const newCount = prevCount + 1 === devArr.length ? 0 : prevCount + 1;
        setDevText(devArr[newCount]); // Update text with new count
        // console.log("Set :", devArr[newCount]);
        return newCount;
      });
    }, 3000);

    return () => clearInterval(temp);
  }, []);

  function showAbout(){
    navigate("/about");
  }


  async function searchAndCheckWeather(addressInput: any) {
    if (addressInput.replace(" ", "").length <= 0) {
      setLoadingMessage("Invalid Input");
      setIsDataSet(false);
      return;
    }

    setIsDataSet(false);
    setLoadingMessage("Please Wait Loading Your Details...")


    setInputDisable(true);
    setBtnText("Wait...");

    try {
      const weatherData = await getWeatherDetails(addressInput);

      if ("error" in weatherData) {
        setLoadingMessage(weatherData.error + " WE : ");
        setIsDataSet(false);
      } else {
        setWeatherDetails(weatherData);
        setIsDataSet(true);
      }
    } catch (error) {
      setLoadingMessage(error + " ");
      setIsDataSet(false);
    }
    setInputDisable(false);
    setBtnText("Check!");
  }

  async function usingLocation() {
    setInputDisable(true);
    setIsDataSet(false);
    setLoadingMessage("Please Wait Loading Your Details...")

    const obj = await getUserLocation();

    if ("error" in obj) {
      setLoadingMessage(`Error : ${obj.error}`)

    } else {
      const dataObj = await getUserLocation();
      if ("error" in dataObj) {
        setLoadingMessage(`Error : ${dataObj.error}`)
      } else {
        try {
          const weatherData = await getWeatherDetailsByLonLat(dataObj.address, dataObj.latitude, dataObj.longitude);
          if ("error" in weatherData) {
            setLoadingMessage(weatherData.error + " ");
            setIsDataSet(false);
          } else {
            setWeatherDetails(weatherData);
            setAddressInput(weatherData.name);
            setIsDataSet(true);
            setInputDisable(false);
          }
        } catch (error) {
          setLoadingMessage(error + " ");
          setIsDataSet(false);
        }
      }


      setInputDisable(false);
      setBtnText("Check!");

    }

    setInputDisable(false);
    setIsDataSet(true);
    // setLoadingMessage(`Latitude : ${obj.latitude} \nLongitude : ${obj.longitude}\nAddress : ${obj.address} `)
    // console.log(obj);


  }


  return (
    <>


    

      <div className="container">


        <motion.div
          className="card left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="button"
            onClick={() => showAbout()}
            
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileFocus={{ scale: 1.05, borderColor: "#4facfe" }}
            whileHover={{ scale: 1.1, backgroundColor: "#4facfe", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
          >
            {devText}
          </motion.button>

          {/* <TypingButton></TypingButton> */}


          <div className="divLogo">
            <a  >
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a >
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>

          <div>
            <h1 className="weather-title">Weather App</h1>
          </div>

          {/* <input placeholder="Enter Your City" className="input" /> */}

          <motion.input
            className="input"
            type="text"
            disabled={inputDisable}
            value={addressInput}
            onChange={(field) => setAddressInput(field.target.value)}
            placeholder="Enter Your City / Address"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileFocus={{ scale: 1.05, borderColor: "#4facfe" }}
          />


          <div>

          </div>


          {/* <button className= "button" onClick={handleClick}>Check!</button> */}
          <div>
            <motion.button
              className="button"
              disabled={inputDisable}
              onClick={() => searchAndCheckWeather(addressInput)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileFocus={{ scale: 1.05, borderColor: "#4facfe" }}
              whileHover={{ scale: 1.1, backgroundColor: "#4facfe", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
            >
              {btnText}
            </motion.button>

            {
              showUseMyLocBtn ?
                <motion.button
                  className="button"
                  disabled={inputDisable}
                  onClick={() => usingLocation()}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileFocus={{ scale: 1.05, borderColor: "#4facfe" }}
                  whileHover={{ scale: 1.1, backgroundColor: "#4facfe", color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Use My Location
                </motion.button>
                :
                ""
            }


          </div>

        </motion.div>

        <motion.div
          className="card right"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          

          {/* {  showAboutCompo ? <AboutCompo></AboutCompo> : <></> } */}
          
          { isDataSet ? <DataCompo weatherDetails={weatherDetails} /> : <Loading loadingMessage={loadingMessage}></Loading>}


        </motion.div>

      </div>
    </>
  )
}


export default WeatherApp;




function DataCompo({ weatherDetails }: any) {

  // console.log(weatherDetails);

  return (
    <>
      <h2>{weatherDetails?.name}</h2>

      <div className="parent">
        <div className="card scrollable">

          <p><b>City Name : </b>{weatherDetails?.name} </p>
          <p><b>Time : </b>{weatherDetails?.data?.current?.time} {weatherDetails?.data?.current_units?.time}</p>
          <p><b>Temperature : </b>{weatherDetails?.data?.current?.temperature_2m} {weatherDetails?.data?.current_units?.temperature_2m} </p>
          <p><b>Wind Speed : </b>{weatherDetails?.data?.current?.wind_speed_10m} {weatherDetails?.data?.current_units?.wind_speed_10m} </p>

          <p><b>Latitude : </b>{weatherDetails?.data?.latitude}</p>
          <p><b>Longitude : </b>{weatherDetails?.data?.longitude} </p>

          <p><b>Timezone : </b>{weatherDetails?.data?.timezone} </p>

          <hr></hr>
          {weatherDetails?.data?.hourly ? (
            <WeatherTable
              hourly={weatherDetails.data.hourly}
              hourly_units={weatherDetails.data.hourly_units}
            />
          ) : null}


        </div>
      </div>
    </>
  );
}

function WeatherTable({ hourly, hourly_units }: any) {
  return (
    <div className="overflow-x-auto">
      <h2>Hourly Weather Forecast</h2>
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        {/* Table Header */}
        <thead>
          <tr className="">
            <th className="border">Time ({hourly_units.time})</th>
            <th className="border">Temperature ({hourly_units.temperature_2m})</th>
            <th className="border">Humidity ({hourly_units.relative_humidity_2m})</th>
            <th className="border">Wind Speed ({hourly_units.wind_speed_10m})</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {hourly.time.map((time: any, index: any) => (
            <tr key={index} className="">
              <td className="border">{new Date(time).toLocaleString()}</td>
              <td className="border">{hourly.temperature_2m[index]}</td>
              <td className="border">{hourly.relative_humidity_2m[index]}</td>
              <td className="border">{hourly.wind_speed_10m[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


function Loading({ loadingMessage }: any) {
  return (
    <>
      <h2>{loadingMessage}</h2>
    </>
  );
}




