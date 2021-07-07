import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <header className="App-header">
      <img
        src={process.env.PUBLIC_URL + "/logo512.png"}
        className="App-logo"
        alt="WeCall Logo"
      />
      <h3 className="flow-text">O que deseja fazer?</h3>
      <Link to="/create" className="blue waves-effect waves-light btn-large">
        Criar sala
      </Link>
      <Link to="/join" className="blue waves-effect waves-light btn-large">
        Entrar em sala
      </Link>
    </header>
  );
}

export default Home;
