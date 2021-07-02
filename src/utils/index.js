import {
  endMediaStream,
  getScreen,
  getUserMedia,
  replaceVideo,
  toggleAudio,
  toggleVideo,
} from "./MediaStream";

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

const utils = {
  endMediaStream,
  getScreen,
  getUserMedia,
  replaceVideo,
  toggleAudio,
  toggleVideo,
  isMobile,
};

export default utils;
