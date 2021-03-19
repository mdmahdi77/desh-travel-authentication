import React from 'react';
import { useHistory } from 'react-router';
import './Travel.css'

const Travel = (props) => {
    const history = useHistory()
    
    const handleTravel = (id) =>{
        history.push(`/travel/${id}`)
    }
    const {img, title, id} = props.travel
    return (
        <div className="Travels">
            <img src={img} className="img" alt=""/>
            <h2>{title}</h2>
            <button className="mainBtn" onClick={() =>handleTravel(id)}>Buy Ticket</button>
        </div>
    );
};

export default Travel;