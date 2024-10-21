import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <Navbar/>
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
