import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import imgVector from '../../../assets/Vector 1.png'
import {Packs} from "../Packs/Packs";
import {Cards} from "./Cards";
import s from "../Packs/Packs.module.css";
import {ModalInputContainer} from "../../../n3-modals/InputModal/ModalInputContainer";
import {FetchCardsThunk} from "./CardsReducer";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";

type CardsListPropsType = {
    cardsPacks?: CardPacksResponseType[]
    setShow: (setShow: boolean) => void
    show: boolean
}
export const CardsList = (props: CardsListPropsType) => {

    const dispatch = useDispatch()

    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const currentCardsPackID = useSelector<AppRootStateType>(state => state.cards.currentCardsPackID)

    const currentCardsPack = props.cardsPacks && props.cardsPacks.find(c => c._id === currentCardsPackID)

    const showPacks = () => props.setShow(false)
    const addCardHandler = () => {
    }

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(FetchCardsThunk())
    }, [dispatch])

    if (!props.show) {
        return <Packs />
    }
    return <div>
        <div className={s.packsContainer}>
            <div className={s.packsBar}>
                <SuperButton onClick={showPacks}>
                    <img src={imgVector}/>  Back
                </SuperButton>
                <ModalInputContainer title={'Add new card'} messageName={'Add new card'} callback={addCardHandler}/>
            </div>
            <div className={s.packs}>
                <h1>{currentCardsPack && currentCardsPack.name}</h1>
                <Cards entityStatus={entityStatus}/>
            </div>
        </div>
    </div>
};

