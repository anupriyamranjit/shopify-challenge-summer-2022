import React, {useState, useEffect} from "react";
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select, Button } from '@mui/material';
import '../App.css';
import axios from "axios";


function InventoryAdd() {
  const [groups, setGroups] = useState();
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryQuantity, setInventoryQuantity] = useState(1);
  const [groupPicked, setGroupPicked] = useState(0);

  const handleSubmit = () => {
    console.log(groupPicked);
    let finalObject = {};
    if(groupPicked != null){
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
    console.log(finalObject);
    axios.post("http://localhost:8080/api/inventory/addItem", finalObject)
    .then((response) => console.log(response))
    .catch((e) => console.error(e))
  }
  useEffect(() => {
    axios.get("http://localhost:8080/api/groups")
    .then((response) => setGroups(response.data))
    .catch((e) => console.error(e))
  },[]);
    

  return (
    <div className="App">
      <h1>Inventory</h1>
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
        {groups && groups.map((group,i) => <MenuItem key={i} value={group._id} > {group.name} </MenuItem>)}
      </Select>
      <br/>
      <br/>

      <Button variant="outlined" onClick={handleSubmit}>Submit</Button>

    </div>
  );
}

export default InventoryAdd;
