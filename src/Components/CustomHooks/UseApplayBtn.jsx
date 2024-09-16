const UseApplayBtn = ({ children }) => {
  return (
    <div className="relative">
      <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-full border-3 border-white/50 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:border-white overflow-hidden">
        {children}
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6 transition-transform duration-300 ease-in-out hover:translate-x-1"
        >
          <path
            clipRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            fillRule="evenodd"
          />
        </svg>
        <div className="absolute w-24 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent top-0 left-[3.5rem] opacity-60 animate-shine"></div>
      </button>
    </div>
  );
};

export default UseApplayBtn;
