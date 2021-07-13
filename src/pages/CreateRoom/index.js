import Peer from "peerjs";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateRoomContext } from "../../context/CreateRoomContext";
import { RoomContext } from "../../context/RoomContext";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
import RadioList from "../../components/RadioList";
import CheckboxList from "../../components/CheckboxList";

function CreateRoom() {
  const { roomId, setRoomId, roomSettings, updateType, updateControls } =
    useContext(CreateRoomContext);
  const { setPeer, setRoomType } = useContext(RoomContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const typeList = [
    {
      prop: "semi-group",
      text: "Semi-grupo (os participantes só podem se comunicar com o anfitrião)",
    },
    { prop: "group", text: "Grupo (todos podem se comunicar entre si)" },
  ];

  const controlsList = [
    { prop: "mic", text: "Microfone" },
    { prop: "cam", text: "Câmera" },
    { prop: "screen", text: "Compartilhar tela" },
  ];

  function create(e) {
    e.preventDefault();
    const p = new Peer(roomId, { debug: 3 });

    setIsLoading(true);
    setRoomType(roomSettings.type);
    setPeer(p);

    p.on("open", (id) => {
      history.push(`room/${id}`, roomSettings.controls);
    });
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Form title="Opções da Sala" onSubmit={create} submitText="Criar">
      <div className="input-field col s12">
        <p>Tipo de sala:</p>
        <RadioList
          name="roomType"
          list={typeList}
          value={roomSettings.type}
          updateValue={updateType}
        />
      </div>

      <div className="input-field col s12">
        <p>Controles dos participantes:</p>
        <CheckboxList
          list={controlsList}
          values={roomSettings.controls}
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
