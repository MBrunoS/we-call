import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { RoomContext } from "../../../context/RoomContext";
import { SettingsProvider } from "../../../context/SettingsContext";
import Video from "../../../components/Video";
import Settings from "../../../components/Settings";
import Toolbar from "../../../components/Toolbar";

function Participant({ controls, setControls }) {
  const { peer, localStream, calls, setCalls } = useContext(RoomContext);
  const { id: roomId } = useParams();

  useEffect(() => {
    peer.on("open", () => {
      const conn = peer.connect(roomId);

      conn.on("data", (data) => {
        setControls(data);
        if (!data.mic) {
          localStream.getAudioTracks()[0].enabled = false;
        }
      });

      peer.on("call", (call) => {
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
        if (conn.peerConnection.iceConnectionState === "disconnected") {
          setCalls([]);
        }
      };
    });
  }, []);

  return (
    <>
      {calls.length > 0 ? (
        <Video srcObject={calls[0].stream} autoPlay />
      ) : (
        <p>Aguardando conexão...</p>
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
