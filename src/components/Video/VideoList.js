import React, { useEffect } from "react";
import Video from ".";

function VideoList({ list }) {
  let cols = 1,
    rows = 1;

  if (list.length >= 10) {
    cols = 5;
    rows = Math.floor(list.length / 5);
  } else if (list.length > 2) {
    cols = Math.ceil(list.length / 2);
    rows = 2;
  } else {
    cols = list.length;
    rows = 1;
  }

  const container = document.querySelector(".App");
  // The gap between videos is 0.5rem = 8px (4px each side)
  const width = container.clientWidth / cols - 4;
  const height = container.clientHeight / rows - 4;

  useEffect(() => {
    const videoList = document.querySelector(".Video-List");
    videoList.style.setProperty("--cols", cols);
    videoList.style.setProperty("--rows", rows);
  }, [cols]);

  const videos = list.map((call, i) => {
    return (
      <div className="Video-List-item" key={i} style={{ width, height }}>
        <Video srcObject={call.stream} autoPlay />
      </div>
    );
  });

  return <section className="Video-List">{videos}</section>;
}

export default VideoList;
