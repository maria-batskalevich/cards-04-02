import React, {useState} from 'react'
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import imgVector from "../../../assets/Vector 1.png";
import s from "../Table.module.css";
import {CardPacksResponseType, CardType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";


type EducationPropsType = {
    setShowEducation: (showEducation: boolean) => void
    cardsPack: CardPacksResponseType
}
export const Education = (props: EducationPropsType) => {

    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)
    const showCards = () => props.setShowEducation(false)

    return <div className={s.tableContainer}>
        <div className={s.tableBar}>
            <SuperButton onClick={showCards}>
                <img src={imgVector}/> Back
            </SuperButton>
        </div>
        <div className={s.items}>
            <h1>{props.cardsPack.name}</h1>
            <div>
                {cards.map(c => {
                    const showAnswerHandler = () => setShowAnswer(true)
                    return <div>
                        <div>{c.question}</div>
                        <SuperButton onClick={showAnswerHandler}>Show Answer</SuperButton>
                        {showAnswer && <div>{c.answer}</div>}
                    </div>
                })}
            </div>
            <div>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
        </div>
    </div>
}