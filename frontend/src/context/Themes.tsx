import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeGet = localStorage.getItem('theme');
  const themeTag = document.querySelector('html')!;
  const [theme, setTheme] = useState<string>(themeGet ? themeGet : 'light_mode');

  useEffect(() => {
    if (theme !== 'light_mode') {
      themeTag.classList.replace('light_mode', 'dark_mode');
    } else {
      themeTag.classList.replace('dark_mode', 'light_mode');
    }
  }, [theme, themeTag]);

  const lightTheme = () => {
    setTheme('light_mode');
    localStorage.setItem('theme', 'light_mode');
    themeTag.classList.replace('dark_mode', 'light_mode');
  };

  const darkTheme = () => {
    setTheme('dark_mode');
    localStorage.setItem('theme', 'dark_mode');
    themeTag.classList.replace('light_mode', 'dark_mode');
  };

  const toggleTheme = () => {
    if (theme !== 'light_mode') lightTheme();
    else darkTheme();
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
