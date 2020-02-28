import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
      

 export default App;