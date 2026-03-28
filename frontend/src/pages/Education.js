import React from 'react';
import { educationData, projectsData, languagesData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';

const SERIF = "'Cormorant Garamond', 'Georgia', serif";
const SANS  = "'Josefin Sans', sans-serif";

const fg = (dark, a) => dark ? `rgba(255,255,255,${a})` : `rgba(18,18,18,${a})`;

const Education = () => {
  const { dark } = useTheme();

  return (
    <div className="min-h-screen px-8 py-16 md:py-24">

      {/* Page Title */}
      <div className="mb-16">
        <h1
          className="text-[10vw] md:text-[6vw] font-thin leading-none tracking-tighter"
          style={{ fontFamily: SERIF, fontWeight: 100, color: fg(dark, 1), transition: 'color 0.4s ease' }}
        >
          EDUCATION
        </h1>
        <div className="w-full h-px mt-4" style={{ background: fg(dark, 0.1), transition: 'background 0.4s ease' }} />
      </div>

      {/* Education Cards */}
      <div className="flex flex-col gap-12 mb-24">
        {educationData.map((edu, index) => (
          <div key={edu.id} className="pb-12 group" style={{ borderBottom: `0.5px solid ${fg(dark, 0.1)}`, transition: 'border-color 0.4s ease' }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span
                    className="text-[12px] tracking-[0.25em]"
                    style={{ fontFamily: SANS, color: fg(dark, 0.8), transition: 'color 0.4s ease' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="text-[29px] md:text-[36px] font-thin"
                    style={{ fontFamily: SERIF, fontWeight: 300, color: fg(dark, 1), transition: 'color 0.4s ease' }}
                  >
                    {edu.degree}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 ml-8" style={{ fontFamily: SANS }}>
                  <span className="text-[14px] tracking-wider" style={{ color: fg(dark, 0.5), transition: 'color 0.4s ease' }}>{edu.school}</span>
                  <span className="text-xs" style={{ color: fg(dark, 0.2) }}>·</span>
                  <span className="text-[14px] tracking-wider" style={{ color: fg(dark, 0.4), transition: 'color 0.4s ease' }}>{edu.location}</span>
                </div>
                {edu.courses && edu.courses.length > 0 && (
                  <div className="mt-4 ml-8">
                    <p
                      className="text-[12px] tracking-[0.2em] mb-2"
                      style={{ fontFamily: SANS, color: fg(dark, 0.3), transition: 'color 0.4s ease' }}
                    >
                      RELEVANT COURSEWORK
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="text-[12px] px-2 py-0.5 tracking-wider"
                          style={{
                            fontFamily: SANS,
                            color: fg(dark, 0.3),
                            border: `1px solid ${fg(dark, 0.3)}`,
                            transition: 'color 0.4s ease, border-color 0.4s ease',
                          }}
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
                  className="text-[12px] tracking-[0.2em]"
                  style={{ fontFamily: SANS, color: fg(dark, 0.8), transition: 'color 0.4s ease' }}
                >
                  {edu.period}
                </span>
                <span
                  className="text-[12px] tracking-[0.2em] px-2 py-0.5"
                  style={{
                    fontFamily: SANS,
                    color: fg(dark, 0.5),
                    border: `1px solid ${fg(dark, 0.5)}`,
                    transition: 'color 0.4s ease, border-color 0.4s ease',
                  }}
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
          className="text-[14px] tracking-[0.3em] mb-8 pb-4 inline-block"
          style={{
            fontFamily: SANS,
            color: fg(dark, 0.8),
            borderBottom: `1px solid ${fg(dark, 0.2)}`,
            transition: 'color 0.4s ease, border-color 0.4s ease',
          }}
        >
          PROJECTS &amp; EVENTS
        </h2>
        <div className="flex flex-col gap-10">
          {projectsData.map((project, index) => (
            <div key={project.id} className="pb-10" style={{ borderBottom: `0.5px solid ${fg(dark, 0.1)}`, transition: 'border-color 0.4s ease' }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-[12px] tracking-[0.25em]"
                      style={{ fontFamily: SANS, color: fg(dark, 0.8), transition: 'color 0.4s ease' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="text-[24px] md:text-[29px] font-thin"
                      style={{ fontFamily: SERIF, fontWeight: 300, color: fg(dark, 1), transition: 'color 0.4s ease' }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <p
                    className="text-[14px] tracking-wider mt-1 ml-8"
                    style={{ fontFamily: SANS, color: fg(dark, 0.4), transition: 'color 0.4s ease' }}
                  >
                    {project.location}
                  </p>
                  {project.bullets && (
                    <ul className="flex flex-col gap-2 mt-4 ml-8">
                      {project.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[17px] font-light"
                          style={{ fontFamily: SANS, color: fg(dark, 0.8), transition: 'color 0.4s ease' }}
                        >
                          <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: fg(dark, 0.4), display: 'inline-block' }} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <span
                  className="text-[12px] tracking-[0.2em] shrink-0"
                  style={{ fontFamily: SANS, color: fg(dark, 0.4), transition: 'color 0.4s ease' }}
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
          className="text-[14px] tracking-[0.3em] mb-8 pb-4 inline-block"
          style={{
            fontFamily: SANS,
            color: fg(dark, 0.8),
            borderBottom: `1px solid ${fg(dark, 0.2)}`,
            transition: 'color 0.4s ease, border-color 0.4s ease',
          }}
        >
          LANGUAGES
        </h2>
        <div className="flex flex-wrap gap-8">
          {languagesData.map((lang) => (
            <div key={lang.language} className="flex flex-col gap-1">
              <span
                className="text-[22px] md:text-[24px] font-thin"
                style={{ fontFamily: SERIF, fontWeight: 300, color: fg(dark, 1), transition: 'color 0.4s ease' }}
              >
                {lang.language}
              </span>
              <span
                className="text-[12px] tracking-[0.2em]"
                style={{ fontFamily: SANS, color: fg(dark, 0.8), transition: 'color 0.4s ease' }}
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
