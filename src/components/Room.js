import { useContext, useEffect, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import Draggable from 'react-draggable';
import utils from '../utils/';
import RoomContext from '../contexts/roomContext';
import Owner from './Room/Owner';
import Visitor from './Room/Visitor';
import Video from './Video/Video';
import Toolbar from './Toolbar/Toolbar';
import Settings from './Settings/Settings';
import SettingsProvider from '../contexts/SettingsProvider';

function Room () {
  const {
    peer,
    localStream, setLocalStream,
    screenStream, setScreenStream,
    calls,
  } = useContext(RoomContext);
  
  const { id: roomId } = useParams();
  const [isPeerOpen, setIsPeerOpen] = useState(!!peer.id);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    if (!isPeerOpen) {
      peer.on('open', () => {
        setIsPeerOpen(true);
      });
    } else {
      utils.getUserMedia().then((stream) => {
        setLocalStream(stream);
        window.localStream = stream;
      });
    }

  }, [isPeerOpen]);

  function handleMic () {
    if (calls.length > 0) {
      // Since the audio sender is the same for all the calls, we just toggle it once
      utils.toggleAudio(null, calls[0]);
    } else {
      utils.toggleAudio(localStream);
    }
  }

  function handleCam () {
    if (calls.length > 0) {
      // Since the video sender is the same for all the calls, we just toggle it once
      utils.toggleVideo(null, calls[0]);
    } else {
      utils.toggleVideo(localStream);
    }
  }
  
  function handleScreenShare () {
    if (!screenStream) {
      utils.getScreen().then((stream) => {

        calls.forEach(call => utils.replaceVideo(stream, call) );

        // Must do this here because the user can stop the sharing through browser dialog
        const screenStreamTrack = stream.getVideoTracks()[0];
        screenStreamTrack.addEventListener('ended', () => {
          utils.replaceVideo(localStream, calls[0]);
          setScreenStream(null);
        });

        setScreenStream(stream);
      }, (err) => {
        console.log(err);
      });
    } else {
      utils.replaceVideo(localStream, calls[0]);
      utils.endMediaStream(screenStream);
      setScreenStream(null);
    }
  }

  function handleCallEnd () {
    // manually close the peer connections
    for (let conns in peer.connections) {
      peer.connections[conns].forEach((conn) => {
        conn.close();
      });
    }
    
    utils.endMediaStream(localStream);
    setCallEnded(true);
    setLocalStream(null);
    setScreenStream(null);
  }

  return callEnded ? (
    <Redirect push to="/call-end" />
  ) : (localStream && (
    <>
      <div className="row">
        { peer.id === roomId ? (
          <Owner />
        ) : (
          <Visitor />
        )}

        <SettingsProvider>
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            <Toolbar
              handleMic={handleMic}
              handleCam={handleCam}
              handleScreenShare={handleScreenShare}
              handleCallEnd={handleCallEnd}
            />
            <Settings />
          </div>
        </SettingsProvider>
      </div>
      <Draggable bounds="body">
        {screenStream ? (
          <Video className="local-video" srcObject={screenStream} autoPlay muted />
        ) : (
          <Video className="local-video" srcObject={localStream} autoPlay muted />
        )}
      </Draggable>
    </>
  ))
}

export default Room;
