import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import RoomContext from '../../contexts/roomContext';
import Video from '../Video/Video';

function Visitor () {
  const { peer, localStream, calls, setCalls } = useContext(RoomContext);
  const { id: roomId } = useParams();

  useEffect(() => {
    const conn = peer.connect(roomId);
    peer.on('call', function (call) {
      call.answer(localStream);
      call.on('stream', (remote) => {
        call.stream = remote;
        setCalls([ call ]);
      });
    });
    
    // must do this because call.on('close') doesn't fire
    conn.on('close', () => {
      setCalls([]);
    });
  }, []);

  return (
    <div className="col s12">
      { calls.length > 0 ? (
        <Video srcObject={calls[0].stream} autoPlay />
      ) : (
        <p>Aguardando conexão...</p>
      )}
    </div>
  )
}

export default Visitor;