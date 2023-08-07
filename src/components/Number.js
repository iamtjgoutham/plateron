import React from 'react';

import "../App.css";


const Number = ({ value, onChange, id }) => <input id={id} className="margin" value={value} onChange={onChange} type="number" min={0} max={100} />

export default React.memo(Number);
