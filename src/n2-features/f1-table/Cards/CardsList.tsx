import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import imgVector from '../../../assets/Vector 1.png'
import {Packs} from "../Packs/Packs";
import {Cards} from "./Cards";
import s from "../Table.module.css";
import {AddCardThunk, FetchCardsThunk} from "./CardsReducer";
import {CardPacksResponseType, CardType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {ModalDoubleInputContainer} from "../../../n3-modals/InputModal/DoubleInput/ModalDoubleInputContainer";
import {FetchPacksThunk} from "../Packs/PacksReducer";
import {Education} from "../Education/Education";

type CardsListPropsType = {
    cardsPacks?: CardPacksResponseType[]
    setShow: (setShow: boolean) => void
    show: boolean
}
export const CardsList = (props: CardsListPropsType) => {

    const [showEducation, setShowEducation] = useState<boolean>(false)

    const dispatch = useDispatch()

    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const currentCardsPackID = useSelector<AppRootStateType, string>(state => state.cards.currentCardsPackID)
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)

    const currentCardsPack = props.cardsPacks && props.cardsPacks.find(c => c._id === currentCardsPackID)

    const showPacks = () => {
        props.setShow(false)
        dispatch(FetchPacksThunk())
    }
    const addCardHandler = (question: string, answer: string) => dispatch(AddCardThunk({card: {cardsPack_id: currentCardsPackID, question, answer}}))
    const learnCards = () => {
        setShowEducation(true)
    }
    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(FetchCardsThunk())
    }, [dispatch, currentCardsPack])

    if (!props.show) {
        return <Packs />
    }
    if (showEducation && currentCardsPack){
        return <Education setShowEducation={setShowEducation} cardsPack={currentCardsPack}/>
    }
    return <div>
        <div className={s.tableContainer}>
            <div className={s.tableBar}>
                <h1>{currentCardsPack && currentCardsPack.name}</h1>
                <SuperButton disabled={cards.length === 0} onClick={learnCards}>Learn Cards</SuperButton>
                <ModalDoubleInputContainer title={'Add new card'} messageName={'Add new card'}
                                     callback={addCardHandler}
                                     currentCardsPackID={currentCardsPackID}
                />
                <SuperButton onClick={showPacks}>
                    <img src={imgVector}/>  Back
                </SuperButton>
            </div>
            <div className={s.items}>
                <Cards entityStatus={entityStatus} addCardHandler={addCardHandler} packId={currentCardsPackID} cards={cards}/>
            </div>
        </div>
    </div>
};

