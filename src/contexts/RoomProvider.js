import Peer from "peerjs";
import React, { useState } from "react";
import RoomContext from "./roomContext";
import utils from "../utils";

function RoomProvider({ children }) {
  const [peer, setPeer] = useState(new Peer());
  const [localStream, setLocalStream] = useState(null);
  const [calls, setCalls] = useState([]);
  const [screenStream, setScreenStream] = useState(null);
  const [callEnded, setCallEnded] = useState(false);

  function handleMic() {
    if (calls.length > 0) {
      // Since the audio sender is the same for all the calls, we just toggle it once
      utils.toggleAudio(null, calls[0]);
    } else {
      utils.toggleAudio(localStream);
    }
  }

  function handleCam() {
    if (calls.length > 0) {
      // Since the video sender is the same for all the calls, we just toggle it once
      utils.toggleVideo(null, calls[0]);
    } else {
      utils.toggleVideo(localStream);
    }
  }

  function handleScreenShare() {
    if (!screenStream) {
      utils.getScreen().then(
        (stream) => {
          calls.forEach((call) => utils.replaceVideo(stream, call));

          // Must do this here because the user can stop the sharing through browser dialog
          const screenStreamTrack = stream.getVideoTracks()[0];
          screenStreamTrack.addEventListener("ended", () => {
            utils.replaceVideo(localStream, calls[0]);
            setScreenStream(null);
          });

          setScreenStream(stream);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      utils.replaceVideo(localStream, calls[0]);
      utils.endMediaStream(screenStream);
      setScreenStream(null);
    }
  }

  function handleCallEnd() {
    // manually close the peer connections
    for (let conns in peer.connections) {
      peer.connections[conns].forEach((conn) => {
        conn.close();
      });
    }

    utils.endMediaStream(localStream);
    setCallEnded(true);
    setLocalStream(null);
    setScreenStream(null);
  }

  return (
    <RoomContext.Provider
      value={{
        peer,
        setPeer,
        localStream,
        setLocalStream,
        screenStream,
        setScreenStream,
        calls,
        setCalls,
        callEnded,
        setCallEnded,
        handleMic,
        handleCam,
        handleScreenShare,
        handleCallEnd,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
