import { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data = {}, onChange }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const height = data?.height || 140; 

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    onChange && onChange('inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    onChange && onChange('inputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={{ inputName: currName, inputType }}
      nodeType="Input"
      inputs={[]}
      outputs={[{ id: 'value', handleType: 'source', position: Position.Right }]}
      styles={{ height }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          padding: '10px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '100%' }}>
          <label style={{ color: '#5f6368', fontSize: '12px' }}>Name:</label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={{
              width: '100%',
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

        <div style={{ width: '100%' }}>
          <label style={{ color: '#5f6368', fontSize: '12px' }}>Type:</label>
          <select
            value={inputType}
            onChange={handleTypeChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop:"2px",
              borderRadius: '6px',
              border: '1px solid gray',
              fontSize: '12px',
              backgroundColor: '#f9f9f9',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              appearance: 'none', 
            }}
            onFocus={(e) => (e.target.style.borderColor = 'blue')}
            onBlur={(e) => (e.target.style.borderColor = 'gray')}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
