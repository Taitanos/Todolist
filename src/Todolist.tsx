import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todoId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (tasks: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistID:string) => void
    addTask: (title: string, todolistId: string) => void
    ChangeTasksStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
}

const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.todoId);
            setNewTaskTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.todoId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.todoId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.todoId)
    }

    const onRemoveTodolist = () => {
        props.removeTodolist(props.todoId)
    }

    return <div>
        <h3>{props.title} <button onClick={onRemoveTodolist}>x</button> </h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.todoId)
                    }
                    const OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.ChangeTasksStatus(t.id, e.currentTarget.checked, props.todoId)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type={"checkbox"}
                               onChange={OnChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

export default Todolist;