import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField, IconButton} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem()
        }
    }

    return <div>
        <TextField variant={"outlined"}
                   error={!!error}
                   value={title}
                   label={"Type value"}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   helperText={error}
                   />
        <IconButton color={"primary"} onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
}

export default AddItemForm;