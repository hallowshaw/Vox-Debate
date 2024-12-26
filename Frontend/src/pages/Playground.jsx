import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaygroundCard from "@/components/PlaygroundCard";

const Playground = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  // Apply theme class to body when theme changes
  useEffect(() => {
    const applyTheme = () => {
      if (theme === "dark") {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
    };

    applyTheme(); // Apply the theme when the component mounts

    // Cleanup: Ensure the class is consistent if unmounted
    return () => {
      document.body.classList.remove("dark");
      document.body.classList.remove("light");
    };
  }, [theme]);

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <PlaygroundCard className="w-full sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] space-y-6" />
    </div>
  );
};

export default Playground;
