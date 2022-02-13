import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {Packs} from "./Packs";

type PacksListPropsType = {
    addPack: boolean
    setAddPack: (addPack: boolean) => void
}
export const PacksList = (props: PacksListPropsType) => {

    const cardsPacks = useSelector<AppRootStateType, Array<CardPacksResponseType>>(state => state.packs.cardPacks)

    const onClickHandler = () => {
        props.setAddPack(true)
    }
    return <div>
        <SuperButton onClick={onClickHandler}>Add new pack</SuperButton>
        <Packs cardsPacks={cardsPacks}/>
    </div>
}