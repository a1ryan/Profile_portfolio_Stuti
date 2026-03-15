import React, { useEffect, useRef, useState } from 'react';
import { personalData, skillsData } from '../data/mock';

const Home = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (firstNameRef.current) {
        firstNameRef.current.style.transform = `translateX(-${scrollY * 0.08}px)`;
        firstNameRef.current.style.opacity = Math.max(0, 1 - scrollY / 500);
      }
      if (lastNameRef.current) {
        lastNameRef.current.style.transform = `translateX(-${scrollY * 0.05}px)`;
        lastNameRef.current.style.opacity = Math.max(0, 1 - scrollY / 500);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col overflow-hidden">
        {/* Big Name - parallax */}
        <div className="flex-1 flex flex-col justify-center pl-8 pr-4 pt-8">
          <div
            ref={firstNameRef}
            className={`transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ willChange: 'transform, opacity' }}
          >
            <h1
              className="text-[20vw] md:text-[18vw] font-thin leading-[0.85] tracking-tighter"
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontWeight: 100,
              }}
            >
              {personalData.firstName}
            </h1>
          </div>
          <div
            ref={lastNameRef}
            className={`transition-opacity duration-700 delay-100 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ willChange: 'transform, opacity' }}
          >
            <h1
              className="text-[20vw] md:text-[18vw] font-thin leading-[0.85] tracking-tighter"
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontWeight: 100,
              }}
            >
              {personalData.lastName}
            </h1>
          </div>

          <p
            className="mt-6 text-sm font-light tracking-[0.3em] opacity-60 ml-1"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {personalData.title}
          </p>
        </div>

        {/* Email contact */}
        <div className="pl-8 pb-20">
          <p
            className="text-xs font-light opacity-40"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            For business inquiries, email me at
          </p>
          <a
            href={`mailto:${personalData.email}`}
            className="text-xs font-light opacity-40 hover:opacity-90 transition-opacity duration-300"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {personalData.email}
          </a>
        </div>

        {/* About Me - Right side (desktop) */}
        <div className="absolute right-0 top-0 w-[45%] h-full flex-col justify-center pr-16 pl-8 hidden md:flex">
          <div className="max-w-sm ml-auto">
            <h2
              className="text-[10px] tracking-[0.35em] mb-5 pb-4 opacity-60"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                borderBottom: '0.5px solid currentColor'
              }}
            >
              ABOUT ME
            </h2>
            <p
              className="text-sm leading-loose font-light opacity-50"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              {personalData.about}
            </p>
          </div>
        </div>
      </section>

      {/* About Me - Mobile */}
      <section className="md:hidden px-8 py-16">
        <h2
          className="text-[10px] tracking-[0.35em] mb-5 pb-4 opacity-60 inline-block"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            borderBottom: '0.5px solid currentColor'
          }}
        >
          ABOUT ME
        </h2>
        <p
          className="text-sm leading-loose font-light opacity-50"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          {personalData.about}
        </p>
      </section>

      {/* Motivation Section */}
      <section className="min-h-screen flex flex-col md:flex-row px-8 py-24 gap-16">
        {/* Left: Motivation Text */}
        <div className="flex-1">
          <h2
            className="text-[10px] tracking-[0.35em] mb-8 pb-4 opacity-60 inline-block"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              borderBottom: '0.5px solid currentColor'
            }}
          >
            MOTIVATION
          </h2>
          <p
            className="text-sm leading-loose font-light opacity-50 max-w-md"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {personalData.motivation}
          </p>
        </div>

        {/* Right: Skills */}
        <div className="flex-1 flex flex-col gap-12">
          <div>
            <h2
              className="text-[10px] tracking-[0.35em] mb-8 pb-4 opacity-60 inline-block"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                borderBottom: '0.5px solid currentColor'
              }}
            >
              SKILLS
            </h2>

            <div className="grid grid-cols-1 gap-10 mt-4">
              <SkillGroup title="MARKETING" items={skillsData.marketing} />
              <SkillGroup title="ANALYTICS" items={skillsData.analytics} />
              <SkillGroup title="TOOLS" items={skillsData.tools} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const SkillGroup = ({ title, items }) => (
  <div>
    <h3
      className="text-[9px] tracking-[0.3em] mb-4 opacity-30"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
    >
      {title}
    </h3>
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="text-sm font-light opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-default"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Home;
