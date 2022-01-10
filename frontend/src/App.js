import './App.css';
import React from "react";
import InventoryAdd from './Components/InventoryAdd';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/users" component={InventoryAdd} />
    </Router>
  );
}

export default App;
