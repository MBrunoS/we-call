import React from 'react';
import Video from './Video';

function VideoList ({list}) {
  const videos = list.map((call, i) => {
    return <Video srcObject={call.stream} key={i} autoPlay />;
  });

  return (
    <>
      {videos}
    </>
  )
}

export default VideoList;