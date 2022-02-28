import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import imgVector from '../../../assets/Vector 1.png'
import {Packs} from "../Packs/Packs";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Cards} from "./Cards";
import s from "../Packs/Packs.module.css";
import {ModalInputContainer} from "../../../n3-modals/InputModal/ModalInputContainer";

type CardsListPropsType = {
    cardsPacks: CardPacksResponseType[]
    setShow: (setShow: boolean) => void
    show: boolean
}
export const CardsList = (props: CardsListPropsType) => {
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)

    const showPacks = () => props.setShow(false)
    const addCardHandler = () => {}

    if(!props.show)  {
        return <Packs setShow={showPacks}/>
    }
    return <div className={s.packsContainer}>
        <div className={s.packsBar}>
            <SuperButton onClick={showPacks}>
                <img src={imgVector}/>
            </SuperButton>
            <ModalInputContainer title={'Add new card'} messageName={'Add new card'} callback={addCardHandler}/>
        </div>
        <div className={s.packs}>
            <h1>{'props.packName'}</h1>
            <Cards entityStatus={entityStatus}/>
        </div>
    </div>
};

