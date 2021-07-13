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
  const { peer, setPeer, localStream, setLocalStream, screenStream, setMsg } =
    useContext(RoomContext);
  const { id: roomId } = useParams();
  const location = useLocation();
  const [isPeerOpen, setIsPeerOpen] = useState(false);
  const [roomControls, setRoomControls] = useState({
    mic: false,
    cam: false,
    screen: false,
  });

  useEffect(() => {
    if (location.state) {
      setRoomControls(location.state);
    }

    if (peer === null) {
      const p = new Peer({ debug: 3 });
      p.on("open", () => {
        setIsPeerOpen(true);
        p.on("error", (err) => {
          setMsg("Desculpe, houve um erro");
          console.log(err);
        });
      });
      setPeer(p);
    } else if (!!peer.id) {
      setIsPeerOpen(true);
    }

    utils.getUserMedia().then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  return (
    <>
      {isPeerOpen && localStream && (
        <>
          {peer?.id === roomId ? (
            <Owner roomControls={roomControls}>
              <SettingsProvider>
                <Toolbar mic cam screen />
                <Settings mic cam>
                  <CopyLink />
                </Settings>
              </SettingsProvider>
            </Owner>
          ) : (
            <Participant
              controls={roomControls}
              setControls={setRoomControls}
            />
          )}
        </>
      )}

      {screenStream ? (
        <Video className="local-vid" srcObject={screenStream} autoPlay muted />
      ) : (
        <Video className="local-vid" srcObject={localStream} autoPlay muted />
      )}
    </>
  );
}

export default Room;
