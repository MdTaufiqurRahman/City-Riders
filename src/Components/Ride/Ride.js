import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Ride.css';

const Ride = (props) => {
    const {image, ride_name} = props.rideType;
    const history = useHistory()
    const handleRide = () => {
        history.push(`/selectRide/${ride_name}`);
    }
    return (
        <div>
         <Card style={{ width: '15rem',
          height: '280px',
          padding:'20px',
          textAlign: 'center',
          marginTop: '100px'
          }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
          <Button onClick={handleRide} variant="danger">{ride_name} Ride</Button>
            
        </Card.Body>
      </Card>
        </div>
    );
};

export default Ride;
