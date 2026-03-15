import React, { useState } from 'react';
import { experienceData } from '../data/mock';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Experience = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen px-8 py-16 md:py-24">
      {/* Page Title */}
      <div className="mb-16">
        <h1
          className="text-[12vw] md:text-[8vw] font-thin leading-none tracking-tighter"
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontWeight: 100
          }}
        >
          EXPERIENCE
        </h1>
        <div className="w-full h-px bg-current opacity-10 mt-4" />
      </div>

      {/* Experience List */}
      <div className="flex flex-col gap-0">
        {experienceData.map((exp, index) => (
          <ExperienceItem
            key={exp.id}
            exp={exp}
            index={index}
            isExpanded={expanded === exp.id}
            onToggle={() => setExpanded(expanded === exp.id ? null : exp.id)}
          />
        ))}
      </div>
    </div>
  );
};

const ExperienceItem = ({ exp, index, isExpanded, onToggle }) => {
  return (
    <div
      className="border-b border-current border-opacity-10 py-8 cursor-pointer group"
      onClick={onToggle}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-4 flex-wrap">
            <span
              className="text-[10px] tracking-[0.25em] opacity-30"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3
              className="text-2xl md:text-3xl font-thin group-hover:opacity-80 transition-opacity duration-200"
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontWeight: 300
              }}
            >
              {exp.role}
            </h3>
          </div>
          <div
            className="flex flex-wrap items-center gap-3 mt-2 ml-8"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <span className="text-xs opacity-50 tracking-wider">{exp.company}</span>
            <span className="text-xs opacity-20">·</span>
            <span className="text-xs opacity-40 tracking-wider">{exp.location}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className="text-[10px] tracking-[0.2em] opacity-40"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {exp.period}
          </span>
          <span
            className={`text-[9px] px-2 py-0.5 border border-current tracking-widest ${
              exp.type === 'Internship' ? 'opacity-40' : 'opacity-60'
            }`}
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {exp.type}
          </span>
          <div className="opacity-30">
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isExpanded ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="ml-8">
          <p
            className="text-sm font-light opacity-50 mb-4 italic"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {exp.description}
          </p>
          <ul className="flex flex-col gap-3">
            {exp.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm font-light opacity-60"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                <span className="mt-2 w-1 h-1 rounded-full bg-current shrink-0 opacity-40" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
