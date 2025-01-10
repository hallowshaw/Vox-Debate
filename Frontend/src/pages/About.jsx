import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="mt-20 px-6 lg:px-24 mb-11 text-gray-900 dark:text-gray-200"
    >
      {/* Introduction Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6">
          About{" "}
          <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
            VoxDebate
          </span>
        </h1>
        <p className="text-lg leading-relaxed">
          VoxDebate is an innovative Gen AI debate platform designed to redefine
          how debates unfold. Powered by{" "}
          <span className="font-bold">Google Gemini Pro</span> and advanced
          sentiment analysis, it provides a dynamic and interactive debating
          experience. By converting user voices to text through{" "}
          <span className="font-bold">React Speech Recognition</span>, we
          analyze sentiments and craft contextual responses in real-time using
          generative AI, making every debate engaging and impactful.
        </p>
      </section>

      {/* Future Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          What’s Coming Next
        </h2>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="space-y-6"
        >
          <motion.div
            className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 dark:from-indigo-800 dark:via-indigo-700 dark:to-indigo-600 p-6 rounded-lg shadow-lg text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold">Voice Sentiment Analysis</h3>
            <p>
              Enhance accuracy by analyzing the tone and emotion of the user’s
              voice.
            </p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 dark:from-teal-800 dark:via-teal-700 dark:to-teal-600 p-6 rounded-lg shadow-lg text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold">Custom Personalities</h3>
            <p>
              Debate with AI personalities tailored to specific user
              preferences.
            </p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 dark:from-amber-800 dark:via-amber-700 dark:to-amber-600 p-6 rounded-lg shadow-lg text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold">Voice Modulation in Debate</h3>
            <p>
              Integrate voice modulation to allow participants to control tone
              and pitch for impactful arguments.
            </p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 dark:from-purple-800 dark:via-purple-700 dark:to-purple-600 p-6 rounded-lg shadow-lg text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold">AI-Generated Summaries</h3>
            <p>
              Automatically generate concise summaries of debates to highlight
              key points.
            </p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-700 dark:to-blue-600 p-6 rounded-lg shadow-lg text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold">Sign in with Google</h3>
            <p>
              Enable seamless authentication for users with Google accounts.
            </p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-lg text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold">Debate Analytics</h3>
            <p>
              Provide detailed analytics about user engagement, sentiment
              trends, and key argument strengths.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Stack Section
      <section>
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Frontend</h3>
            <p>React.js with Vite for fast and responsive UI.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Backend</h3>
            <p>Node.js and Express for efficient API handling.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">AI Integration</h3>
            <p>Google Gemini Pro for advanced generative AI capabilities.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Voice Recognition</h3>
            <p>React Speech Recognition for voice-to-text conversion.</p>
          </div>
        </div>
      </section> */}
    </motion.div>
  );
};

export default About;
