import React , {useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Task() {
  const { taskId } = useParams();

  const [dataForMapping, setDataForMapping] = useState([]);

  useEffect(() => {
      fetchData(taskId);
  }, []);


  const fetchData = (taskId) => {
      axios.get(`http://localhost:4000/todo/${taskId}`)
          .then((response) => {
              setDataForMapping(response.data)
          })
          .catch((error) => {
              console.error("Err:", error);
          });
  };

  console.log(dataForMapping);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <h1>
          Title: {dataForMapping.title}
        </h1>
        <h4>
        Description: {dataForMapping.description}
        </h4>
        <h4>Id: {dataForMapping.id}</h4>
      </CardContent>
    </Card>
  );
}

export default Task;