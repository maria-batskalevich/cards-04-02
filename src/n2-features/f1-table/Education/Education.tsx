import React, {useEffect, useState} from 'react'
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import imgVector from "../../../assets/Vector 1.png";
import s from "../../../n1-main/m1-ui/common/Container.module.css";
import {CardPacksResponseType, CardType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {useParams} from "react-router-dom";
import {FetchCardsThunk, UpdateGradeThunk} from "../Cards/CardsReducer";
import {cleverRandom} from "./cleverRandom";


type EducationPropsType = {
    setShowEducation: (showEducation: boolean) => void
    cardsPack: CardPacksResponseType
}
export const Education = (props: EducationPropsType) => {

    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)
    const [card, setCard] = useState<CardType>({
        answer: 'Fake answer',
        question: 'Fake question',
        cardsPack_id: 'Fake',
        grade: 0,
        rating: 0,
        shots: 0,
        type: '',
        user_id: '',
        created: '',
        updated: '',
        __v: 0,
        _id: 'Fake'
    })

    const dispatch = useDispatch()
    const {id} = useParams<'id'>()

    const grades = ['1', '2', '3', '4', '5']
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)
    const showCards = () => props.setShowEducation(false)
    const showAnswerHandler = () => setShowAnswer(true)
    const showNextCard = () => {
        setShowAnswer(false)
        cards.length > 0 && setCard(cleverRandom(cards))
    }

    useEffect(() => {
        if (first) {
            dispatch(FetchCardsThunk({cardsPack_id: id}))
            setFirst(false)
        }
        if (cards.length > 0) setCard(cleverRandom(cards))
    }, [dispatch, id, cards, first])

    return <div className={s.container}>
        <div>
            <h1>Learn "{props.cardsPack.name}"</h1>
            <div> Question: {card.question}</div>
            {showAnswer && <div>Answer: {card.answer}</div>}

            {!showAnswer &&<SuperButton onClick={showAnswerHandler}>Show Answer</SuperButton>}
            <SuperButton onClick={showNextCard}>Next</SuperButton>
            <div>
                <h3>Rate yourself:</h3>
                {grades.map((g, index) => {
                    const updateGradeHandler = () => dispatch(UpdateGradeThunk({grade: index + 1, card_id: card._id}))
                    return <span key={index} onClick={updateGradeHandler}> {g} </span>
                })}
            </div>
            <div>
                <SuperButton onClick={showCards}>
                    <img src={imgVector}/> Back
                </SuperButton>
            </div>
        </div>
    </div>
}