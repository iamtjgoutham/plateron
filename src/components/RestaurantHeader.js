import React from "react";

import { _head } from '../helpers/common';

import '../App.css';


const RestaurantHeader = ({ data }) => {
    const { PlantName, RestaurentID } = _head(data);
    return (
        <div className="restaurant">
            <h1>{PlantName}</h1>
            <h3>{RestaurentID}</h3>
        </div>
    );
};

export default RestaurantHeader;