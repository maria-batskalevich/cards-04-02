import {ReactElement} from "react";
import {CardPacksType} from "../../../n1-main/m3-dal/ApiResponseTypes";

type PacksPropsType = {
    cardsPacks: CardPacksType[]
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
            {props.cardsPacks.map((c) => {
               return <tr>
                    <td>{c.name}</td>
                    <td>{c.cardsCount}</td>
                    <td>{c.updated}</td>
                    <td>{c.created}</td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}