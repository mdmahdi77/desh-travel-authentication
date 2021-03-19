import React, { useEffect, useState } from 'react';
import Travel from '../Travel/Travel';
import './Home.css'
import data from '../../data/MOCK_DATA.json'

const Home = () => {
   const [travels, setTravels] = useState([])

   useEffect(() => {
       setTravels(data)
   },[])
    
    return (
        <div className="travelList">
            {
                travels.map(travel => <Travel travel={travel.id} travel={travel}></Travel>)
            }
        </div>
    );
};

export default Home;