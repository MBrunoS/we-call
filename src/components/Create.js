import Peer from "peerjs";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RoomContext from "../contexts/roomContext";

function Create() {
  const { peer, setPeer } = useContext(RoomContext);
  const [roomId, setRoomId] = useState("");
  const [isCustomId, setIsCustomId] = useState(false);
  const [participantsControls, setParticipantsControls] = useState({
    mic: true,
    cam: true,
    screen: true,
  });
  const history = useHistory();

  useEffect(() => {
    if (peer !== null) {
      peer.on("open", (id) => {
        history.push(`room/${id}`, participantsControls);
      });
    }
  }, [peer]);

  function handleControls(e) {
    setParticipantsControls({
      ...participantsControls,
      [e.target.value]: e.target.checked,
    });
  }

  function handleEnableId() {
    if (isCustomId) {
      setIsCustomId(false);
      setRoomId("");
    } else {
      setIsCustomId(true);
    }
  }

  function handleId(e) {
    setRoomId(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setPeer(new Peer(roomId));
  }

  return (
    <section className="row">
      <div className="col s12 m8 offset-m2">
        <div className="card grey darken-2">
          <div className="card-content">
            <span className="card-title">Opções da Sala</span>
            <form className="row" onSubmit={handleSubmit}>
              <div className="input-field col s12">
                <p>Controles dos participantes:</p>
                <p>
                  <label>
                    <input
                      className="filled-in"
                      type="checkbox"
                      value="mic"
                      checked={participantsControls.mic}
                      onChange={handleControls}
                    />
                    <span className="white-text">
                      Microfone{" "}
                      {!participantsControls.mic &&
                        "(os participantes terão o microfone desativado)"}
                    </span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      className="filled-in"
                      type="checkbox"
                      value="cam"
                      checked={participantsControls.cam}
                      onChange={handleControls}
                    />
                    <span className="white-text">Câmera</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      className="filled-in"
                      type="checkbox"
                      value="screen"
                      checked={participantsControls.screen}
                      onChange={handleControls}
                    />
                    <span className="white-text">Compartilhar tela</span>
                  </label>
                </p>
              </div>
              <div className="input-field col s12">
                <p>ID da sala:</p>
                <p>
                  <label>
                    <input
                      className="with-gap"
                      type="radio"
                      name="id"
                      value="random"
                      checked={!isCustomId}
                      onChange={handleEnableId}
                    />
                    <span className="white-text">Aleatório</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      className="with-gap"
                      type="radio"
                      name="id"
                      value="defined"
                      checked={isCustomId}
                      onChange={handleEnableId}
                    />
                    <span className="white-text">Especificar ID</span>
                  </label>
                </p>
                <input
                  type="text"
                  id="roomId"
                  value={roomId}
                  onChange={handleId}
                  disabled={!isCustomId}
                  placeholder="ID da sala"
                />
              </div>
              <div className="input-field col s12">
                <button type="submit" className="btn blue">
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Create;
