import SuperButton from "../c2-SuperButton/SuperButton";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {PacksList} from "../../../../n2-features/f1-table/Packs/PacksList";
import {AddCardPacksThunk} from "../../../../n2-features/f1-table/Packs/PacksReducer";
import {useDispatch} from "react-redux";

type AddItemPropsType = {
    title: string
}
export const AddItem = (props: AddItemPropsType) => {
    const dispatch = useDispatch()

    const [addPack, setAddPack] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const cancelHandler = () => setAddPack(false)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const saveHandler = () => {
        if (title.trim() !== '') {
            dispatch(AddCardPacksThunk(title))
            setAddPack(false)
            setTitle('')
        } else if (title.trim() === ''){
            setError('Field is required!')
            if (error !== null) setError(null)
        }
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) setError(null)
        if(e.charCode === 13 && title.trim() !== ''){
            dispatch(AddCardPacksThunk(title))
            setAddPack(false)
            setTitle('')
        } else if (e.charCode === 13 && title.trim() === ''){
            setError('Field is required!')
            if (error !== null) setError(null)
        }
    }

    return <div>
        {addPack
        ? <div>
                <div>
                    <span>{props.title}</span>
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
        : <PacksList addPack={addPack} setAddPack={setAddPack}/>}
    </div>
}