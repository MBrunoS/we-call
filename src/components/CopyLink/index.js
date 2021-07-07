import React from "react";
import { useParams } from "react-router-dom";

function CopyLink() {
  const { id: roomId } = useParams();

  function handleCopy() {
    const copyText = document.getElementById("room-id");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
  }

  return (
    <>
      <div className="row">
        <div className="col s12 m3">
          <p>Link da sala:</p>
        </div>
        <div className="col s9 m6">
          <input
            type="text"
            readOnly
            id="room-id"
            value={`${window.location.origin}/room/${roomId}`}
          />
        </div>
        <div className="col s3">
          <button className="blue waves-effect btn" onClick={handleCopy}>
            Copiar Link
          </button>
        </div>
      </div>
    </>
  );
}

export default CopyLink;
