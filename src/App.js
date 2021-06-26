import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import './App.css'
import Peer from 'peerjs';
import RoomContext from './contexts/roomContext'
import { useState } from "react"
import Create from './components/Create'
import Join from './components/Join'
import Room from './components/Room'
import CallEnded from "./components/CallEnded";

function App() {
  const [peer, setPeer] = useState(new Peer());
  const [cameraStream, setCameraStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  return (
    <RoomContext.Provider value={{peer, setPeer, cameraStream, setCameraStream, remoteStream, setRemoteStream}}>
      <div className="App container">
        <Router>
          <Switch>
            <Route path="/create">
              <Create />
            </Route>

            <Route path="/join">
              <Join />
            </Route>
            
            <Route path="/room/:id">
              <Room />
            </Route>
            
            <Route path="/call-end">
              <CallEnded />
            </Route>

            <Route path="/">
              <header className="App-header">
                <img src={process.env.PUBLIC_URL + '/logo512.png'} className="App-logo" alt="WeCall Logo" />
                <h3 className="flow-text">O que deseja fazer?</h3>
                <Link to="/create" className="blue waves-effect waves-light btn-large">
                  Criar sala
                </Link>
                <Link to="/join" className="blue waves-effect waves-light btn-large">
                  Entrar em sala
                </Link>
              </header>
            </Route>
            
          </Switch>
        </Router>
      </div>
    </RoomContext.Provider>
  );
}

export default App;
