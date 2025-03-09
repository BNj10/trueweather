import { Footer } from "../components/ui/footer/footer";
import { Card } from "../components/ui/card/card";
import WeatherServices from "../features/weather/services/get-weather";
import React, { useState, useEffect } from "react";
import { Weather } from "../features/weather/types";
import { Input } from "../components/ui/input/input";

export default function Home() {
  const { fetchWeather, fetchWeatherUsingCoords } = WeatherServices;
  const [weatherData, setWeatherData] = useState<Weather>({ location: '', temperature: 0, condition: '', is_day: false });
  const [search, setSearch] = useState('');
  const [day, setDay] = useState(true);
  
  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherData = await fetchWeatherUsingCoords(latitude, longitude);
          setWeatherData(weatherData);
          setDay(weatherData.is_day);
        }, (error) => {
          console.error("Error getting current location:", error);
        });
      } 
      else 
      {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    getCurrentLocation();
  }, [fetchWeatherUsingCoords]);
  
  const handleSearch = async () => {
    if (search) {
      const weather = await fetchWeather(search);
      setWeatherData(weather);
      setDay(weather.is_day);
    }
  };

  const background = day? "/9739136.jpg" : "/83159.jpg";
  return (
    <div className="h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url('${background}')` }}>
      <nav className="sticky w-full left-0 top-0">
        <div className="flex flex-1 px-4 py-4">
          <Input search={search} setSearch={setSearch} onSearch={handleSearch} />
        </div>
      </nav>
      <div className="top-0">
        <div className="">
          {<Card temperature={weatherData.temperature} location={weatherData.location} is_day={weatherData.is_day} condition={weatherData.condition} /> }
        </div >
      </div>
      <Footer />
    </div>
  );
}
