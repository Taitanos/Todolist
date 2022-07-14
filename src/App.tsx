import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all");
    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function removeTask(id: number) {
        let filteredTask = tasks.filter(t => t.id !== id);
        setTasks(filteredTask);
    }

    return (
        <div className="App">
            <Todolist title = {"What is learn"}
                      tasks = {tasksForTodolist}
                      removeTask = {removeTask}
                      changeFilter = {changeFilter}
            />
        </div>
    );
}

export default App;
