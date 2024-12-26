import React from "react";
import { useSelector } from "react-redux";

const TestimonialCard = ({ image, name, role, testimonial }) => {
  const theme = useSelector((state) => state.theme.theme);

  // Updated card classes for glassmorphism effect with softer borders
  const cardClasses =
    theme === "light"
      ? "bg-white bg-opacity-40 backdrop-blur-lg shadow-lg border border-gray-300"
      : "bg-gray-800 bg-opacity-40 backdrop-blur-lg shadow-lg border border-gray-500"; // Softer border in dark mode

  // Glassmorphism and interactive hover effect
  return (
    <div
      className={`p-6 rounded-3xl flex flex-col items-center text-center space-y-6 ${cardClasses} transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:translate-y-2 cursor-pointer`}
    >
      <div className="w-24 h-24 rounded-full border-4 border-indigo-500 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="text-gray-800 dark:text-gray-200 text-lg italic max-w-xs mx-auto opacity-90 transition-opacity duration-300 hover:opacity-100">
        "{testimonial}"
      </p>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
