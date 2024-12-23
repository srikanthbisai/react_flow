import React from 'react';
import { useStore } from './store'; 
export const SubmitButton = () => {
  const { nodes, edges } = useStore(); // Retrieve nodes and edges from the store

  const handleSubmit = async () => {
    try {
      console.log("Nodes being sent:", nodes);
      console.log("Edges being sent:", edges);

      // Send nodes and edges to the FastAPI backend
      const response = await fetch('https://fastapi-1-qik2.onrender.com/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes.map(node => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: node.data,  // Send node's data object
          })),
          edges: edges.map(edge => ({
            source: edge.source,
            target: edge.target,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Response Data:', data);

      // Show the response data in an alert
      alert(`Number of nodes: ${data.num_nodes}\nNumber of edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);

    } catch (error) {
      console.error('Error in handleSubmit:', error);
      // Optionally display an error to the user
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
      <button 
        onClick={handleSubmit} 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: 'blue', 
          border: 'none', 
          borderRadius: '5px', 
          paddingX: "20px",
          paddingY:"10px",
          color:"white",
          fontSize: '16px', 
          cursor: 'pointer',
          transition: 'background 0.3s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'violet'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'blue'}
      >
        RUN
      </button>
    </div>
  );
  
};
