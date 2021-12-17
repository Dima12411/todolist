import React, {ChangeEvent, useState} from "react";

type typeProps = {
    title: string
    callBackForEditableSpan: (localTitle: string) => void
}

const EditableSpan = (props: typeProps) => {
    const [edit, setEdit] = useState(false)
    let [localTitle, setLocalTitle] = useState(props.title)

    const onDoubleClickHandler = () => {
        setEdit(true)
    }
    const onBlurHandlerFalse = () => {
        setEdit(false)
        props.callBackForEditableSpan(localTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input value={localTitle} onChange={onChangeHandler} onBlur={onBlurHandlerFalse} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    )
}

export default EditableSpan;