import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Draggable from "react-draggable";
import utils from "../../utils";
import RoomContext from "../../contexts/roomContext";
import Owner from "./Owner";
import Visitor from "./Visitor";
import Video from "../Video/Video";

function Room() {
  const { peer, localStream, setLocalStream, screenStream, callEnded } =
    useContext(RoomContext);

  const { id: roomId } = useParams();
  const [isPeerOpen, setIsPeerOpen] = useState(!!peer.id);

  useEffect(() => {
    if (!isPeerOpen) {
      peer.on("open", () => {
        setIsPeerOpen(true);
      });
    } else {
      utils.getUserMedia().then((stream) => {
        setLocalStream(stream);
      });
    }
  }, [isPeerOpen]);

  return callEnded ? (
    <Redirect push to="/call-end" />
  ) : (
    localStream && (
      <>
        {peer.id === roomId ? <Owner /> : <Visitor />}

        <Draggable bounds="body">
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
        </Draggable>
      </>
    )
  );
}

export default Room;
