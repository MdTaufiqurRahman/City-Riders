import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Data from '../../Data/Data.json';
import { Col, Row } from 'react-bootstrap';
import './SelectRide.css';
import icon from '../../Images/peopleicon.png';
import Map from '../Map/Map';

const SelectRide = () => {
    const [form, setForm] = useState(true);
    const { rideName } = useParams();
    const [dataDetails, setDataDetails] = useState([]);
    const [rideDetails, setRideDetails] = useState([]);
    const [pickFrom, setPickFrom] = useState('');
    const [pickTo, setPickTo] = useState('');
    useEffect(() => {
        setDataDetails(Data);

    }, [dataDetails])
    useEffect(() => {
        const details = dataDetails.filter(ride => ride.ride_name === rideName);
        console.log(details);
        setRideDetails(details);
    }, [dataDetails, rideName])

    const handleChange = (e) => {
        if (e.target.name === 'pickFrom') {
            setPickFrom(e.target.value);
        }
        if (e.target.name === 'pickTo') {
            setPickTo(e.target.value);
        }
    }
    let style ={
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '5px',
        border: '1px solid gray',
        marginLeft: '20px'
    }
    
    return (
        <div >
            <Row>
                <Col>
                    {form ? <div className="pick-ride-card mt-5">
                        <form>
                            <br />
                            <h5 style={{
                                marginLeft: '20px'
                            }} >Pick From</h5>
                            <input style={style} type="text" name="pickFrom" placeholder="Pick From" onBlur={handleChange} required />
                            <br />

                            <h5 style={{
                                marginLeft: '20px',
                                marginTop: '10px'
                            }}>Pick To</h5>

                            <input style={style} type="text" name="pickTo" placeholder="Pick To" onBlur={handleChange} required />
                            <br />

                            <input style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                borderRadius: '5px',
                                border: '1px solid gray',
                                marginTop: '15px',
                                marginLeft: '20px'
                            }} onClick={() => setForm(false)} type="button" value="Search" />
                        </form>

                    </div> :
                        <div style={{
                            backgroundColor: 'LightPink',
                            width: '320px',
                            height: '320px',
                            borderRadius: '5px',
                            marginLeft: '45px',

                        }} className="mt-5">
                            <div style={{
                                backgroundColor: 'maroon',
                                borderRadius: '5px',
                                padding: '10px',
                            }} >
                                <h4 style={{ color: 'white' }} >From: {pickFrom}</h4>
                                <h2 style={{ color: 'white' }} >|</h2>
                                <h4 style={{ color: 'white' }} >To: {pickTo}</h4>
                            </div>
                            {
                                rideDetails.map(ride => <div className="ride-details">
                                    <img style={{
                                        width: '30px',
                                        height: '30px',
                                    }} src={ride.image} alt="" />
                                    <h6>{ride.ride_name}</h6>
                                    <img src={icon} alt="" />
                                    <h6>{ride.capacity}</h6>
                                    <h6 style={{
                                        marginLeft: '50px'
                                    }} >${ride.price}</h6>
                                </div>)
                            }
                        </div>}
                </Col>
                <Col style={{ marginTop: '40px' }} >
                    <Map></Map>
                </Col>
            </Row>
        </div>
    );
};

export default SelectRide;