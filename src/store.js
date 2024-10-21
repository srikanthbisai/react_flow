import { createWithEqualityFn } from 'zustand/traditional';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';
import { shallow } from 'zustand/shallow';

export const useStore = createWithEqualityFn(
  (set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},

    // Generate unique IDs for nodes based on type
    getNodeID: (type) => {
      const newIDs = { ...get().nodeIDs };
      if (newIDs[type] === undefined) {
        newIDs[type] = 0;
      }
      newIDs[type] += 1;
      set({ nodeIDs: newIDs });
      return `${type}-${newIDs[type]}`;
    },

    // Add new node to the nodes array with default structure
    addNode: (node) => {
      const defaultNode = {
        position: { x: 0, y: 0 },
        data: {},
        ...node,
      };
      set({ nodes: [...get().nodes, defaultNode] });
    },

    // Remove a node based on its ID
    removeNode: (nodeId) => {
      set({ nodes: get().nodes.filter((node) => node.id !== nodeId) });
    },

    // Apply changes to the nodes array
    onNodesChange: (changes) => {
      set({ nodes: applyNodeChanges(changes, get().nodes) });
    },

    // Apply changes to the edges array
    onEdgesChange: (changes) => {
      set({ edges: applyEdgeChanges(changes, get().edges) });
    },

    // Add a new edge with default smoothstep and animation
    onConnect: (connection) => {
      set({
        edges: addEdge(
          {
            ...connection,
            type: 'smoothstep',
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
          },
          get().edges
        ),
      });
    },

    // Update specific fields in a node's data object
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
          return node;
        }),
      });
    },
  }),
  shallow
);
