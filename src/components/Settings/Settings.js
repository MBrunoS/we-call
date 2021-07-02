import React, { useContext } from 'react'
import SettingsContext from '../../contexts/settingsContext';
import './Settings.css'

function Settings () {
  const {isVisible, setIsVisible} = useContext(SettingsContext);

  function handleClose () {
    setIsVisible(false);
  }

  return (
    <section className={`Settings ${isVisible ? 'show' : ''}`}>
      <p>Entrada de vídeo:</p>
      <p>Entrada de áudio:</p>
      <button
        className="btn waves-effect waves-light blue"
        onClick={handleClose}>
          OK
      </button>
    </section>
  )
}

export default Settings;