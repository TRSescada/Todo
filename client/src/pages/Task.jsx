import { Grid } from '@mui/material';
import Block1 from '../components/Todos/block';
import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Task } from '../components/Todo/Task';

function Tasklist() {
  const [data,setData]=useState();
  const {state} = useLocation();
  const { id } = state;    
  const getTasks = async() => {
    try {

      const response = await axios.get(`http://localhost:8080/api/me/task/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const responseData = response.data;
      setData(responseData);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  }
  useEffect(() => {
    getTasks();
  }, [])
  console.log(data);
  return (
    <Grid
      sx={{
        px: 4,
        mt:4 
      }}
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={4}
    >
      <Grid item xs={12}>
      {data?.length > 0 ? <Task tasks={data}/> : <p>Loading...</p>}
      </Grid>
    </Grid>
  );
}

export default Tasklist;
