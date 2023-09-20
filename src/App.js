import './App.css';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTask from './components/AddTask';
import ViewTasks from './components/Task';



function App() {
  return (
<>
    <Dashboard></Dashboard>
</>
  );
}

export default App;
