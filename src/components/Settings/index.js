import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../context/RoomContext";
import { SettingsContext } from "../../context/SettingsContext";
import utils from "../../utils";
import "./Settings.css";

function Settings({ children, mic, cam }) {
  const { isVisible, setIsVisible, micOpen, camOpen } =
    useContext(SettingsContext);
  const { calls, localStream, setLocalStream } = useContext(RoomContext);
  const [devices, setDevices] = useState([]);
  const [mirrorCam, setMirrorCam] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setDevices(devices);
    });
  }, []);

  function handleChange(e) {
    if (e.target.id === "audio-inputs") {
      const constraints = {
        video: {
          deviceId: localStream.getVideoTracks()[0].getSettings().deviceId,
        },
        audio: { deviceId: e.target.value },
      };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        utils.replaceAudio(stream, localStream, calls[0]);
        stream.getAudioTracks()[0].enabled = micOpen;
        setLocalStream(stream);
      });
    } else if (e.target.id === "video-inputs") {
      const constraints = {
        video: { deviceId: e.target.value },
        audio: {
          deviceId: localStream.getAudioTracks()[0].getSettings().deviceId,
        },
      };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        utils.replaceVideo(stream, localStream, calls[0]);
        stream.getVideoTracks()[0].enabled = camOpen;
        setLocalStream(stream);
      });
    }
  }

  function handleMirror() {
    const video = document.querySelector(".local-vid");
    if (mirrorCam) {
      video.style.transform = video.style.transform.replace("scaleX(-1)", "");
    } else {
      video.style.transform += "scaleX(-1)";
    }
    setMirrorCam(!mirrorCam);
  }

  function handleClose() {
    setIsVisible(false);
  }

  return (
    <section className={`Settings ${isVisible ? "show" : ""}`}>
      {children}
      <div className="row">
        {mic && (
          <div className="input-field col s12">
            <label htmlFor="audio-inputs">Entrada de áudio (microfone):</label>
            <select
              id="audio-inputs"
              className="browser-default"
              onChange={handleChange}
            >
              {devices
                .filter((device) => device.kind === "audioinput")
                .map((device, i) => (
                  <option value={device.deviceId} key={i}>
                    {device.label}
                  </option>
                ))}
            </select>
          </div>
        )}

        {cam && (
          <>
            <div className="input-field col s12">
              <label htmlFor="video-inputs">Entrada de vídeo (câmera):</label>
              <select
                id="video-inputs"
                className="browser-default"
                onChange={handleChange}
              >
                {devices
                  .filter((device) => device.kind === "videoinput")
                  .map((device, i) => (
                    <option value={device.deviceId} key={i}>
                      {device.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className="input-field col s12">
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={mirrorCam}
                  onChange={handleMirror}
                />
                <span>Espelhar vídeo</span>
              </label>
            </div>
          </>
        )}
      </div>

      <button
        className="btn waves-effect waves-light blue"
        onClick={handleClose}
      >
        OK
      </button>
    </section>
  );
}

export default Settings;
