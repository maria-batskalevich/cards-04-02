import s from "../Packs/Packs.module.css";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {LoadingProgress} from "../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress";
import React from "react";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardType} from "../../../n1-main/m3-dal/ApiResponseTypes";

type CardsPropsType = {
    entityStatus: StatusType
}
export const Cards = (props: CardsPropsType) => {
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)

    return <div>
        <table>
            <thead className={s.columnName}>
            <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Last updated</th>
                <th>Grade</th>
                <th></th>
            </tr>
            </thead>
            <tbody className={s.pack}>
            {cards.map(c => <tr key={c._id}>
                <td>{c.question}</td>
                <td>{c.answer}</td>
                <td>{c.updated}</td>
                <td>{c.grade}</td>
                <td>
                    <SuperButton>Update</SuperButton>
                    <SuperButton>Delete</SuperButton>
                </td>
            </tr>)}
            </tbody>
        </table>
        {props.entityStatus === 'loading' && <LoadingProgress/>}
    </div>
}