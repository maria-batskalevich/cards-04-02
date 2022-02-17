import SuperButton from "../c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {ThunkType} from "../../../m2-bll/store";

type DeleteItemPropsType = {
    deleteItem: boolean
    setDeleteItem: (value: boolean) => void
    itemTitle: string
    namePack: string
    callback: (idPack: string) => ThunkType
}
export const DeleteItem = (props: DeleteItemPropsType) => {

    const dispatch = useDispatch()

    const cancelHandler = () => {
        props.setDeleteItem(false)
    }
    const deleteHandler = () => {
            dispatch(props.callback(''))
        }

    return <div>
        {props.deleteItem
            ? <div>
                <div>
                    <span>{props.itemTitle}</span>
                </div>
                <span>
                    {`Do you really want to remove Pack Name - ${props.namePack}? All cards will be excluded from this course.`}
                </span>
                <div>
                    <SuperButton onClick={cancelHandler}>Cancel</SuperButton>
                    <SuperButton onClick={deleteHandler}>Delete</SuperButton>
                </div>
            </div>
            : <div></div>}
    </div>
}