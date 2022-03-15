import React, {ReactElement} from "react";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {DeleteCardsPackThunk, UpdateCardsPackThunk} from "./PacksReducer";
import {useDispatch} from "react-redux";
import {ModalContainer} from "../../../n3-modals/ModalContainer";
import {ModalInputContainer} from "../../../n3-modals/InputModal/SimpleInput/ModalInputContainer";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import {LoadingProgress} from "../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress";
import s from '../Table.module.css'
import {SetCurrentCardsPackIdAC} from "../Cards/CardsReducer";
import {ModalMessage} from "../../../n3-modals/MessageModal/ModalMessage";

type PacksPropsType = {
    cardsPacks?: CardPacksResponseType[]
    user_id?: string | null | undefined
    entityStatus?: StatusType
    setShow?: (show: boolean) => void
}
export const Packs = (props: PacksPropsType): ReactElement => {

    const dispatch = useDispatch()

    return <div>
        <table>
            <thead className={s.columnName}>
            <tr>
                <th>Name</th>
                <th>Cards count</th>
                <th>Last updated</th>
                <th>Created</th>
                <th>Rating</th>
                <th></th>
            </tr>
            </thead>
            <tbody className={s.item}>
            {props.cardsPacks && props.cardsPacks[0] && props.cardsPacks.map((c) => {

                const deletePackHandler = () => {
                    dispatch(DeleteCardsPackThunk(c._id))
                }
                const updatePackNameHandler = (newPackName: string) => {
                    dispatch(UpdateCardsPackThunk(c._id, newPackName))
                }
                const showCardsComponent = () => {
                    props.setShow && props.setShow(true)
                    dispatch(SetCurrentCardsPackIdAC({id: c._id}))
                }

                return <tr key={c._id} className={`${c.user_id === props.user_id && s.trHover}`} onDoubleClick={c.user_id === props.user_id ? showCardsComponent : () => {}}>
                    <td>{c.name}</td>
                    <td>{c.cardsCount}</td>
                    <td>{c.updated.slice(0, 10)}</td>
                    <td>{c.created.slice(0, 10)}</td>
                    <td>{c.rating}</td>
                    <td className={s.tableButtons}>
                        <SuperButton disabled={props.entityStatus === 'loading' || c.cardsCount === 0}
                                     onClick={showCardsComponent}>Learn</SuperButton>
                        {props.user_id === c.user_id &&
                        <>
                            <ModalInputContainer title={'Update'}
                                                 messageName={'Update pack name'}
                                                 callback={updatePackNameHandler}/>
                            <ModalContainer title={'Delete'}
                                            message={`Do you really want to remove - ${c.name}?\n +
                                        '            All cards will be excluded from this course.`}
                                            callback={deletePackHandler}/>
                        </>}</td>
                </tr>
            })}
            </tbody>
        </table>
        {props.entityStatus === 'loading' && <LoadingProgress/>}
    </div>
}