import axios from "axios";
import React, { useState, useEffect } from "react";
import '../App.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

function GroupList() {
  const [items, setItems] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    async function fetch() {
      const groups = await axios.get("http://localhost:8080/api/groups");
      setItems(groups.data)
    }
    fetch()
}, [])
const handleDelete = async (id) => {
  await axios.delete(`http://localhost:8080/api/groups/${id}`)
}
const handleUpdate = (id) => {
  history(`/updateGroup/${id}`);
}
  return (
    <div className="App">
        Group List Page
        <br/>
        <br/>
        {items.map((item,i) => (
    <>
    <IconButton>
            <CloseIcon onClick={() => handleDelete(item._id)}/>
          </IconButton>
          <IconButton>
            <EditIcon onClick={() => handleUpdate(item._id)}/>
          </IconButton>
        <h1>{item.name}</h1>
    </>
        ))}
    </div>
  );
}

export default GroupList;
