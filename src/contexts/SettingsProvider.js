import React, { useState } from 'react';
import SettingsContext from './settingsContext';

function SettingsProvider ({children}) {
  const [isVisible, setIsVisible] = useState(false);

  function handleOpen () {
    setIsVisible(true);
  }

  return (
    <SettingsContext.Provider value={{
      isVisible, setIsVisible, handleOpen
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;