import { useState } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const ActionNode = ({ id, data = {} }) => {
  const [actionName, setActionName] = useState(data?.actionName || 'Action');
  const height = data?.height || 100;

  const handleNameChange = (e) => {
    setActionName(e.target.value);
  };

  const inputs = [{ id: 'trigger', handleType: 'target', position: Position.Left }];
  const outputs = [{ id: 'result', handleType: 'source', position: Position.Right }];

  return (
    <BaseNode
      id={id}
      data={{ actionName }}
      nodeType="Action"
      inputs={inputs}
      outputs={outputs}
      styles={{ width: 220, height }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ color: '#5f6368', fontSize: '12px' }}>
          Action Name:
        </label>
        <input 
          type="text" 
          value={actionName} 
          onChange={handleNameChange} 
          style={{
            width: '90%',
            margin:"auto",
            padding: '8px',
            borderRadius: '6px',
            border: '2px solid #D1C4E9',
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
