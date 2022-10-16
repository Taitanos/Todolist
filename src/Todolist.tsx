import React, {useState} from "react";
import {FilterValuesType} from "./App";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasks: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={(e) => {
                       setNewTaskTitle(e.currentTarget.value);
                   }}
                   onKeyPress={(e) => {
                       if (e.charCode === 13) {
                           props.addTask(newTaskTitle);
                           setNewTaskTitle("");
                       }
                   }}
            />
            <button onClick={() => {
                props.addTask(newTaskTitle);
                setNewTaskTitle("");
            }}>+
            </button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type={"checkbox"} checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter("all")
            }}>All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>Completed
            </button>
        </div>
    </div>
}

export default Todolist;