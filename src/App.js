import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import Create from './components/Create';
import Join from './components/Join';
import Room from './components/Room/Room';
import RoomProvider from './contexts/RoomProvider';
import CallEnded from './components/CallEnded';

function App() {
  return (
    <div className="App container">
      <RoomProvider>
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
      </RoomProvider>
    </div>
  );
}

export default App;
