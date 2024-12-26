import React from "react";
import Header from "./Header";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store";

import { Button } from "@/components/ui/button";
import { FaSun, FaMoon } from "react-icons/fa";

const Titlebar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  return (
    <div className="flex items-center -mt-8 space-x-6">
      <Button
        onClick={() => dispatch(toggleTheme())}
        className={`flex items-center justify-center gap-2 transition duration-300 transform ${
          theme === "light"
            ? "bg-yellow-400 hover:bg-yellow-300 text-black"
            : "bg-gray-700 hover:bg-gray-600 text-white"
        } p-3 ml-12 rounded-full shadow-md focus:ring-4 focus:ring-offset-2 focus:ring-gray-400`}
      >
        {theme === "light" ? (
          <>
            <FaSun className="text-xl" />
            <span>Light</span>
          </>
        ) : (
          <>
            <FaMoon className="text-xl" />
            <span>Dark</span>
          </>
        )}
      </Button>
      <div className="flex justify-center w-full">
        <Header />
      </div>
    </div>
  );
};

export default Titlebar;
