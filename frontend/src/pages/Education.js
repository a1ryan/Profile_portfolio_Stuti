import React from 'react';
import { educationData, projectsData, languagesData } from '../data/mock';

const Education = () => {
  return (
    <div className="min-h-screen px-8 py-16 md:py-24">
      {/* Page Title */}
      <div className="mb-16">
        <h1
          className="text-[10vw] md:text-[6vw] font-thin leading-none tracking-tighter"
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontWeight: 100
          }}
        >
          EDUCATION
        </h1>
        <div className="w-full h-px bg-current opacity-10 mt-4" />
      </div>

      {/* Education Cards */}
      <div className="flex flex-col gap-12 mb-24">
        {educationData.map((edu, index) => (
          <div key={edu.id} className="border-b border-current border-opacity-10 pb-12 group">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span
                    className="text-[10px] tracking-[0.25em] opacity-30"
                    style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="text-2xl md:text-3xl font-thin"
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                      fontWeight: 300
                    }}
                  >
                    {edu.degree}
                  </h3>
                </div>
                <div
                  className="flex flex-wrap items-center gap-3 mt-2 ml-8"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  <span className="text-xs opacity-50 tracking-wider">{edu.school}</span>
                  <span className="text-xs opacity-20">·</span>
                  <span className="text-xs opacity-40 tracking-wider">{edu.location}</span>
                </div>
                {edu.courses.length > 0 && (
                  <div className="mt-4 ml-8">
                    <p
                      className="text-[10px] tracking-[0.2em] opacity-30 mb-2"
                      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                    >
                      RELEVANT COURSEWORK
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="text-[10px] border border-current opacity-30 px-2 py-0.5 tracking-wider"
                          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className="text-[10px] tracking-[0.2em] opacity-40"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  {edu.period}
                </span>
                <span
                  className="text-[10px] tracking-[0.2em] opacity-50 border border-current px-2 py-0.5"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  {edu.gpa}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="mb-24">
        <h2
          className="text-xs tracking-[0.3em] mb-8 border-b border-current border-opacity-20 pb-4 inline-block opacity-80"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          PROJECTS & EVENTS
        </h2>
        <div className="flex flex-col gap-10">
          {projectsData.map((project, index) => (
            <div key={project.id} className="border-b border-current border-opacity-10 pb-10">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-[10px] tracking-[0.25em] opacity-30"
                      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-thin"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontWeight: 300
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <p
                    className="text-xs opacity-40 tracking-wider mt-1 ml-8"
                    style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                  >
                    {project.location}
                  </p>
                  <ul className="flex flex-col gap-2 mt-4 ml-8">
                    {project.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm font-light opacity-50"
                        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-current shrink-0 opacity-40" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  className="text-[10px] tracking-[0.2em] opacity-40 shrink-0"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  {project.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="mb-24">
        <h2
          className="text-xs tracking-[0.3em] mb-8 border-b border-current border-opacity-20 pb-4 inline-block opacity-80"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          LANGUAGES
        </h2>
        <div className="flex flex-wrap gap-8">
          {languagesData.map((lang) => (
            <div key={lang.language} className="flex flex-col gap-1">
              <span
                className="text-lg md:text-xl font-thin"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  fontWeight: 300
                }}
              >
                {lang.language}
              </span>
              <span
                className="text-[10px] tracking-[0.2em] opacity-40"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
