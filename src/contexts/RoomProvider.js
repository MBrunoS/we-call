import Peer from 'peerjs';
import React, { useState } from 'react';
import RoomContext from './roomContext';

function RoomProvider ({children}) {
  const [peer, setPeer] = useState(new Peer());
  const [cameraStream, setCameraStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [call, setCall] = useState(null);
  const [sharingScreen, setSharingScreen] = useState(false);

  return (
    <RoomContext.Provider value={{
      peer, setPeer, cameraStream, setCameraStream, call, setCall,
      remoteStream, setRemoteStream, sharingScreen, setSharingScreen
    }}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomProvider;