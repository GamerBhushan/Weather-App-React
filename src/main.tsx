import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherApp from "./components/weather/WeatherApp";

import "./index.css"
import { About } from "./components/About/About";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<WeatherApp></WeatherApp>}/>
        <Route path="/about" element={<About />} />
      
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
