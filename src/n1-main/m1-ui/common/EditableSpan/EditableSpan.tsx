import {ChangeEvent, useState} from "react";
type EditableSpanPropsType = {
    packName: string
    disabled: boolean
    onChange: (newPackName: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.packName)

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const activateEditMode = () => {
        props.disabled ? setEditMode(false) : setEditMode(true)
        setTitle(props.packName)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return <div>
        {editMode
        ? <input value={title} autoFocus onBlur={activateViewMode} onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.packName}</span>}
    </div>
}