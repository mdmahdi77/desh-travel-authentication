import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import data from '../../data/MOCK_DATA.json'
import './SearchLocation.css'

const SearchLocation = () => {
    const {searchId} = useParams()

    const [search, setSearch] = useState([])
    useEffect(() => {
        setSearch(data)
    },[])
    
    const searchDetails = search.find(sea => sea.id == searchId)
    
    return (
        <div className="searchItem">
            <h1 className="headerStyle">{searchDetails?.title}</h1>
            <img src={searchDetails?.img} alt=""/>
            <h3 className="headerStyle">User: <span>{searchDetails?.user}</span></h3>
            <h3  className="headerStyle">Total Price: <span>${searchDetails?.price}</span></h3>
        </div>
    );
};

export default SearchLocation;