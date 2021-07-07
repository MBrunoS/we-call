import Peer from "peerjs";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateRoomContext } from "../../context/CreateRoomContext";
import { RoomContext } from "../../context/RoomContext";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
import CheckboxList from "../../components/CheckboxList";

function CreateRoom() {
  const { roomId, setRoomId, roomControls, updateControls } =
    useContext(CreateRoomContext);
  const { setPeer } = useContext(RoomContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const list = [
    { prop: "mic", text: "Microfone" },
    { prop: "cam", text: "Câmera" },
    { prop: "screen", text: "Compartilhar tela" },
  ];

  function create(e) {
    e.preventDefault();
    const p = new Peer(roomId);

    setIsLoading(true);
    setPeer(p);

    p.on("open", (id) => {
      history.push(`room/${id}`, roomControls);
    });
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Form title="Opções da Sala" onSubmit={create} submitText="Criar">
      <div className="input-field col s12">
        <p>Controles dos participantes:</p>
        <CheckboxList
          list={list}
          values={roomControls}
          updateValues={updateControls}
        />
      </div>

      <div className="input-field col s12">
        <label htmlFor="roomId">
          ID da sala (deixe em branco parar gerar um ID aleatório):
        </label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="ID da sala"
        />
      </div>
    </Form>
  );
}

export default CreateRoom;
