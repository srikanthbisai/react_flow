import { Handle, Position } from "reactflow";
import { useStore } from "../store";

const BaseNode = ({
  id,
  data,
  nodeType,
  inputs,
  outputs,
  styles,
  children,
  highlighted,
}) => {
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div
      style={{
        width: 200,
        height: styles.height || 100,
        border: "2px solid blue",
        borderRadius: "10px",
        padding: "10px",
        paddingBottom:"2em",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        position: "relative",
        fontFamily: "Arial, sans-serif",
        transition: "border-color 0.3s ease",
        ...styles,
      }}
    >
      <button
        onClick={() => removeNode(id)}
        style={{
          position: "absolute", top: "5px", right: "5px", border: "2px solid gray", backgroundColor: "transparent", color: "purple", borderRadius: "50%",cursor: "pointer",
          fontSize: "12px", fontWeight: "bold", width: "18px", height: "18px", display: "flex", alignItems: "center" , justifyContent: "center", padding: 0,
          lineHeight: 1,
        }}
        aria-label="Remove Node"
      >
        &times;
      </button>

      <div
        style={{ marginBottom: "10px", fontWeight: "bold", color: "#5f6368" }}
      >
        {nodeType}
      </div>
      {children}

      {/* Input handles */}
      {inputs?.map((input, index) => (
        <Handle
          key={`${id}-input-${index}`}
          type="target"
          position={input.position || Position.Left}
          id={`${id}-input-${index}`}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            left: "-10px",
            width: "15px",
            height: "15px",
            backgroundColor: "#1B6CA8", // Highlighted if node is highlighted
            border: "1px solid blue",
            borderRadius: "50%",
          }}
        />
      ))}

      {/* Output handles */}
      {outputs?.map((output, index) => (
        <Handle
          key={`${id}-output-${index}`}
          type="source"
          position={output.position || Position.Right}
          id={`${id}-output-${index}`}
          style={{
            top: "50%",
            right: "-10px",
            transform: "translateY(-50%)",
            width: "15px",
            height: "15px",
            backgroundColor: "#1B6CA8",
            border: `1px solid blue`,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
