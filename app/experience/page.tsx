"use client";

import { useState } from "react";
import { ChevronRight, Calendar, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    id: 1,
    company: "Xebia",
    position: "Software Engineering Intern",
    location: "Gurugram, India",
    startDate: "March 2025",
    endDate: "Present",
    duration: "3 months",
    isCurrentRole: true,
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
    companyType: "Technology Consulting",
    description: [
      "Working on full-stack development projects using modern technologies",
      "Collaborating with cross-functional teams to deliver scalable solutions",
      "Contributing to enterprise-level applications and systems",
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS", "Microservices"],
  },
  // Add more experiences here
];

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(EXPERIENCES[0]);

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 dark:bg-[#1C1C1E]">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-light text-[#1D1D1F] dark:text-white">
            Professional Experience
          </h1>
          <p className="text-lg font-light text-[#86868B] dark:text-[#A1A1A6]">
            My journey in technology and software development
          </p>
        </div>

        {/* iOS-style segmented control */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl bg-[#E5E5EA] p-1 dark:bg-[#2C2C2E]">
            {EXPERIENCES.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelectedExperience(exp)}
                className={`relative px-6 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedExperience.id === exp.id
                    ? "text-[#1D1D1F] dark:text-white"
                    : "text-[#86868B] dark:text-[#A1A1A6]"
                }`}
              >
                {selectedExperience.id === exp.id && (
                  <motion.div
                    layoutId="segmentedControlActive"
                    className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-[#3A3A3C]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{exp.company}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedExperience.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ExperienceCard experience={selectedExperience} />
        </motion.div>
      </div>
    </div>
  );
}

function ExperienceCard({
  experience,
}: {
  experience: (typeof EXPERIENCES)[0];
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl transition-all duration-300 dark:bg-[#2C2C2E]/80">
      {/* iOS-style card content */}
      <div className="p-8">
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
          {/* Company Logo - iOS style */}
          <div className="flex-shrink-0">
            <div className="relative h-20 w-20 overflow-hidden rounded-[22px] bg-gradient-to-br from-[#34C759] to-[#30B0C7] shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <span className="text-2xl font-semibold text-white">
                  {experience.company.charAt(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <div className="mb-4 flex flex-col items-start justify-between md:flex-row">
              <div>
                <h3 className="mb-2 text-2xl font-semibold text-[#1D1D1F] dark:text-white">
                  {experience.position}
                </h3>
                <div className="mb-2 flex items-center space-x-3">
                  <h4 className="text-lg font-medium text-[#007AFF] dark:text-[#0A84FF]">
                    {experience.company}
                  </h4>
                  <span className="text-sm text-[#86868B] dark:text-[#A1A1A6]">
                    • {experience.companyType}
                  </span>
                </div>
              </div>

              {experience.isCurrentRole && (
                <div className="mt-2 md:mt-0">
                  <span className="inline-flex items-center rounded-full bg-[#E5F9E0] px-3 py-1 text-sm font-medium text-[#34C759] dark:bg-[#1C3122] dark:text-[#30D158]">
                    <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#34C759]"></span>
                    Current Role
                  </span>
                </div>
              )}
            </div>

            {/* iOS-style info pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-full bg-[#F2F2F7] px-3 py-1.5 text-sm font-medium text-[#86868B] dark:bg-[#3A3A3C] dark:text-[#A1A1A6]">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                {experience.location}
              </div>
              <div className="inline-flex items-center rounded-full bg-[#F2F2F7] px-3 py-1.5 text-sm font-medium text-[#86868B] dark:bg-[#3A3A3C] dark:text-[#A1A1A6]">
                <Calendar className="mr-1 h-3.5 w-3.5" />
                {experience.startDate} - {experience.endDate}
              </div>
              <div className="inline-flex items-center rounded-full bg-[#F2F2F7] px-3 py-1.5 text-sm font-medium text-[#86868B] dark:bg-[#3A3A3C] dark:text-[#A1A1A6]">
                <Briefcase className="mr-1 h-3.5 w-3.5" />
                {experience.duration}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <ul className="space-y-3">
                {experience.description.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#007AFF] dark:bg-[#0A84FF]"></span>
                    <span className="text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills/Technologies - iOS style */}
            <div>
              <h5 className="mb-3 text-sm font-medium text-[#1D1D1F] dark:text-white">
                Technologies & Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-[#F2F2F7] px-3.5 py-1.5 text-sm font-medium text-[#007AFF] transition-colors duration-200 hover:bg-[#E5F0FF] dark:bg-[#3A3A3C] dark:text-[#0A84FF] dark:hover:bg-[#1C3A5A]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iOS-style card footer */}
      <div className="flex items-center justify-end border-t border-[#E5E5EA] bg-[#F9F9FC]/80 px-6 py-4 dark:border-[#38383A] dark:bg-[#2C2C2E]/60">
        <button className="inline-flex items-center text-sm font-medium text-[#007AFF] transition-colors hover:text-[#0056b3] dark:text-[#0A84FF] dark:hover:text-[#47A2FF]">
          View Details
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
