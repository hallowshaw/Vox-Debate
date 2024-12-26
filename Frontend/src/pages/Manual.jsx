import React from "react";
import { motion } from "framer-motion";
import ManualAccordion from "@/components/ManualAccordion";
import ManualSearch from "@/components/ManualSearch";

const Manual = () => {
  return (
    <motion.div
      className="mt-8 mx-4 md:mx-12 md:mt-12" // Adjust spacing for different screen sizes
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Search Section */}
      <motion.div
        className="mb-4" // Add bottom margin to separate sections
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ManualSearch />
      </motion.div>

      {/* Accordion Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ManualAccordion />
      </motion.div>
    </motion.div>
  );
};

export default Manual;
