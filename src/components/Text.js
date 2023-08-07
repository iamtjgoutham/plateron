import React from 'react';

import "../App.css";


const Text = ({ onChange, value, id }) => <input id={id} className="margin" value={value} type="text" onChange={onChange}/>

export default React.memo(Text);
