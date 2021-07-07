import React, { useState } from "react";

export const CreateRoomContext = React.createContext();

export function CreateRoomProvider({ children }) {
  const [roomId, setRoomId] = useState("");
  const [roomControls, setRoomControls] = useState({
    mic: true,
    cam: true,
    screen: true,
  });

  function updateControls(e) {
    setRoomControls({
      ...roomControls,
      [e.target.value]: e.target.checked,
    });
  }

  return (
    <CreateRoomContext.Provider
      value={{ roomId, setRoomId, roomControls, updateControls }}
    >
      {children}
    </CreateRoomContext.Provider>
  );
}
