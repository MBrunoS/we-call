import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RoomContext from '../contexts/roomContext';

function Create () {
  const { peer } = useContext(RoomContext);

  return (
    <div className="row">
      <div className="col s12">
        {peer.id ? (
          <Redirect to={`room/${peer.id}`} />
        ) : (
          <p>Gerando ID...</p>
        )}
      </div>
    </div>
  )
}

export default Create;
