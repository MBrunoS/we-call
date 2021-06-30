/*
  Helper methods for handling with media streams
*/

export async function getUserMedia () {
  return navigator.mediaDevices.getUserMedia({video: true, audio: true});
}

export async function getScreen () {
  return navigator.mediaDevices.getDisplayMedia({video: true});
}

export function endMediaStream (stream) {
  const tracks = stream.getTracks();
  tracks.forEach(function(track) {
    track.stop();
  });
}

// Replace the video being sent on the call
export function replaceVideo (stream, call) {
  const newVideoTrack = stream.getVideoTracks()[0];
  call.peerConnection.getSenders()[1].replaceTrack(newVideoTrack);
}

export function toggleAudio (stream, call) {
  if (call) {
    call.peerConnection.getSenders()[0].track.enabled = !call.peerConnection.getSenders()[0].track.enabled
  } else {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
  }
}

export function toggleVideo (stream, call) {
  if (call) {
    call.peerConnection.getSenders()[1].track.enabled = !call.peerConnection.getSenders()[1].track.enabled
  } else {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
  }
}

const stream = { getUserMedia, getScreen, endMediaStream, replaceVideo, toggleAudio, toggleVideo };

export default stream;