import React from "react";
import { useHistory } from "react-router";
import Form from "../../components/Form";

function JoinRoom() {
  const history = useHistory();

  function join() {
    const roomId = document.getElementById("room-id").value;
    history.push(`room/${roomId}`);
  }

  return (
    <Form title="Entrar na Sala" onSubmit={join} submitText="Entrar">
      <div className="input-field col s12">
        <input placeholder="Cole aqui o ID da sala" id="room-id" type="text" />
      </div>
    </Form>
  );
}

export default JoinRoom;
