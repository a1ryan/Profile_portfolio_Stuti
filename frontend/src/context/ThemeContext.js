import React, { createContext, useContext } from 'react';

const ThemeContext = createContext({ dark: true });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ dark: true, setDark: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};
