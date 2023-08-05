import React from 'react';

import "../App.css";


const Text = ({ onChange }) => <input className="margin" type="text" onChange={onChange}/>

export default React.memo(Text);
