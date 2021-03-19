import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MapArea from '../../MapArea/MapArea';
import FormList from '../FormList/FormList';
import './TravelLocation.css'
import data from '../../data/MOCK_DATA.json'


const TravelLocation = () => {
    const {id} = useParams()

    const [location, setLocation] = useState([])
    useEffect(() => {
        setLocation(data)
    },[])

    const locations = location.find(locate => locate.id == id)
    
    return (
        <div className="twin-container">
            <div className="form-container">
            <FormList locations={locations}></FormList>
            </div>
            <div className="location-container">
                <MapArea></MapArea>
            </div>
        </div>
    );
};

export default TravelLocation;