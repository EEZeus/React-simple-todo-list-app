import React, { useEffect, useState } from 'react';

import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';
import useRequest from './hooks/use-request';

function App() {
  const [tasks, setTasks] = useState([]);

  const applyData = (data)=>{ 
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
  }

  const { isLoading,error,sendRequest:fetchTasks} = useRequest();
 
  useEffect(() => {
    fetchTasks(
      {
        url: "https://react-app-b6b2b-default-rtdb.firebaseio.com/tasks.json",
      },
      applyData
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
