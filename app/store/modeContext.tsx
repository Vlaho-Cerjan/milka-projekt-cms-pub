// site mode store
// setting the site to dark or light mode

import React, { createContext, useState, useEffect } from "react";

export const defaultMode = "light";
export const modes = ["light", "dark"];
export const ModeContext = createContext<{
  mode: string,
  setMode: (mode: string) => void
}>({
  mode: "",
  setMode: () => {}
});

export const ModeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const m = localStorage.getItem('mode') || mode;
    setMode(m);
    if (m==="dark" && !document.body.classList.contains("dark")) document.body.classList.add("dark");
    else if (m==="light" && document.body.classList.contains("dark"))  document.body.classList.remove("dark");
  }, [mode]);

  const setThemeMode = (mode: string) => {
    localStorage.setItem('mode', mode);
    setMode(mode)
  }

  const contextValue = {
    mode: mode,
    setMode: setThemeMode
  };

  return (
    <ModeContext.Provider value={contextValue}>
      {children}
    </ModeContext.Provider>
  );
};
