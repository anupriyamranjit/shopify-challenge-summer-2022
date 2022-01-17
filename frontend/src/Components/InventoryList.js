import React, {useState, useEffect} from "react";
import '../App.css';
import axios from "axios"
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


function InventoryList() {
  const [items, setItems] = useState();
  const history = useNavigate();

  useEffect(() => {
      axios.get("http://localhost:8080/api/inventory")
      .then((response) => setItems(response.data))
      console.log(items)
  }, [])

  const handleDelete = (id) => {
    history(`/deleteItem/${id}`);
  }
  const handleUpdate = (id) => {
    history(`/updateItem/${id}`);
  }

  return (
    <div className="App">
      <h1>Inventory List</h1>
        {items && items.map((item,i) =>
          (<>
          <IconButton>
            <CloseIcon onClick={() => handleDelete(item._id)}/>
          </IconButton>
          <IconButton>
            <EditIcon onClick={() => handleUpdate(item._id)}/>
          </IconButton>
            <p key={i} > {item.name}  { item.hasOwnProperty('group') && "in Group " + item.group.name} : {item.quantity}</p>
          </>)
        )}
    </div>
  );
}

export default InventoryList;
