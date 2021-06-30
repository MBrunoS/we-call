import Peer from 'peerjs';
import React, { useState } from 'react';
import RoomContext from './roomContext';

function RoomProvider ({children}) {
  const [peer, setPeer] = useState(new Peer());
  const [localStream, setLocalStream] = useState(null);
  const [calls, setCalls] = useState([]);
  const [screenStream, setScreenStream] = useState(null);

  return (
    <RoomContext.Provider value={{
      peer, setPeer,
      localStream, setLocalStream,
      screenStream, setScreenStream,
      calls, setCalls
    }}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomProvider;