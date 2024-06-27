import React, { useRef } from 'react';
import { FaMoon, FaSun } from "react-icons/fa";

interface ThemeToggleButtonProps {
  darkTheme: boolean;
  setThemeDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ darkTheme, setThemeDark }) => {
  return (
    <div className="flex items-center w-32 justify-center">
      <input
        id="theme-toggle"
        type="checkbox"
        className="hidden"
        checked={darkTheme}
        onChange={() => {
          window.localStorage.setItem("mode",darkTheme?"light":"dark")
          setThemeDark(!darkTheme)}}
      />
      <label
        htmlFor="theme-toggle"
        className="bg-gray-800 w-12 h-6 rounded-full flex items-center p-1 cursor-pointer relative border-2 border-red-300"
      >
        <div className="flex justify-between w-full ">
          <FaSun className="text-yellow-500" />
          <FaMoon className="text-yellow-400" />
        </div>
        <div
          className={`absolute bg-white w-5 h-5 rounded-full transform transition-transform duration-200 ${darkTheme ? 'translate-x-6' : ''}`}
        ></div>
      </label>
    </div>
  );
};

export default ThemeToggleButton;
