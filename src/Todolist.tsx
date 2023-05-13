import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
            <IconButton onClick={onRemoveTodolist}> <Delete/> </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
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
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox checked={t.isDone} color={"primary"} onChange={OnChangeStatusHandler} />
                        <EditableSpan title={t.title} onChange={OnChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler}> <Delete/> </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler} color={"inherit"}>All</Button>
            <Button variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler} color={"primary"}>Active
            </Button>
            <Button variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler} color={"secondary"}>Completed
            </Button>
        </div>
    </div>
}

export default Todolist;