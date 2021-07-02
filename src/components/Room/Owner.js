import React, { useContext, useEffect, useRef } from "react";
import RoomContext from "../../contexts/roomContext";
import CopyLink from "./CopyLink";
import VideoList from "../Video/VideoList";
import SettingsProvider from "../../contexts/SettingsProvider";
import Settings from "../Settings/Settings";
import Toolbar from "../Toolbar/Toolbar";

function Owner() {
  const { peer, localStream, calls, setCalls } = useContext(RoomContext);

  const localStreamRef = useRef();
  localStreamRef.current = localStream;

  const callsRef = useRef();
  callsRef.current = calls;

  useEffect(() => {
    peer.on("connection", (conn) => {
      let _call = peer.call(conn.peer, localStreamRef.current);

      _call.on("stream", (remote) => {
        // This check is needed because this event fires twice
        // One time for each stream track, i.e., audio and video
        const isPresent = callsRef.current.some((call) => {
          return call.peer === _call.peer;
        });

        if (!isPresent) {
          _call.stream = remote;
          setCalls([...callsRef.current, _call]);
        }
      });
      // must do this because call.on('close') doesn't fire
      conn.on("close", () => endConnection(conn));

      // This is in case the connection ends abruptly
      conn.peerConnection.oniceconnectionstatechange = () => {
        if (conn.peerConnection.iceConnectionState == "disconnected") {
          endConnection(conn);
        }
      };
    });
  }, []);

  function endConnection(conn) {
    const newCalls = callsRef.current.filter((call) => {
      return call.peer !== conn.peer;
    });
    setCalls(newCalls);
  }

  return (
    <>
      <CopyLink />
      {calls.length > 0 ? (
        <VideoList list={calls} />
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

export default Owner;
