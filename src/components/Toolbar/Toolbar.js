import React, { useContext } from "react";
import RoomContext from "../../contexts/roomContext";
import utils from "../../utils";
import SettingsContext from "../../contexts/settingsContext";
import "./Toolbar.css";

function Toolbar({ mic, cam, screen, settings }) {
  const {
    calls,
    screenStream,
    handleMic,
    handleCam,
    handleScreenShare,
    handleCallEnd,
  } = useContext(RoomContext);
  const { handleOpen, micOpen, setMicOpen, camOpen, setCamOpen } =
    useContext(SettingsContext);

  function toggleMic() {
    handleMic();
    setMicOpen(!micOpen);
  }

  function toggleCam() {
    handleCam();
    setCamOpen(!camOpen);
  }

  return (
    <div className="Toolbar">
      {mic && (
        <button
          className="btn-floating btn-large waves-effect waves-light blue"
          onClick={toggleMic}
        >
          <i className="material-icons">{micOpen ? "mic" : "mic_off"}</i>
        </button>
      )}

      {cam && (
        <button
          className="btn-floating btn-large waves-effect waves-light blue"
          onClick={toggleCam}
        >
          <i className="material-icons">
            {camOpen ? "videocam" : "videocam_off"}
          </i>
        </button>
      )}

      {screen && calls?.length > 0 && !utils.isMobile() && (
        <button
          className="btn-floating btn-large waves-effect waves-light blue"
          onClick={handleScreenShare}
        >
          <i className="material-icons">
            {screenStream ? "stop_screen_share" : "screen_share"}
          </i>
        </button>
      )}

      {settings && (
        <button
          className="btn-floating btn-large waves-effect waves-light grey darken-2"
          onClick={handleOpen}
        >
          <i className="material-icons">settings</i>
        </button>
      )}

      <button
        className="btn-floating btn-large waves-effect waves-light red"
        onClick={handleCallEnd}
      >
        <i className="material-icons">call_end</i>
      </button>
    </div>
  );
}

export default Toolbar;
