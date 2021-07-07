import React, { useState } from "react";

export const SettingsContext = React.createContext();

export function SettingsProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [micOpen, setMicOpen] = useState(true);
  const [camOpen, setCamOpen] = useState(true);

  function handleOpen() {
    setIsVisible(true);
  }

  return (
    <SettingsContext.Provider
      value={{
        isVisible,
        setIsVisible,
        handleOpen,
        micOpen,
        setMicOpen,
        camOpen,
        setCamOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
