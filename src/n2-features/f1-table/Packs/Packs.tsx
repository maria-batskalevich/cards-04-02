import {ReactElement, useState} from "react";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {DeleteCardsPackThunk, UpdateCardsPackThunk} from "./PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import {EditableSpan} from "../../../n1-main/m1-ui/common/EditableSpan/EditableSpan";

type PacksPropsType = {
    cardsPacks?: CardPacksResponseType[]
    user_id: string | null | undefined
}
export const Packs = (props: PacksPropsType): ReactElement => {

    const dispatch = useDispatch()
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)

    return <div>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Cards count</th>
                <th>Last updated</th>
                <th>Created</th>
                <th>Rating</th>
            </tr>
            </thead>
            <tbody>
            {props.cardsPacks && props.cardsPacks[0] && props.cardsPacks.map((c) => {

                const deletePackHandler = () => {
                    dispatch(DeleteCardsPackThunk(c._id))
                }
                const updatePackName = (newPackName: string) => {
                    dispatch(UpdateCardsPackThunk(c._id, newPackName))
                }
                const updatePackHandler =() => {alert('click on the packName')}


                return <tr key={c._id}>
                    <td><EditableSpan packName={c.name}disabled={entityStatus === 'loading'} onChange={updatePackName}/></td>
                    <td>{c.cardsCount}</td>
                    <td>{c.updated}</td>
                    <td>{c.created}</td>
                    <td>{c.rating}</td>
                    <SuperButton disabled={entityStatus === 'loading'}>Learn</SuperButton>
                    {props.user_id === c.user_id &&
                    <>
                        <SuperButton onClick={deletePackHandler} disabled={entityStatus === 'loading'}>Delete</SuperButton>
                        <SuperButton onClick={updatePackHandler} disabled={entityStatus === 'loading'}>Update</SuperButton>
                    </>}
                </tr>
            })}
            </tbody>
        </table>
    </div>
}