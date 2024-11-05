import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import BaseNode from "./BaseNode";

const extractVariables = (text) => {
  const variableRegex = /{{\s*(\w+)\s*}}/g;
  const variables = [];
  let match;
  while ((match = variableRegex.exec(text)) !== null) {
    variables.push(match[1]);
  }
  return variables;
};

const calculateSize = (text) => {
  const lines = text.split("\n").length;
  const height = Math.max(100, lines * 25);
  const width = Math.max(220, Math.min(400, text.length * 8));
  return { width, height };
};

export const TextNode = ({ id, data = {} }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [size, setSize] = useState(calculateSize(currText));
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const vars = extractVariables(currText);
    setVariables(vars);
    setSize(calculateSize(currText));
  }, [currText]);

  useEffect(() => {
    if (textareaRef.current && containerRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      containerRef.current.style.width = `${size.width}px`;
      containerRef.current.style.height = `${size.height}px`;
    }
  }, [size]);

  const handleTextChange = (e) => setCurrText(e.target.value);

  const inputs = variables.map((variable, index) => ({
    id: `${id}-handle-${index}`,
    position: Position.Left,
  }));

  const outputs = [{ id: "output", position: Position.Right }];

  return (
    <BaseNode
      id={id}
      data={{ text: currText }}
      nodeType="Text"
      inputs={inputs}
      outputs={outputs}
      styles={{ width: size.width, height: size.height }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: "90%",
            height: "90%",
            margin: "auto",
            padding: "8px",
            borderRadius: "6px",
            border: `2px solid ${isFocused ? "#3b82f6" : "#d1d5db"}`,
            fontSize: "12px",
            resize: "none",
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
            boxSizing: "border-box",
            textAlign: "left",
            lineHeight: "1.5",
            transition: "border-color 0.3s ease",
            outline: "none",
          }}
        />
      </div>

      {variables.length > 0 && (
        <div>
          {variables.map((variable, index) => (
            <div
              key={`${id}-handle-container-${index}`}
              style={{
                position: "absolute",
                right: `${size.width}px`,
                top: `${index * 30 + 50}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  right: "30px",
                  width: "100%",
                  height: "20px",
                  overflow: "visible",
                  color: "teal",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    whiteSpace: "nowrap",
                    backgroundColor: "#e0e0e0",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    letterSpacing: "1px",
                  }}
                >
                  {variable}
                </div>
              </div>
              <Handle
                type="target"
                position={Position.Left}
                id={`${id}-handle-${index}`}
                style={{
                  visibility: "hidden",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </BaseNode>
  );
};

export default TextNode;
