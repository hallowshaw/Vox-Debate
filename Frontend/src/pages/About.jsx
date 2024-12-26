import React from "react";
import image1 from "@/assets/1.jpg";
import image2 from "@/assets/2.jpg";
import AboutCard from "@/components/AboutCard";

const About = () => {
  return (
    <div className="mt-20 px-6 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 mb-11">
      <AboutCard
        name="Soumik Sen"
        designation="Full-Stack and Machine Learning Developer"
        linkedin="https://www.linkedin.com/in/soumik-sen-210473211/"
        github="https://github.com/SoumikSen10"
        twitter="https://x.com/SoumikSen2003"
        image={image1}
      />
      <AboutCard
        name="Rhitam Chaudhury"
        designation="Frontend and Machine Learning Developer"
        linkedin="https://www.linkedin.com/in/rhitam-chaudhury-66b17b248/"
        github="https://github.com/hallowshaw"
        twitter="https://x.com/hallowshaw"
        image={image2}
      />
    </div>
  );
};

export default About;
