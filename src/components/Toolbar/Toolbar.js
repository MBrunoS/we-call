import React, { useContext, useState } from 'react'
import RoomContext from '../../contexts/roomContext';
import utils from '../../utils';
import SettingsContext from '../../contexts/settingsContext';
import './Toolbar.css'

function Toolbar ({handleMic, handleCam, handleScreenShare, handleCallEnd}) {
  const [micOpen, setMicOpen] = useState(true);
  const [camOpen, setCamOpen] = useState(true);
  const {calls, screenStream} = useContext(RoomContext);
  const { handleOpen } = useContext(SettingsContext);

  function toggleMic () {
    handleMic();
    setMicOpen(!micOpen);
  }
  
  function toggleCam () {
    handleCam();
    setCamOpen(!camOpen);
  }

  return (
    <div className="Toolbar">
      <button className="btn-floating btn-large waves-effect waves-light blue" onClick={toggleMic}>
        <i className="material-icons">
          {micOpen ? 'mic' : 'mic_off'}
        </i>
      </button>
      
      <button className="btn-floating btn-large waves-effect waves-light blue" onClick={toggleCam}>
        <i className="material-icons">
          {camOpen ? 'videocam' : 'videocam_off'}
        </i>
      </button>
      
      {calls?.length > 0 && !utils.isMobile() && (
        <button className="btn-floating btn-large waves-effect waves-light blue" onClick={handleScreenShare}>
          <i className="material-icons">
            {screenStream ? 'stop_screen_share' : 'screen_share'}
          </i>
        </button>
      )}
      
      <button className="btn-floating btn-large waves-effect waves-light grey darken-2" onClick={handleOpen}>
        <i className="material-icons">settings</i>
      </button>
      
      <button className="btn-floating btn-large waves-effect waves-light red" onClick={handleCallEnd}>
        <i className="material-icons">call_end</i>
      </button>
    </div>      
  )
}

export default Toolbar;