import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import waveImageDark from "../assets/waveImageDark.png";
import waveImageLight from "../assets/waveImageLight.png";
import { UserContext } from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    // Prevent scrolling on body
    document.body.style.overflow = "hidden"; // Disable scrolling while the component is mounted

    const applyTheme = () => {
      if (theme === "dark") {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
    };

    applyTheme();

    return () => {
      document.body.classList.remove("dark");
      document.body.classList.remove("light");
      document.body.style.overflow = "auto"; // Re-enable scrolling when component unmounts
    };
  }, [theme]);

  const handleLinkClick = (path) => {
    if (userInfo) {
      navigate(path);
    } else {
      toast.info("Please log in to access the playground!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left p-6 md:p-12 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Left Section */}
        <motion.div
          className={`text-center md:text-left md:w-1/2 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            ENGAGE WITH <span className="text-orange-500">AI</span>{" "}
            <span className="text-purple-500">DEBATES</span>
          </h1>
          <p className="text-sm md:text-lg mb-6 md:mb-8">
            Challenge Perspectives, Analyze Sentiments, and Debate with
            Cutting-Edge AI.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <motion.button
              className="bg-orange-500 w-full md:w-[14rem] h-[3rem] md:h-[4rem] text-white px-6 py-3 rounded-full text-sm md:text-lg font-semibold shadow-md hover:bg-orange-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLinkClick("/playground")}
            >
              Start Debating
            </motion.button>
            <motion.button
              className="border border-white w-full md:w-[12rem] h-[3rem] md:h-[4rem] text-white px-6 py-3 rounded-full text-sm md:text-lg font-semibold bg-transparent hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLinkClick("/manual")}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="mt-6 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={theme === "dark" ? waveImageDark : waveImageLight}
            alt="Vox Debate"
            className="lg:ml-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-[1200px]"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }} // Keep the vertical movement animation
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
