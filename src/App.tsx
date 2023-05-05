import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: string
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: v1(),
            title: "What to learn",
            filter: "all",
        },
        {
            id: v1(),
            title: "What to buy",
            filter: "all",
        },
    ])

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    // let [filter, setFilter] = useState<FilterValuesType>("all");



    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID);
        if (todolists) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTask(id: string) {
        let filteredTask = tasks.filter(t => t.id !== id);
        setTasks(filteredTask);
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }

    function ChangeStatus(taskID: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            {
                todolist.map(tl => {

                    let tasksForTodolist = tasks;

                    if (filter === "active") {
                        tasksForTodolist = tasks.filter(t => t.isDone === false);
                    }
                    if (filter === "completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        ChangeTasksStatus={ChangeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
