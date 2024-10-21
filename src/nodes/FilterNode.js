import { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const FilterNode = ({ id, data = {} }) => {
  const [filterCondition, setFilterCondition] = useState(data?.filterCondition || 'Condition');
  const height = data?.height || 100; // Adjust height for better spacing

  const handleConditionChange = (e) => {
    setFilterCondition(e.target.value);
  };

  const inputs = [{ id: 'input', handleType: 'target', position: Position.Left }];
  const outputs = [{ id: 'output', handleType: 'source', position: Position.Right }];

  return (
    <BaseNode
      id={id}
      data={{ filterCondition }}
      nodeType="Filter"
      inputs={inputs}
      outputs={outputs}
      styles={{ width: 220, height }}  // Set width for consistency
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ color: '#5f6368', fontSize: '12px', marginBottom: '4px' }}>
          Filter Condition:
        </label>
        <input 
          type="text" 
          value={filterCondition} 
          onChange={handleConditionChange} 
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
            ':focus': {
              borderColor: '#888',  // Subtle focus effect
            },
          }}
          onFocus={(e) => (e.target.style.borderColor = 'blue')}
          onBlur={(e) => (e.target.style.borderColor = 'gray')}
        />
      </div>
    </BaseNode>
  );
};
