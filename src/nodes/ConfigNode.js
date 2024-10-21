import { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const ConfigNode = ({ id, data = {} }) => {
  const [configName, setConfigName] = useState(data?.configName || 'Config');
  const [configValue, setConfigValue] = useState(data?.configValue || '');
  const height = data?.height || 140; // Adjusted height for better spacing

  const handleNameChange = (e) => setConfigName(e.target.value);
  const handleValueChange = (e) => setConfigValue(e.target.value);

  const inputs = [];
  const outputs = [{ id: 'config', handleType: 'source', position: Position.Right }];

  return (
    <BaseNode
      id={id}
      data={{ configName, configValue }}
      nodeType="Config"
      inputs={inputs}
      outputs={outputs}
      styles={{ width: 220, height }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '10px',
          height: '100%', 
          width: '100%',
          padding: '10px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '100%' }}>
          <label style={{ color: '#5f6368', fontSize: '12px' }}>Config Name:</label>
          <input
            type="text"
            value={configName}
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
          <label style={{ color: '#5f6368', fontSize: '12px' }}>Config Value:</label>
          <input
            type="text"
            value={configValue}
            onChange={handleValueChange}
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
      </div>
    </BaseNode>
  );
};
