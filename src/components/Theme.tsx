import React, { useEffect, useRef } from 'react';
import { FaMoon, FaSun } from "react-icons/fa";

interface ThemeToggleButtonProps {
  darkTheme: boolean;
  setThemeDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ darkTheme, setThemeDark }) => {
  const defaultTheme = useRef(window.matchMedia((`prefers-color-scheme:dark`)).matches);
  useEffect(()=>{
    console.log("mode",window.localStorage.getItem("mode")==='dark'?true:false)
    setThemeDark(window.localStorage.getItem("mode")?((window.localStorage.getItem("mode"))!=='dark'?true:false) : defaultTheme.current)
  },[setThemeDark])
  console.log(darkTheme)
  return (
    <div className="flex items-center w-32 justify-center">
      <input
        id="theme-toggle"
        type="checkbox"
        className="hidden"
        checked={darkTheme}
        onChange={() => {
          window.localStorage.setItem("mode",!darkTheme?"light":"dark")
          setThemeDark(!darkTheme)}}
      />
      <label
        htmlFor="theme-toggle"
        className="bg-gray-800 w-12 h-6 rounded-full flex items-center p-1 cursor-pointer relative"
      >
        <div className="flex justify-between w-full">
          <FaMoon className="text-yellow-400" />
          <FaSun className="text-yellow-500" />
        </div>
        <div
          className={`absolute bg-white w-5 h-5 rounded-full transform transition-transform duration-200 ${darkTheme ? 'translate-x-6' : ''}`}
        ></div>
      </label>
    </div>
  );
};

export default ThemeToggleButton;
