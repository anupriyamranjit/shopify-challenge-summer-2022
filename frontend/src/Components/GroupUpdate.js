import React, {useState, useEffect} from "react";
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select, Button } from '@mui/material';
import '../App.css';
import axios from "axios";
import { useParams } from "react-router-dom";


function InventoryUpdate() {
  const [groupName, setGroupName] = useState("");
  const { id } = useParams();

useEffect(() => {
    async function fetch(){
        let group = await axios.get(`http://localhost:8080/api/groups/${id}`);
        setGroupName(group.data.name);
        console.log(group)
    }
    fetch()
},[])

  const handleSubmit = async () => {
      let finalObject = {
        groupname: groupName,
      }
    await axios.patch(`http://localhost:8080/api/groups/update/${id}`, finalObject)
  }
 
    

  return (
    <div className="App">
      <h1>Group Update</h1>
      <TextField id="outlined-basic" label="Name" value={groupName} variant="outlined" onChange={e => setGroupName(e.target.value)} />
      <br/>
      <br/>
      <Button variant="outlined" onClick={handleSubmit}>Submit</Button>

    </div>
  );
}

export default InventoryUpdate;