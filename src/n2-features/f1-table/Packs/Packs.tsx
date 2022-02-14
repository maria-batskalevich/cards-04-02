import {ReactElement} from "react";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {DeleteCardsPackThunk} from "./PacksReducer";

type PacksPropsType = {
    cardsPacks?: CardPacksResponseType[]
}
export const Packs = (props: PacksPropsType): ReactElement => {

    const dispatch = useDispatch()

    return <div>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Cards count</th>
                <th>Last updated</th>
                <th>Created by</th>
            </tr>
            </thead>
            <tbody>
            {props.cardsPacks && props.cardsPacks[0] && props.cardsPacks.map((c) => {
                const deletePackHandler = () => {
                    dispatch(DeleteCardsPackThunk(c._id))
                }
               return <tr  key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.cardsCount}</td>
                    <td>{c.updated}</td>
                    <td>{c.created}</td>
                   <SuperButton onClick={deletePackHandler}>Delete</SuperButton>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}