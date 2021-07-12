import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { RoomContext } from "../../../context/RoomContext";
import { SettingsProvider } from "../../../context/SettingsContext";
import Video from "../../../components/Video";
import Settings from "../../../components/Settings";
import Toolbar from "../../../components/Toolbar";

function Participant({ controls, setControls }) {
  const {
    peer,
    roomType,
    setRoomType,
    localStream,
    calls,
    setCalls,
    msg,
    setMsg,
  } = useContext(RoomContext);
  const { id: roomId } = useParams();
  const msgRef = useRef();
  msgRef.current = msg;

  useEffect(() => {
    const conn = peer.connect(roomId);
    setMsg("Tentando conectar...");

    conn.on("open", () => {
      conn.on("data", (data) => {
        setRoomType(data.roomType);
        setControls(data.roomControls);
      });
    });

    peer.on("call", (call) => {
      setMsg("Conexão estabelecida");
      call.answer(localStream);
      call.on("stream", (remote) => {
        call.stream = remote;
        setCalls([call]);

        if (!controls.mic) {
          call.peerConnection.getSenders()[0].track.enabled = false;
        }
      });
    });

    // must do this because call.on('close') doesn't fire
    conn.on("close", () => {
      setMsg("O anfitrião saiu da sala");
      setCalls([]);
    });

    conn.peerConnection.oniceconnectionstatechange = () => {
      if (conn.peerConnection.iceConnectionState === "disconnected") {
        setMsg("O anfitrião saiu da sala");
        setCalls([]);
      }
    };
  }, []);

  return (
    <>
      {calls.length > 0 ? (
        <Video srcObject={calls[0].stream} autoPlay />
      ) : (
        <p>{msgRef.current}</p>
      )}

      <SettingsProvider>
        <Toolbar
          mic={controls.mic}
          cam={controls.cam}
          screen={controls.screen}
        />
        <Settings mic={controls.mic} cam={controls.cam} />
      </SettingsProvider>
    </>
  );
}

export default Participant;
