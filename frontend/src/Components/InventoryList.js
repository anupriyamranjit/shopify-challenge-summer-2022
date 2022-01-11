import React, {useState} from "react";
import '../App.css';
function InventoryList() {
  const [items, setItems] = useState([{"name":"Table","quantity":"1"}]);
  return (
    <div className="App">
        {items.map((item,i) => <h1>{item.name} : {item.quantity}</h1>)}
    </div>
  );
}

export default InventoryList;
