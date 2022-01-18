import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import '../App.css';
import axios from "axios";
import { useNavigate } from "react-router";

function GroupAdd() {
  const [groupName, setGroupName] = useState("")
  const history = useNavigate();
  const handleSubmit = (event) => {
    axios.post("http://localhost:8080/api/groups/addGroup",{
      name: groupName
    })
    .then((response) => {
      if(response.status === 200){
        alert("Success")
        history("/viewGroups")
      }
    })
    .catch((e) => console.error(e))
  };
  return (
    <div className="App">
      <h1>Group Add Page</h1>
      <TextField 
        id="outlined-basic" 
        value={groupName} 
        label="Group Name" 
        onChange={(e) => setGroupName(e.target.value)} 
        variant="outlined" />
      <br/>
      <br/>
      <Button variant="outlined" onClick={handleSubmit}>Submit</Button>

    </div>
  );
}

export default GroupAdd;
