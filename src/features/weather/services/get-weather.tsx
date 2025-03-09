
const fetchWeather = async (city : string) => {
    if (!process.env.NEXT_PUBLIC_APP_BASE_URL) {
        console.error("REACT_BASE_URL is not defined.");
        throw new Error("REACT_BASE_URL is not defined.");
      }
    
      if (!process.env.NEXT_PUBLIC_APP_API_KEY) {
        console.error("REACT_APP_API_KEY is not defined.");
        throw new Error("REACT_APP_API_KEY is not defined.");
      }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/current.json?key=${process.env.NEXT_PUBLIC_APP_API_KEY}&q=${city}`);
        const data = await response.json();

        return {
            temperature: data.current.temp_c,
            is_day: data.current.is_day,
            condition: data.current.condition.text,
            location: `${data.location.name}, ${data.location.region}, ${data.location.country}`
        };
    } 
    catch (error) {
        throw error;
    }
};

const fetchWeatherUsingCoords = async (lat : number, lon : number) => {
    if (!process.env.NEXT_PUBLIC_APP_BASE_URL) {
        console.error("REACT_BASE_URL is not defined.");
        throw new Error("REACT_BASE_URL is not defined.");
      }
    
      if (!process.env.NEXT_PUBLIC_APP_API_KEY) {
        console.error("REACT_APP_API_KEY is not defined.");
        throw new Error("REACT_APP_API_KEY is not defined.");
      }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/current.json?key=${process.env.NEXT_PUBLIC_APP_API_KEY}&q=${lat},${lon}`);
        if (!response.ok) {
            throw new Error(`Error fetching city data: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('No data found for the specified city');
        }

        return {
            temperature: data.current.temp_c,
            is_day: data.current.is_day,
            condition: data.current.condition.text,
            location: `${data.location.name}, ${data.location.region}, ${data.location.country}`
        };
    } 
    catch (error) {
            console.error('Error fetching city data:', error);
            throw error;
    }
};
const WeatherServices = {
    fetchWeather, 
    fetchWeatherUsingCoords
};

export default WeatherServices;
