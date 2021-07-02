import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import RoomContext from "../../contexts/roomContext";
import Video from "../Video/Video";
import SettingsProvider from "../../contexts/SettingsProvider";
import Settings from "../Settings/Settings";
import Toolbar from "../Toolbar/Toolbar";

function Visitor() {
  const { peer, localStream, calls, setCalls } = useContext(RoomContext);
  const { id: roomId } = useParams();

  useEffect(() => {
    const conn = peer.connect(roomId);

    peer.on("call", function (call) {
      call.answer(localStream);
      call.on("stream", (remote) => {
        call.stream = remote;
        setCalls([call]);
      });
    });

    // must do this because call.on('close') doesn't fire
    conn.on("close", () => {
      setCalls([]);
    });

    conn.peerConnection.oniceconnectionstatechange = () => {
      if (conn.peerConnection.iceConnectionState == "disconnected") {
        setCalls([]);
      }
    };
  }, []);

  return (
    <>
      {calls.length > 0 ? (
        <Video srcObject={calls[0].stream} autoPlay />
      ) : (
        <p>Aguardando conexão...</p>
      )}

      <SettingsProvider>
        <Toolbar mic cam screen settings />
        <Settings />
      </SettingsProvider>
    </>
  );
}

export default Visitor;
