import React from 'react';

import { sortByDisplayOrder } from '../helpers/common';

import "../App.css";

const Select = ({ options = [], value, onChange }) => {
    const sortedOptions = options.sort(sortByDisplayOrder);
    return (
        <select className="margin">
            {sortedOptions?.map(item => <option onChange={onChange} key={item.DropDownValueID} value={value}>{item.ListItemName || ''}</option>)}
        </select>
    )
}

export default React.memo(Select);
