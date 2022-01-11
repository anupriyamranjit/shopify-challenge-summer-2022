import './App.css';
import React from "react";
import InventoryAdd from './Components/InventoryAdd';
import InventoryList from './Components/InventoryList';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <InventoryAdd />
      <InventoryList/>
    </div>
      
  );
}

export default App;
