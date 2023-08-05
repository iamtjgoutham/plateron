import React from 'react';

import "../App.css";


const Label = ({ value }) => <label className="margin">{value}</label>

export default React.memo(Label);
