import { DraggableNode } from './draggableNode';
import { useState } from 'react';
import { MdInput } from "react-icons/md";
import { MdOutlineOutput } from "react-icons/md";
import { GiArtificialHive } from "react-icons/gi";
import { FiFileText } from "react-icons/fi";
import { BsDisplay } from "react-icons/bs";
import { GrConfigure } from "react-icons/gr";
import { CgDebug } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";

export const PipelineToolbar = () => {
  const [activeTab, setActiveTab] = useState('General'); 

  const tabs = ['General', 'LLMs', 'Knowledge Base', 'Integrations', 'Data Loaders', 'Multi-Modal', 'Logic', 'Chat'];

  const renderNodes = () => {
    if (activeTab === 'General') {
      return (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' , fontFamily:"sans"}}>
          <DraggableNode type='customInput' label='Input' icon={<MdInput />} />
          <DraggableNode type='llm' label='LLM' icon={<GiArtificialHive />} />
          <DraggableNode type='customOutput' label='Output' icon={<MdOutlineOutput />} />
          <DraggableNode type='text' label='Text' icon={<FiFileText />} />
          <DraggableNode type='display' label='Display' icon={<BsDisplay />} />
          <DraggableNode type='filter' label='Filter' icon={<CiFilter />} />
          <DraggableNode type='debug' label='Debug' icon={<CgDebug />} />
          <DraggableNode type='config' label='Config' icon={<GrConfigure />} />
          <DraggableNode type='action' label='Action' icon={<GrConfigure />} />
        </div>
      );
    }
    return <div>No nodes available for this tab.</div>;
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      padding: '10px 20px',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000
    }}>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        borderBottom: '1px solid #ddd',
      }}>
        {tabs.map((tab) => (
          <div
            key={tab}
            style={{
              padding: '10px 15px',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              fontFamily:"sans-serif",
              color: activeTab === tab ? '#6C63FF' : '#333',
              borderBottom: activeTab === tab ? '2px solid #6C63FF' : 'none'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Draggable Node Options */}
      <div style={{ padding: '10px 0', display: 'flex' }}>
        {renderNodes()}
      </div>
    </div>
  );
};
