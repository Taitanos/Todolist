import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTasksStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    changeTasksTitle: (taskID: string, title: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

const Todolist = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.todoId)
    }

    const onRemoveTodolist = () => {
        props.removeTodolist(props.todoId)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todoId)
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

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={onRemoveTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.todoId)
                    }
                    const OnChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTasksStatus(t.id, e.currentTarget.checked, props.todoId)
                    }
                    const OnChangeTitleHandler = (newValue: string) => {
                        props.changeTasksTitle(t.id,newValue,props.todoId)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type={"checkbox"} onChange={OnChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={OnChangeTitleHandler}/>
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