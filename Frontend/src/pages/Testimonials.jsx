import React from "react";
import TestimonialCard from "@/components/TestimonialCard";
import user1 from "@/assets/user.jpg";
import user2 from "@/assets/user.jpg";
import user3 from "@/assets/user.jpg";
import user4 from "@/assets/user.jpg";
import user5 from "@/assets/user.jpg";

const testimonials = [
  {
    id: 1,
    name: "Madhurima Das",
    role: "Assistant Professor, Future Institute of Engineering and Management",
    testimonial:
      "I’m mentoring their 4th-year project team, and their dedication and innovative approach are impressive. They tackle challenges with enthusiasm and work cohesively.",
    image: user1,
  },
  {
    id: 2,
    name: "Santunu Roy",
    role: "Assistant Professor, Heritage Institute of Technology",
    testimonial:
      "Mentoring this team during the SIH 2023 Finals was a pleasure. Their problem-solving, teamwork, and dedication were truly commendable.",
    image: user2,
  },
  {
    id: 3,
    name: "Sayak Saha",
    role: "Systems Engineer, TCS",
    testimonial:
      "As a mentor for SIH 2024, I’ve seen their collaborative skills and innovative thinking in action. Confident they’ll deliver another outstanding project.",
    image: user3,
  },
  // Updated Testimonials
  {
    id: 4,
    name: "Utsha Majumder",
    role: "Student",
    testimonial:
      "Vox Debate is an incredible platform for anyone passionate about AI-driven debates. It's a must-try for anyone interested in improving their debating skills with an innovative twist!",
    image: user4,
  },
  {
    id: 5,
    name: "Ankush Paul",
    role: "Student",
    testimonial:
      "I’ve never seen anything like Vox Debate before. The AI technology behind it is cutting-edge, making debates more interactive and intellectually stimulating.",
    image: user5,
  },
  {
    id: 6,
    name: "Shreya Dasgupta",
    role: "Student",
    testimonial:
      "Vox Debate is the future of debating! The AI-driven approach to handling debates and arguments makes it more efficient and exciting. I love how it adapts to various styles of debate and keeps the conversation flowing smoothly.",
    image: user1,
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 px-6 lg:px-24">
      <h2 className="text-4xl font-bold text-center mb-12 text-indigo-600">
        What Our Mentors & Users Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <TestimonialCard
            key={item.id}
            {...item}
            testimonialClass="max-w-[300px] mx-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
