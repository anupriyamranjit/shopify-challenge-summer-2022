import React, {useState, useEffect} from "react";
import '../App.css';
import axios from "axios"
function InventoryList() {
  const [items, setItems] = useState();
  useEffect(() => {
      axios.get("http://localhost:8080/api/inventory")
      .then((response) => setItems(response.data))
  }, [])

  return (
    <div className="App">
        {items && items.map((item,i) => <h1 key={i} >{item.name} : {item.quantity}</h1>)}
    </div>
  );
}

export default InventoryList;
