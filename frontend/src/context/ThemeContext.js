import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({ dark: true, setDark: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [dark, setDarkState] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : true;
  });

  const setDark = (value) => {
    setDarkState(value);
    localStorage.setItem('theme', value ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
