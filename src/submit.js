import React, { useState } from 'react';
import { useStore } from './store'; 

export const SubmitButton = () => {
  const { nodes, edges } = useStore(); // Retrieve nodes and edges from the store
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to track error message

  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Set loading to true when the request starts
      setError(null); // Reset error state before making the request

      console.log("Nodes being sent:", nodes);
      console.log("Edges being sent:", edges);

      // Send nodes and edges to the FastAPI backend
      const response = await fetch('https://fastapi-4gsi.onrender.com/pipelines/parse', {
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
      setError(error.message); // Set the error message
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Spinner component inline
  const Spinner = () => (
    <div style={{
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 2s linear infinite',
    }} />
  );

  // Add CSS for the spinner animation
  const spinnerStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  const styleTag = document.createElement('style');
  styleTag.innerHTML = spinnerStyle;
  document.head.appendChild(styleTag);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <Spinner />  // Show the spinner while loading
      ) : (
        <button 
          onClick={handleSubmit} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'blue', 
            border: 'none', 
            borderRadius: '5px', 
            color: 'white',
            fontSize: '16px', 
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'violet'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'blue'}
        >
          RUN
        </button>
      )}
    </div>
  );
};
