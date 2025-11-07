import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  setTimeout(() => {
    console.log(window.memoryMap);
  });
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
