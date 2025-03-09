import Image from 'next/image';
import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
    
interface InputProps {
    temperature: number;
    location: string;
    is_day: boolean;
    condition: string;
}
const getWeatherIcon = (condition: string, is_day: boolean) => {
    const conditionLower = condition.toLowerCase();
    if (is_day) {
        if (conditionLower.includes('sunny')) return 'CLEAR_DAY';
        if (conditionLower.includes('partly cloudy') || conditionLower.includes('Overcast') || conditionLower.includes('cloudy')) return 'PARTLY_CLOUDY_DAY';
        if (conditionLower.includes('Patchy rain') || conditionLower.includes('Patchy rain possible') || conditionLower.includes('Moderate rain') || conditionLower.includes('Light rain') || conditionLower.includes('Heavy rain')) return 'RAIN';
        if (conditionLower.includes('snow')) return 'SNOW';
        if (conditionLower.includes('sleet')) return 'SLEET';
        if (conditionLower.includes('wind')) return 'WIND';
        if (conditionLower.includes('fog')) return 'FOG';
    } else {
        if (conditionLower.includes('clear')) return 'CLEAR_NIGHT';
        if (conditionLower.includes('partly cloudy') || conditionLower.includes('Overcast') || conditionLower.includes('cloudy')) return 'PARTLY_CLOUDY_NIGHT';
        if (conditionLower.includes('Patchy rain')  || conditionLower.includes('Patchy rain possible') || conditionLower.includes('Moderate rain') || conditionLower.includes('Light rain') || conditionLower.includes('Heavy rain')) return 'RAIN';
        if (conditionLower.includes('snow')) return 'SNOW';
        if (conditionLower.includes('sleet')) return 'SLEET';
        if (conditionLower.includes('wind')) return 'WIND';
        if (conditionLower.includes('fog')) return 'FOG';
    }
    return 'CLOUDY'; 
};

const getIconSize = () => {
    if (window.innerWidth >= 1024) return 170; 
    if (window.innerWidth >= 768) return 160; 
    if (window.innerWidth >= 640) return 150; 
    if (window.innerWidth >= 400) return 130;
    return 110; 
};


export const Card = ({temperature, location, is_day, condition}: InputProps) => {
    const icon = getWeatherIcon(condition, is_day);
    const [iconSize, setIconSize] = React.useState(getIconSize());

    React.useEffect(() => {
        const handleResize = () => {
            setIconSize(getIconSize());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <article className="absolute w-full h-full relative isolate flex flex-col justify-end 
            overflow-hidden rounded-2xl px-6 pb-6 pt-32 sm:pt-40 
            max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-16 sm:mt-24 bg-gray-900 text-white">
            <Image
                src="/pexels-pixelcop-2680270.jpg"
                width={250}
                height={250}
                alt="Rainy Weather"
                className="absolute inset-0 h-full w-full object-cover"
                priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40">
                <div className="absolute top-7 left-7">
                    <ReactAnimatedWeather
                        icon={icon}
                        color="goldenrod"
                        size={iconSize}
                        animate={true}
                    />
                </div>
            </div>
            <div className="h-full flex flex-1 flex-col items-center justify-center z-20">
                <span className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl self-end">
                    {temperature}℃
                </span>
                <div className="self-start">
                    <h3 className="z-10 mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white line-clamp-3">{condition}</h3>
                </div>
            </div>
            <div className="z-20 gap-y-1 overflow-hidden text-xs sm:text-sm md:text-base lg:text-lg leading-6 text-gray-300">
                {location}
            </div>
        </article>
    );
};