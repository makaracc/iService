import './App.css';
import CreateNewTask from './Components/CreateNewTask/CreateNewTask';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Navigation from './Components/Navigation';
import TaskHome from './Components/ShowTask/TaskHome';

function App() {
  const [state, setState] = useState({
    page: 'All Tasks',
    data: null
  });

  const handleOnChange = (field, value) =>{
    setState({ [field]: value });
    console.log(value);
  }
  return (
    <div className="root">
      <Navigation
      pages={['New Task', 'All Tasks']}
      onChange = {handleOnChange}
      
      />
      {
        state.page === 'New Task' ? <CreateNewTask/> : <TaskHome/>
      }
    </div>
  );
}

export default App;
