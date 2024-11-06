import React from 'react';
import { SubmitButton } from '../submit'; 

function Navbar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding:"0 40px", alignItems: 'center',background:"black", color:"white", fontFamily:"serif", letterSpacing:"1px"
     }}>
      <h1>React Flow</h1> 
      <SubmitButton /> 
    </div>
  );
}

export default Navbar;
