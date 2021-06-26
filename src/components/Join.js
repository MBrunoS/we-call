import { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Join () {
  const [roomId, setRoomId] = useState(null)

  function handleConnect () {
    setRoomId(document.getElementById('room-id').value);
  }

  return (
    <div className="row">
      <div className="col s12">
        {roomId ? (
          <Redirect push to={`room/${roomId}`} />
        ) : (
          <div className="input-field col s12">
            <input placeholder="Cole aqui o ID da sala" id="room-id" type="text" />
            <button className="blue waves-effect btn" onClick={handleConnect}>Conectar</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Join;
