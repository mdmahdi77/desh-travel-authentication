import React from 'react';
import { Link } from 'react-router-dom';
import './FormList.css'



const FormList = (props) => {
    
    return (
        <div>
            <h1>{props.locations?.title}</h1>
             <div className="formList">
                    <label>Pick From</label>
                    <br/>
                    <input type="text" name=""/>
                    <br/>
                    <label>Pick To</label>
                    <br/>
                    <input type="text" name=""/>
                    <br/>
                    <button className="mainBtn"><Link to={`/search/${props.locations?.id}`}>Search</Link></button>
            </div>
        </div>
    );
};

export default FormList;