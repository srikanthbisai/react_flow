import { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const DebugNode = ({ id, data = {} }) => {
  const [debugInfo, setDebugInfo] = useState(data?.debugInfo || 'Debug Info');
  const height = data?.height || 100;

  const handleInfoChange = (e) => {
    setDebugInfo(e.target.value);
  };

  const inputs = [{ id: 'input', handleType: 'target', position: Position.Left }];
  const outputs = [];

  return (
    <BaseNode
      id={id}
      data={{ debugInfo }}
      nodeType="Debug"
      inputs={inputs}
      outputs={outputs}
      styles={{ width: 220, height }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ color: '#5f6368', fontSize: '12px' }}>
          Debug Info:
        </label>
        <input 
          type="text" 
          value={debugInfo} 
          onChange={handleInfoChange} 
          style={{
            width: '90%',
            margin:"auto",
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid gray',
            fontSize: '12px',
            backgroundColor: '#f9f9f9',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'blue')}
          onBlur={(e) => (e.target.style.borderColor = 'gray')}
        />
      </div>
    </BaseNode>
  );
};
