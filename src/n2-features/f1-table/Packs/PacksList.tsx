import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {Packs} from "./Packs";

type PacksListPropsType = {
    addPack: boolean
    setAddPack: (addPack: boolean) => void
    cardsPacks?: CardPacksResponseType[]
    user_id?: string | null | undefined
}
export const PacksList = (props: PacksListPropsType) => {

    const onClickHandler = () => {
        props.setAddPack(true)
    }
    return <div>
        <SuperButton onClick={onClickHandler}>Add new pack</SuperButton>
        <Packs cardsPacks={props.cardsPacks} user_id={props.user_id}/>
    </div>
}