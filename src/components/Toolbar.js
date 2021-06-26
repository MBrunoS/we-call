import React, { useContext, useState } from 'react'
import RoomContext from '../contexts/roomContext';

function Toolbar ({handleCallEnd}) {
  const [micOpen, setMicOpen] = useState(true);
  const [camOpen, setCamOpen] = useState(true);

  const { cameraStream, remoteStream } = useContext(RoomContext);

  function handleMic () {
    cameraStream.getAudioTracks()[0].enabled = !cameraStream.getAudioTracks()[0].enabled;
    setMicOpen(!micOpen);
  }
  
  function handleCam () {
    cameraStream.getVideoTracks()[0].enabled = !cameraStream.getVideoTracks()[0].enabled;
    setCamOpen(!camOpen);
  }

  return (
    <nav className="blue">
      <div className="nav-wrapper">
        <ul>
          <li>
            <a onClick={handleMic}>
              <i className="material-icons">
                {micOpen ? 'mic' : 'mic_off'}
              </i>
            </a>
          </li>
          
          <li>
            <a onClick={handleCam}>
              <i className="material-icons">
                {camOpen ? 'videocam' : 'videocam_off'}
              </i>
            </a>
          </li>
        </ul>
        <ul className="right">
          <li>
            <a onClick={handleCallEnd} className="red btn-floating waves-effect waves-light">
              <i className="material-icons">call_end</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>      
  )
}

export default Toolbar;