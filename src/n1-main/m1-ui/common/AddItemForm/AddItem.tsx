import SuperButton from "../c2-SuperButton/SuperButton";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import {ChangeEvent, useState} from "react";
import {PacksList} from "../../../../n2-features/f1-table/Packs/PacksList";
import {AddCardPacksThunk} from "../../../../n2-features/f1-table/Packs/PacksReducer";
import {useDispatch} from "react-redux";
import {generateKeyPair} from "crypto";

type AddItemPropsType = {
    title: string
}
export const AddItem = (props: AddItemPropsType) => {
    const dispatch = useDispatch()

    const [addPack, setAddPack] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')

    const cancelHandler = () => setAddPack(false)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const saveHandler = () => {
        dispatch(AddCardPacksThunk(title))
        setAddPack(false)
    }

    return <div>
        {addPack
        ? <div>
                <div>
                    <span>{props.title}</span>
                    <SuperButton>X</SuperButton>
                </div>
                <SuperInputText placeholder={'Title pack'} value = {title}
                                onChange={onChangeTitleHandler}/>
                <div>
                    <SuperButton onClick={cancelHandler}>Cancel</SuperButton>
                    <SuperButton onClick={saveHandler}>Save</SuperButton>
                </div>
            </div>
        : <PacksList addPack={addPack} setAddPack={setAddPack}/>}
    </div>
}