import React from 'react';

import "../App.css";


const Label = ({ value, id }) => <label id={id} className="margin">{value}</label>

export default React.memo(Label);
