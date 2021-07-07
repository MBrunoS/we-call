import Peer from "peerjs";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RoomContext } from "../../context/RoomContext";
import { SettingsProvider } from "../../context/SettingsContext";
import Owner from "./Owner";
import Participant from "./Participant";
import Toolbar from "../../components/Toolbar/";
import Settings from "../../components/Settings";
import CopyLink from "../../components/CopyLink";
import Video from "../../components/Video";
import utils from "../../utils";

function Room() {
  const { peer, setPeer, localStream, setLocalStream, screenStream } =
    useContext(RoomContext);
  const { id: roomId } = useParams();
  const location = useLocation();
  const [roomControls, setRoomControls] = useState();

  useEffect(() => {
    if (location.state) {
      setRoomControls(location.state);
    } else {
      setRoomControls({ mic: false, cam: false, screen: false });
    }

    if (peer === null) {
      setPeer(new Peer());
    } else {
      utils.getUserMedia().then((stream) => {
        setLocalStream(stream);
      });
    }
  }, [peer]);

  return (
    <>
      {localStream &&
        (peer?.id === roomId ? (
          <Owner roomControls={roomControls}>
            <SettingsProvider>
              <Toolbar mic cam screen />
              <Settings mic cam>
                <CopyLink />
              </Settings>
            </SettingsProvider>
          </Owner>
        ) : (
          <Participant controls={roomControls} setControls={setRoomControls} />
        ))}

      {screenStream ? (
        <Video className="local-vid" srcObject={screenStream} autoPlay muted />
      ) : (
        <Video className="local-vid" srcObject={localStream} autoPlay muted />
      )}
    </>
  );
}

export default Room;
