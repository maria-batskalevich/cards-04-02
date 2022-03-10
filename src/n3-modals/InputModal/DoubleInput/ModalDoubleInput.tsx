import React, {ChangeEvent, useState} from "react";
import {Modal} from "../../Modal";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {PostCardsQueryParams} from "../../../n1-main/m3-dal/ApiResponseTypes";

type ModalDoubleInputPropsType = {
    title: string
    messageName: string
    callback: (question: string, answer: string) => void
    show: boolean
    closeModalInput: () => void
}
export const ModalDoubleInput: React.FC<ModalDoubleInputPropsType> = ({
                                                              title,
                                                              messageName,
                                                              callback,
                                                              show,
                                                              closeModalInput,
                                                          }) => {
    const [value, setValue] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const saveValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const saveAnswer = (e: ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)
    const onClickHandler = () => {
        callback(value, answer)
        closeModalInput()
        setValue('')
    }

    return <>
        <Modal
            enableBackground={true}
            backgroundOnClick={closeModalInput}
            width={300}
            height={200}
            show={show}>
            {messageName}
            Question: <SuperInputText value={value} onChange={saveValue} autoFocus/>
            Answer: <SuperInputText value={answer} onChange={saveAnswer} autoFocus/>
            <SuperButton onClick={onClickHandler}>{title}</SuperButton>
            <SuperButton style={{background: '#D7D8EF', color: '#21268F'}} onClick={closeModalInput}>Close</SuperButton>
        </Modal>
    </>
}