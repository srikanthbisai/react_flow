import { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const DisplayNode = ({ id, data = {} }) => {
  const [displayText, setDisplayText] = useState(data?.displayText || 'Display');
  const height = data?.height || 100;

  const handleTextChange = (e) => {
    setDisplayText(e.target.value);
  };

  const inputs = [{ id: 'input', handleType: 'target', position: Position.Left }];
  const outputs = [];

  return (
    <BaseNode
      id={id}
      data={{ displayText }}
      nodeType="Display"
      inputs={inputs}
      outputs={outputs}
      styles={{ width: 220, height }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ color: '#5f6368', fontSize: '12px' }}>
          Display Text:
        </label>
        <input 
          type="text" 
          value={displayText} 
          onChange={handleTextChange} 
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
