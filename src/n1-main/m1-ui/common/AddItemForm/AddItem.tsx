import SuperButton from "../c2-SuperButton/SuperButton";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {PacksList} from "../../../../n2-features/f1-table/Packs/PacksList";
import {useDispatch} from "react-redux";
import {ThunkType} from "../../../m2-bll/store";

type AddItemPropsType = {
    itemTitle: string
    callback: (title: string) => ThunkType
}
export const AddItem = (props: AddItemPropsType) => {
    const dispatch = useDispatch()

    const [addItem, setAddItem] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const commonHandlerWithoutError = () => {
        setAddItem(false)
        setTitle('')
    }
    const commonHandlerWithError = () => {
        setError('Field is required!')
        if (error !== null) setError(null)
    }
    const cancelHandler = () => {
        commonHandlerWithoutError()
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const saveHandler = () => {
        if (title.trim() !== '') {
            dispatch(props.callback(title))
            commonHandlerWithoutError()
        } else if (title.trim() === ''){
            commonHandlerWithError()
        }
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) setError(null)
        if(e.charCode === 13 && title.trim() !== ''){
            dispatch(props.callback(title))
            commonHandlerWithoutError()
        } else if (e.charCode === 13 && title.trim() === ''){
            commonHandlerWithError()
        }
    }

    return <div>
        {addItem
        ? <div>
                <div>
                    <span>{props.itemTitle}</span>
                    <SuperButton>X</SuperButton>
                </div>
                <SuperInputText placeholder={'Title pack'} value = {title}
                                onChange={onChangeTitleHandler}
                                onKeyPress={onKeyPressHandler}
                />
                {error && <div>{error}</div>}
                <div>
                    <SuperButton onClick={cancelHandler}>Cancel</SuperButton>
                    <SuperButton onClick={saveHandler}>Save</SuperButton>
                </div>
            </div>
        : <PacksList addPack={addItem} setAddPack={setAddItem}/>}
    </div>
}