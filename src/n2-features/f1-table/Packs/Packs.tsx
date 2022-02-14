import {ReactElement} from "react";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";

type PacksPropsType = {
    cardsPacks?: CardPacksResponseType[]
}
export const Packs = (props: PacksPropsType): ReactElement => {
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
               return <tr  key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.cardsCount}</td>
                    <td>{c.updated}</td>
                    <td>{c.created}</td>
                   <SuperButton>Delete</SuperButton>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}