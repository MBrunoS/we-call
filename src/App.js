import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Room from "./pages/Room";
import { CreateRoomProvider } from "./context/CreateRoomContext";
import { RoomProvider } from "./context/RoomContext";
import CallEnded from "./pages/CallEnded";

function App() {
  return (
    <div className="App container">
      <Router>
        <RoomProvider>
          <Switch>
            <Route path="/create">
              <CreateRoomProvider>
                <CreateRoom />
              </CreateRoomProvider>
            </Route>

            <Route path="/join">
              <JoinRoom />
            </Route>

            <Route path="/room/:id">
              <Room />
            </Route>

            <Route path="/call-end">
              <CallEnded />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </RoomProvider>
      </Router>
    </div>
  );
}

export default App;
