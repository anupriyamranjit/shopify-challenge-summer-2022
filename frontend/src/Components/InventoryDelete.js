import React, {useState, useEffect} from "react";
import { Button } from '@mui/material';
import '../App.css';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

function InventoryDelete() {
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryQuantity, setInventoryQuantity] = useState(0);
  const [inventoryGroup, setInventoryGroup] = useState("");
  const [quantityToDelete, setQuantityToDelete] = useState(0);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
        const item = await axios.get(`http://localhost:8080/api/inventory/${id}`);
        setInventoryName(item.data.name);
        setInventoryQuantity(item.data.quantity);
        if(item.data.group !== undefined){
          const group = await axios.get(`http://localhost:8080/api/groups/${item.data.group}`);
          setInventoryGroup(group.data.name);
        }
      }
    fetchData();
  },[id])



  const handleSubmit = async () => {
    let deleted = await axios.delete(`http://localhost:8080/api/inventory/${id}/${quantityToDelete}`)
    if(deleted.status === 200){
      alert("Success")
      history("/viewItems")
    }
  }


    

  return (
    <div className="App">
      <h1>Inventory Delete</h1>
      <h1> Name: {inventoryName}</h1>
      <br/>
      <br/>
      <h1>Quantity: {inventoryQuantity}</h1>
      <br/>
      <br/>
      <h1>Group: {inventoryGroup}</h1>
      <br/>
      <br/>
      <h1>Quantity to Delete:</h1> 
      <TextField id="outlined-basic" label="Quantity" variant="outlined" value={quantityToDelete} onChange={e => setQuantityToDelete(e.target.value)} />
      <br/>
      <br/>
      <Button variant="outlined" onClick={handleSubmit}>Submit</Button>

    </div>
  );
}

export default InventoryDelete;