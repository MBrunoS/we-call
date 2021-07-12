import React, { useState } from "react";

export const CreateRoomContext = React.createContext();

export function CreateRoomProvider({ children }) {
  const [roomId, setRoomId] = useState("");
  const [roomSettings, setRoomSettings] = useState({
    type: "semi-group",
    controls: { mic: true, cam: true, screen: true },
  });

  function updateType(e) {
    setRoomSettings({
      ...roomSettings,
      type: e.target.value,
    });
  }

  function updateControls(e) {
    setRoomSettings({
      ...roomSettings,
      controls: {
        ...roomSettings.controls,
        [e.target.value]: e.target.checked,
      },
    });
  }

  return (
    <CreateRoomContext.Provider
      value={{
        roomId,
        setRoomId,
        roomSettings,
        updateType,
        updateControls,
      }}
    >
      {children}
    </CreateRoomContext.Provider>
  );
}
