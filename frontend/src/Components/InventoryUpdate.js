import React, {useState, useEffect} from "react";
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select, Button } from '@mui/material';
import '../App.css';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


function InventoryUpdate() {
  const [groups, setGroups] = useState();
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryQuantity, setInventoryQuantity] = useState(1);
  const [groupPicked, setGroupPicked] = useState("");
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/groups")
    .then((response) => setGroups(response.data))
    .catch((e) => console.error(e))
  },[]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/inventory/${id}`)
    .then((response) => {
        setInventoryName(response.data.name);
        setInventoryQuantity(response.data.quantity);
        setGroupPicked(response.data.group);
    })
  },[id])



  const handleSubmit = () => {
    let finalObject = {};
    if(groupPicked !== null || groupPicked !== ""){
      finalObject = {
        name: inventoryName,
        quantity: inventoryQuantity,
        group: groupPicked
      }
    } else {
      finalObject = {
        name: inventoryName,
        quantity: inventoryQuantity
      }
    }
    axios.patch(`http://localhost:8080/api/inventory/update/${id}`, finalObject)
    .then((response) => {
      if(response.status === 200)
      alert("Success")
      history(`/viewItems`);
    })
    .catch((e) => console.error(e))
  }
 
    

  return (
    <div className="App">
      <h1>Inventory Update</h1>
      <TextField id="outlined-basic" label="Name" value={inventoryName} variant="outlined" onChange={e => setInventoryName(e.target.value)} />
      <br/>
      <br/>
      <TextField id="outlined-basic" label="Quantity" variant="outlined" value={inventoryQuantity} onChange={e => setInventoryQuantity(e.target.value)} />
      <br/>
      <br/>
      <InputLabel id="demo-simple-select-label">Group</InputLabel>
      <Select
        style={{minWidth: 200}}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={groupPicked}
        label="Group"
        onChange={(e) => setGroupPicked(e.target.value)}
      >
         <MenuItem key={0} value={undefined}> None </MenuItem>
        {groups && groups.map((group,i) => <MenuItem key={i+1} value={group._id} > {group.name} </MenuItem>)}
      </Select>
      <br/>
      <br/>

      <Button variant="outlined" onClick={handleSubmit}>Submit</Button>

    </div>
  );
}

export default InventoryUpdate;