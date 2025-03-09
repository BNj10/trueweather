


interface InputProps {
    search: string;
    setSearch: (value: string) => void;
    onSearch: () => void;
}

export const Input = ({ search, setSearch, onSearch }: InputProps) => {
    return (
        <div className="relative self-center w-full max-w-lg">
            <label htmlFor="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="City, or Town + Province, State, or Country"
                className="w-full h-15 rounded-md border-gray-200 py-2.5 pe-10 shadow-xs px-3"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700" onClick={onSearch}>
                    <span className="sr-only">Search</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </span>
        </div>
    );
};


