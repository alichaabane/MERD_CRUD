import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";

function App() {
  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);
  const [isInserted, setIsInserted] = useState(false);
  const [foodList, setFoodList] = useState([]);

  useEffect( () => {
    Axios.get('http://localhost:3002/getFoods').then((response) => {
      setFoodList(response.data);
    });
  }, [])
 let addToList = () => {
    Axios.post('http://localhost:3002/addFood', {foodName, days}).then(  (res) =>  {
      console.log('result : ', res.status);
      if (res.status === 200) {
        setIsInserted(true);
        setTimeout(() => {
          setIsInserted(false);
      }, 2000);
      }
    }
    ).catch (err => {
      console.error('error : ', err);
      setIsInserted(false);
    }) ;

  }

  return (
    <div className="App">
      
      <h1> CRUD App with MERN : </h1>
      <Form>
        <Form.Group className="mb-3" controlId="formFoodName">
          <Form.Label>Food Name : </Form.Label>
          <Form.Control type="email" onChange={(event) => {
            setFoodName(event.target.value);
          }} placeholder="Food Name" />
     
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDays">
          <Form.Label>Days since you Ate it : </Form.Label>
          <Form.Control type="number" min="0" onChange={(event) => {
            setDays(event.target.value);
          }} placeholder="Days since you Ate it" />
        </Form.Group>
        <Button onClick={addToList}  variant="success">
          Add to List
        </Button>
        <Alert  className="mt-4" show={isInserted === true}  variant="success">check it out!</Alert> 

        <div className="mt-3">
          <h2>Food List : </h2>
            {
              foodList.map((val, key) => {
                return ( <div key={key}>
                  <span>
                    {val.foodName}
                  </span>
                    <span className="mx-2">
                    - Days : {val.daysSinceIAte}
                  </span>
                </div>
              );
              })
            }
        </div>
      </Form>
    </div>
  );
}

export default App;
