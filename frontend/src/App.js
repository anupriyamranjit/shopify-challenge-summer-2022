import './App.css';
import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select, Button } from '@mui/material';


function App() {
  const [groups, setGroups] = useState([]);
  const [groupPicked, setGroupPicked] = useState(0);
  const handleChange = (event) => {
    setGroupPicked(event.target.value);
  };
  return (
    <div className="App">
      <h1>Inventory</h1>
      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <br/>
      <br/>
      <TextField id="outlined-basic" label="Quantity" variant="outlined" />
      <br/>
      <br/>
      <InputLabel id="demo-simple-select-label">Group</InputLabel>
      <Select
        style={{minWidth: 200}}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={groupPicked}
        label="Group"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <br/>
      <br/>

      <Button variant="outlined">Submit</Button>

    </div>
  );
}

export default App;
