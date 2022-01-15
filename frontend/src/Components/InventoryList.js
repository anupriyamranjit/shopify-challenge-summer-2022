import React, {useState, useEffect} from "react";
import '../App.css';
import axios from "axios"
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function InventoryList() {
  const [items, setItems] = useState();
  useEffect(() => {
      axios.get("http://localhost:8080/api/inventory")
      .then((response) => setItems(response.data))
      console.log(items)
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/inventory/${id}`)
    .then((response) => console.log(response))
  }

  return (
    <div className="App">
        {items && items.map((item,i) =>
          (<>
          <IconButton>
            <CloseIcon onClick={() => handleDelete(item._id)}/>
          </IconButton>
            <p key={i} > {item.name}  { item.hasOwnProperty('group') && "in Group " + item.group.name} : {item.quantity}</p>
          </>)
        )}
    </div>
  );
}

export default InventoryList;
