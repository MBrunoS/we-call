async function getUserMedia(constraints = { video: true, audio: true }) {
  return navigator.mediaDevices.getUserMedia(constraints);
}

async function getScreen(constraints = { video: true }) {
  return navigator.mediaDevices.getDisplayMedia(constraints);
}

function endMediaStream(stream) {
  const tracks = stream.getTracks();
  tracks.forEach(function (track) {
    track.stop();
  });
}

// Replace the video being sent on the call
function replaceAudio(newStream, oldStream, call) {
  const newAudioTrack = newStream.getAudioTracks()[0];
  if (call) {
    call.peerConnection.getSenders()[0].replaceTrack(newAudioTrack);
  } else {
    oldStream.removeTrack(oldStream.getAudioTracks()[0]);
    oldStream.addTrack(newAudioTrack);
  }
}

// Replace the audio being sent on the call
function replaceVideo(newStream, oldStream, call) {
  const newVideoTrack = newStream.getVideoTracks()[0];
  if (call) {
    call.peerConnection.getSenders()[1].replaceTrack(newVideoTrack);
  } else {
    oldStream.removeTrack(oldStream.getVideoTracks()[0]);
    oldStream.addTrack(newVideoTrack);
  }
}

function toggleAudio(stream, call) {
  if (call) {
    call.peerConnection.getSenders()[0].track.enabled =
      !call.peerConnection.getSenders()[0].track.enabled;
  } else {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
  }
}

function toggleVideo(stream, call) {
  if (call) {
    call.peerConnection.getSenders()[1].track.enabled =
      !call.peerConnection.getSenders()[1].track.enabled;
  } else {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
  }
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

const utils = {
  endMediaStream,
  getScreen,
  getUserMedia,
  replaceAudio,
  replaceVideo,
  toggleAudio,
  toggleVideo,
  isMobile,
};

export default utils;
