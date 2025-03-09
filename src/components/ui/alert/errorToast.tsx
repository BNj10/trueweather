import React from 'react';

interface InputProps {
    error: string;
    onClose: () => void;
    position?: 'top' | 'bottom';
    duration?: number;
}

export const Alert = ({ error, onClose, position = 'top', duration = 5000 }: InputProps) => {
    React.useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const positionClasses = position === 'top' ? 'top-4' : 'bottom-4';

    return (
        <div className={`fixed ${positionClasses} left-1/2 w-full transform -translate-x-1/2 z-50 p-4 space-y-2`}>
            <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-md rounded-md">
                <div className="bg-red-600 py-2 px-4 rounded-l-md flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="fill-current text-white" width="20" height="20">
                        <path fillRule="evenodd" d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                    </svg>
                </div>
                <div className="px-2 py-3 bg-white rounded-r-md flex justify-between items-center w-full border border-l-transparent border-gray-200">
                    <div className="text-xs sm:text-xs md:text-base lg:text-base">{error}</div>
                    <button onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20">
                            <path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};