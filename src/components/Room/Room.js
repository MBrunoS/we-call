import Peer from "peerjs";
import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import utils from "../../utils";
import RoomContext from "../../contexts/roomContext";
import Owner from "./Owner";
import Visitor from "./Visitor";
import Video from "../Video/Video";
import { useLocation } from "react-router-dom";

function Room() {
  const {
    peer,
    setPeer,
    localStream,
    setLocalStream,
    screenStream,
    isCallEnded,
  } = useContext(RoomContext);

  const location = useLocation();
  const { id: roomId } = useParams();
  const [participantsControls, setParticipantsControls] = useState();

  useEffect(() => {
    if (location.state) {
      setParticipantsControls(location.state);
    }

    if (peer !== null) {
      utils.getUserMedia().then((stream) => {
        setLocalStream(stream);
      });
    } else {
      setPeer(new Peer());
    }
    return () => {
      setLocalStream(null);
    };
  }, [peer]);

  return isCallEnded ? (
    <Redirect push to="/call-end" />
  ) : (
    localStream && (
      <>
        {peer.id === roomId ? (
          <Owner participantsControls={participantsControls} />
        ) : (
          <Visitor />
        )}

        {screenStream ? (
          <Video
            className="local-video"
            srcObject={screenStream}
            autoPlay
            muted
          />
        ) : (
          <Video
            className="local-video"
            srcObject={localStream}
            autoPlay
            muted
          />
        )}
      </>
    )
  );
}

export default Room;
