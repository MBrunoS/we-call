import React, { useContext, useState } from 'react'
import RoomContext from '../../contexts/roomContext';
import './Toolbar.css'

function Toolbar ({handleCallEnd, handleScreenShare}) {
  const [micOpen, setMicOpen] = useState(true);
  const [camOpen, setCamOpen] = useState(true);

  const { cameraStream, sharingScreen } = useContext(RoomContext);

  function handleMic () {
    cameraStream.getAudioTracks()[0].enabled = !cameraStream.getAudioTracks()[0].enabled;
    setMicOpen(!micOpen);
  }
  
  function handleCam () {
    cameraStream.getVideoTracks()[0].enabled = !cameraStream.getVideoTracks()[0].enabled;
    setCamOpen(!camOpen);
  }

  return (
    <div className="Toolbar">
      <button className="btn-floating btn-large waves-effect waves-light blue" onClick={handleMic}>
        <i className="material-icons">
          {micOpen ? 'mic' : 'mic_off'}
        </i>
      </button>
      
      <button className="btn-floating btn-large waves-effect waves-light blue" onClick={handleCam}>
        <i className="material-icons">
          {camOpen ? 'videocam' : 'videocam_off'}
        </i>
      </button>
      
      {/* <button className="btn-floating btn-large waves-effect waves-light blue" onClick={handleScreenShare}>
        <i className="material-icons">
          {sharingScreen ? 'stop_screen_share' : 'screen_share'}
        </i>
      </button> */}
      
      <button className="btn-floating btn-large waves-effect waves-light red" onClick={handleCallEnd}>
        <i className="material-icons">
          <i className="material-icons">call_end</i>
        </i>
      </button>
    </div>      
  )
}

export default Toolbar;