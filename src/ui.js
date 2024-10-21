import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { DisplayNode } from './nodes/DisplayNode';
import { FilterNode } from './nodes/FilterNode';
import { DebugNode } from './nodes/DebugNode';
import { ConfigNode } from './nodes/ConfigNode';
import { ActionNode } from './nodes/ActionNode';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  display: DisplayNode,
  filter: FilterNode,
  debug: DebugNode,
  config: ConfigNode,
  action: ActionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect: originalOnConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData('application/reactflow');

      try {
        const { nodeType } = JSON.parse(data);
        if (!nodeType) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(nodeType);
        const newNode = {
          id: nodeID,
          type: nodeType,
          position,
          data: getInitNodeData(nodeID, nodeType),
        };

        addNode(newNode);
      } catch (error) {
        console.error('Invalid drop data:', error);
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleConnect = useCallback(
    (params) => {
      setHighlightedNodes((prev) => new Set([...prev, params.source, params.target]));
      originalOnConnect(params);

      setTimeout(() => {
        setHighlightedNodes((prev) => {
          const updated = new Set(prev);
          updated.delete(params.source);
          updated.delete(params.target);
          return updated;
        });
      }, 2000);
    },
    [originalOnConnect]
  );

  const handleNodeMouseEnter = useCallback((node) => {
    setHighlightedNodes((prev) => new Set(prev).add(node.id));
  }, []);



  const handleNodeMouseLeave = useCallback((node) => {
    setHighlightedNodes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(node.id);
      return newSet;
    });
  }, []);

  const styledNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        highlighted: highlightedNodes.has(node.id),
      })),
    [nodes, highlightedNodes]
  );

  const styledEdges = useMemo(
    () =>
      edges.map((edge) => ({
        ...edge,
        style: { stroke: '#1B6CA8', strokeWidth: 2 }, // Custom edge color 
      })),
    [edges]
  );

  const connectionLineStyle = {
    stroke: 'teal', // Ocean blue for connection preview
    strokeWidth: 2,
    strokeDasharray: '5 5',
  };

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '70vh' }}>
      <ReactFlow
        nodes={styledNodes}
        edges={styledEdges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        connectionLineStyle={connectionLineStyle} 
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
