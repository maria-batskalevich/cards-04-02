import s from "../Table.module.css";
import {LoadingProgress} from "../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress";
import React from "react";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {DeleteCardThunk, UpdateCardThunk} from "./CardsReducer";
import {ModalContainer} from "../../../n3-modals/ModalContainer";
import {ModalDoubleInputContainer} from "../../../n3-modals/InputModal/DoubleInput/ModalDoubleInputContainer";
import {ModalInputContainer} from "../../../n3-modals/InputModal/SimpleInput/ModalInputContainer";

type CardsPropsType = {
    entityStatus: StatusType
    addCardHandler: (question: string, answer: string) => void
    packId: string
    cards: CardType[]
}
export const Cards = (props: CardsPropsType) => {

    const dispatch = useDispatch()

    const user_id = useSelector<AppRootStateType, string | null | undefined>(state => state.profile._id)

    if (props.cards.length === 0) {
       return <h3>For adding new card click on button 'Add new card'</h3>
    }
    return <div>
        <table>
            <thead className={s.columnName}>
            <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Last updated</th>
                <th>Grade</th>
                {user_id && <th></th>}
            </tr>
            </thead>
            <tbody className={s.item}>
            {props.cards.map(c => {
                const deleteCardHandler = () => dispatch(DeleteCardThunk(c._id))
                const updateCardHandler = (question: string, answer: string) => dispatch(UpdateCardThunk({
                    card: {
                        ...c,
                        question,
                        answer
                    }
                }))

                return <tr key={c._id}>
                    <td>{c.question}</td>
                    <td>{c.answer}</td>
                    <td>{c.updated && c.updated.slice(0, 10)}</td>
                    <td>{c.grade}</td>
                    {user_id === c.user_id && <td>
                        <> <ModalDoubleInputContainer title={'Update'}
                                                      messageName={'Update card'}
                                                      callback={updateCardHandler}
                                                      currentCardsPackID={c.cardsPack_id}/>
                            <ModalContainer title={'Delete'}
                                            message={`Do you really want to remove this card`}
                                            callback={deleteCardHandler}/>
                        </>
                    </td>}
                </tr>
            })}
            </tbody>
        </table>
        {props.entityStatus === 'loading' && <LoadingProgress/>}
    </div>
}