import React, {ChangeEvent, useState} from "react";
import {Modal} from "../Modal";
import SuperInputText from "../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";

type ModalInputPropsType = {
    title: string
    message: string
    callback: (newPackName: string) => void
    show: boolean
    showModalInput: () => void
    closeModalInput: () => void
}
export const ModalInput: React.FC<ModalInputPropsType> = ({
                                                              title,
                                                              message,
                                                              callback,
                                                              show,
                                                              showModalInput,
                                                              closeModalInput
                                                          }) => {
    const [value, setValue] = useState<string>('')
    const saveSetValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const updateValue = () => {
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
            {message}
            <SuperInputText value={value} onChange={saveSetValue} autoFocus/>
            <SuperButton onClick={updateValue}>{title}</SuperButton>
            <SuperButton onClick={closeModalInput}>Close</SuperButton>
        </Modal>
    </>
}