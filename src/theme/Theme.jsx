import React, { useCallback, useEffect, createContext, useState } from "react";
import { cssDark, cssLight } from "./cssVariables";
import "./Theme.css";

export const ThemeContext = createContext({});

export const Theme = ({ children }) => {
  const [darkMode, setDarkMode] = useState(undefined);

  const changeTheme = useCallback((value) => {
    switch (value) {
      case 'light':
        localStorage.setItem('AgoroDarkMode', 'false');
        setDarkMode({ mode: 'light', css: cssLight, dark: false });
        return;
      case 'dark':
        localStorage.setItem('AgoroDarkMode', 'true');
        setDarkMode({ mode: 'dark', css: cssDark, dark: true });
        return;
      case 'system': {
        localStorage.removeItem('AgoroDarkMode');
        const system = systemDarkMode();
        setDarkMode({ mode: 'system', css: system ? cssDark : cssLight, dark: system ? true : false });
        return;
      }
      default:
        return;
    }
  }, []);

  useEffect(() => {
    //Check theme
    const dark = localStorage.getItem('AgoroDarkMode');
    if(dark === 'true' || (!dark && systemDarkMode())) {
      setDarkMode({ mode: dark ? 'dark' : 'system', css: cssDark, dark: true });
    } else {
      setDarkMode({ mode: dark ? 'light' : 'system', css: cssLight, dark: false });
    }

    const darkModeListenerFunc = () => {
      if(!localStorage.getItem('AgoroDarkMode')) {
        changeTheme('system');
      }
    };
    //If system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', darkModeListenerFunc);

    return() => { //Remove event listener on exit
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', darkModeListenerFunc);
    };
  }, [changeTheme]);

  const systemDarkMode = () => {
    //Check system dark mode status
    return(
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  };

  return(
    <>
      {darkMode !== undefined &&
        <ThemeContext.Provider value={{ changeTheme, darkMode }}>
          <div className='theme' style={{...darkMode.css}}>
            {children}
          </div>
        </ThemeContext.Provider>
      }
    </>
  )
}