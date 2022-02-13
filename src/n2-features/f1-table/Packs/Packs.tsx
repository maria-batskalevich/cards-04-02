import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardPacksType} from "./PacksReducer";

export const Packs = (): ReactElement => {
    const cardsPacks = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.cardPacks)
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
            {cardsPacks.map((c) => {
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