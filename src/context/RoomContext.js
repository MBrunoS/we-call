import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import utils from "../utils";

export const RoomContext = React.createContext();

export function RoomProvider({ children }) {
  const [peer, setPeer] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [calls, setCalls] = useState([]);
  const [msg, setMsg] = useState("");
  const history = useHistory();

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
          calls.forEach((call) => utils.replaceVideo(stream, null, call));

          // Must do this here because the user can stop the sharing through browser dialog
          const screenStreamTrack = stream.getVideoTracks()[0];
          screenStreamTrack.addEventListener("ended", () => {
            utils.replaceVideo(localStream, null, calls[0]);
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
    console.log(peer.connections);
    for (let conns in peer.connections) {
      peer.connections[conns].forEach((conn) => {
        conn.close();
      });
    }

    utils.endMediaStream(localStream);
    setLocalStream(null);
    setScreenStream(null);

    history.push("/call-end");
  }

  return (
    <RoomContext.Provider
      value={{
        peer,
        setPeer,
        roomType,
        setRoomType,
        localStream,
        setLocalStream,
        screenStream,
        setScreenStream,
        calls,
        setCalls,
        msg,
        setMsg,
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
