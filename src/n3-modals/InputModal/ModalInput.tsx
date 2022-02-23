import React, {ChangeEvent, useState} from "react";
import {Modal} from "../Modal";
import SuperInputText from "../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";

type ModalInputPropsType = {
    title: string
    messageName: string
    messageAnswer?: string
    callback: (newPackName: string) => void
    show: boolean
    closeModalInput: () => void
}
export const ModalInput: React.FC<ModalInputPropsType> = ({
                                                              title,
                                                              messageName,
                                                              messageAnswer,
                                                              callback,
                                                              show,
                                                              closeModalInput
                                                          }) => {
    const [value, setValue] = useState<string>('')
    const [answer, setAnswer] = useState<any>(undefined)

    const saveValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const saveAnswer = (e: ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)

    const onClickHandler = () => {
        callback(value)
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
            <SuperInputText value={value} onChange={saveValue} autoFocus/>
            {messageAnswer !== undefined && <>{messageAnswer}<SuperInputText value={answer} onChange={saveAnswer} autoFocus/></>}
            <SuperButton onClick={onClickHandler}>{title}</SuperButton>
            <SuperButton onClick={closeModalInput}>Close</SuperButton>
        </Modal>
    </>
}