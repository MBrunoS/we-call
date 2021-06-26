import getusermedia from "getusermedia";
import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import RoomContext from "../contexts/roomContext";
import Video from "./Video";
import Draggable from "react-draggable";
import Toolbar from "./Toolbar";

function Room () {
  const { id: roomId } = useParams();
  const { peer, cameraStream, setCameraStream, remoteStream, setRemoteStream } = useContext(RoomContext);
  const [isConnected, setIsConnected] = useState(false);
  const [isPeerOpen, setIsPeerOpen] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    if (!peer.id) {
      peer.on('open', () => {
        setIsPeerOpen(true);
      });
    } else {
      getusermedia((err, stream) => {
        if (err) console.log(err);
        else {
          setCameraStream(stream);
  
          if (peer.id === roomId) {
            // Here is the room owner, listen for a connection and starts a video call
            peer.on('connection', conn => {
              let call = peer.call(conn.peer, stream);
              
              call.on('stream', (remote) => {
                setIsConnected(true);
                setRemoteStream(remote);
              });
            
              // peerjs bug prevents this from firing: https://github.com/peers/peerjs/issues/636
              call.on('close', () => {
                console.log("call close event");
                setIsConnected(false);
                setRemoteStream(null);
              });
  
              // this one works
              conn.on('close', () => {
                console.log("conn close event");
                setIsConnected(false);
                setRemoteStream(null);
              });
            });
  
          } else {
            // Here is the visitor, it starts a simple data connection and listens for the call
            const conn = peer.connect(roomId);
            peer.on('call', function (call) {
              // setCall(call);
              call.answer(stream);
              call.on('stream', (remote) => {
                setIsConnected(true);
                setRemoteStream(remote);
              });
            });
            
            // this one works
            conn.on('close', () => {
              console.log("conn close event");
              setIsConnected(false);
              setRemoteStream(null);
            });
          }
        }
      });
    }

  }, [isPeerOpen]);

  function handleCopy () {
    const copyText = document.getElementById('room-id');
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
  }

  function handleCallEnd () {
    // manually close the peer connections
    for (let conns in peer.connections) {
      peer.connections[conns].forEach((conn) => {
        conn.close();
      });
    }
    
    const tracks = cameraStream.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });

    setCallEnded(true);
    setCameraStream(null);
  }

  return callEnded ? (
    <Redirect push to="/call-end" />
  ) : (
    <>
      <div className="row">
        { peer.id === roomId ? (
          <>
            <div className="col s8">
              <input type="text" readOnly id="room-id" value={`${window.location.origin}/room/${roomId}`} />
            </div>
            <div className="col s4">
              <button className="blue waves-effect btn" onClick={handleCopy}>Copiar Link</button>
            </div>
        </>
        ) : null }

        <div className="col s12">
          {isConnected ? null : (
            <p>Aguardando conexão...</p>
          )}
          <Video srcObject={remoteStream} autoPlay />
        </div>

        {cameraStream ? (
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            <Toolbar handleCallEnd={handleCallEnd} />
          </div>
        ) : null}
      </div>
      <Draggable bounds="body">
        <Video className="camera" srcObject={cameraStream} autoPlay muted />
      </Draggable>
    </>      
  )
}

export default Room;
