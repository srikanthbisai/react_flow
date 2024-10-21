import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data = {} }) => {
  const height = data?.height || 120;

  const inputs = [
    { id: 'system', position: Position.Left },
    { id: 'prompt', position: Position.Left },
  ];

  const outputs = [
    { id: 'response', position: Position.Right }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      nodeType="LLM"
      inputs={inputs}
      outputs={outputs}
      styles={{ width: 220, height }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#444' }}>LLM Node</span>
        <span style={{ fontSize: '12px', color: '#5f6368' }}>This is an LLM node.</span>
      </div>
    </BaseNode>
  );
};
