import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";

const AboutCard = ({ name, designation, linkedin, github, twitter, image }) => {
  const theme = useSelector((state) => state.theme.theme);

  const glassClasses =
    theme === "light"
      ? "bg-white bg-opacity-60 backdrop-blur-lg border border-gray-200 shadow-lg"
      : "bg-gray-800 bg-opacity-40 backdrop-blur-lg border border-gray-600 shadow-xl";

  return (
    <div
      className={`flex flex-col items-center p-8 rounded-2xl transition-transform duration-300 hover:scale-105 ${glassClasses}`}
    >
      <img
        src={image}
        alt={`${name}'s profile`}
        className="w-36 h-36 rounded-full border-4 border-indigo-400 object-cover"
      />
      <h2 className="mt-6 text-2xl font-bold">{name}</h2>
      <p className="text-indigo-400 mt-2 text-lg">{designation}</p>
      <div className="flex space-x-6 mt-6">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <FaLinkedin size={28} />
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
        >
          <FaGithub size={28} />
        </a>
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
        >
          <FaTwitter size={28} />
        </a>
      </div>
    </div>
  );
};

export default AboutCard;
