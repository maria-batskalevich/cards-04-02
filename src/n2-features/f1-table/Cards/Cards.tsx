import s from "../Packs/Packs.module.css";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {LoadingProgress} from "../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress";
import React from "react";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";

type CardsPropsType = {
    entityStatus: StatusType
}
export const Cards = (props: CardsPropsType) => {
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
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <SuperButton>Update</SuperButton>
                    <SuperButton>Delete</SuperButton>
                </td>
            </tr>
            </tbody>
        </table>
        {props.entityStatus === 'loading' && <LoadingProgress/>}
    </div>
}