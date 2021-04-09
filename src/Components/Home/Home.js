import React, { useEffect, useState } from 'react';
import Data from '../../Data/Data.json';
import Ride from '../Ride/Ride';
import { Container } from 'react-bootstrap';
import './Home.css';

const Home = () => {
    const [rideType, setRideType] = useState([]);
    useEffect(() => {
        setRideType(Data);
    }, []);
    return (
        <div>
            <Container>
            <div className="row" style={{
                columnGap:'20px',
                marginLeft:'50px',
            }} >
            {
                rideType.map(rideType => <Ride rideType = {rideType}> </Ride> )
            }
            </div>
            </Container>
            
        </div>
    );
};

export default Home;