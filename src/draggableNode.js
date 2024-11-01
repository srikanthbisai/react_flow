
//DraggableNode

export const DraggableNode = ({ type, label, icon }) => {
 
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }; // Data to be transferred
    event.target.style.cursor = 'grabbing'; // Change cursor style
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData)); // Set drag data
    event.dataTransfer.effectAllowed = 'move'; 
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)} // Handle drag start
      onDragEnd={(event) => (event.target.style.cursor = 'grab')} // Handle drag end
      style={{ 
        cursor: 'grab', 
        minWidth: '80px', 
        height: '60px',
        padding:"10px",
        display: 'flex', 
        alignItems: 'center', 
        background: 'white',
        color:"black",
        borderRadius: '8px',
        justifyContent: 'center', 
        flexDirection: 'column',
        border:"2px solid gray"
      }} 
      draggable
    >
      {icon && <div style={{ fontSize: '20px', color: 'black', marginBottom: '5px' }}>{icon}</div>} 
      <span style={{ color: 'black', fontWeight: '500' }}>{label}</span>
      </div>
  );
};
