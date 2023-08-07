import React from 'react';

import { sortByDisplayOrder } from '../helpers/common';

import "../App.css";

const Select = ({ options = [], value, onChange, id }) => {
    const sortedOptions = options.sort(sortByDisplayOrder);
    return (
        <select id={id} onChange={onChange} className="margin" value={value}>
            {sortedOptions?.map(item => <option id={id} key={item.DropDownValueID} value={item.DropDownValueID}>{item.ListItemName || ''}</option>)}
        </select>
    )
}

export default React.memo(Select);
