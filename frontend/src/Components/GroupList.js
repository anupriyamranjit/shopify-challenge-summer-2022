import React, {useState} from "react";
import '../App.css';
function GroupList() {
  const [items, setItems] = useState([{"name":"GroupOne","quantity":"1"}]);
  return (
    <div className="App">
        Group List Page
        {items.map((item,i) => <h1>{item.name}</h1>)}
    </div>
  );
}

export default GroupList;
