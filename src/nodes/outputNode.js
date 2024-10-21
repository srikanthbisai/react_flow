import { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data = {}, onChange }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const height = data?.height || 140; 

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    onChange && onChange('outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    onChange && onChange('outputType', e.target.value);
  };

  const inputs = [{ id: 'value', position: Position.Left }];
  const outputs = [];

  return (
    <BaseNode
      id={id}
      data={{ outputName: currName, outputType }}
      nodeType="Output"
      inputs={inputs}
      outputs={outputs}
      styles={{ width: 220, height }}
      onChange={(name, value) => {
        if (name === 'outputName') setCurrName(value);
        if (name === 'outputType') setOutputType(value);
        onChange && onChange(name, value);
      }}
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
            value={outputType}
            onChange={handleTypeChange}
            style={{
              width: '100%',
              marginTop:"2px",
              padding: '8px',
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
