import React, {useState} from "react";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import {ModalDoubleInput} from "./ModalDoubleInput";

type ModalDoubleInputContainerPropsType = {
    title: string
    messageName: string
    callback: (question: string, answer: string) => void
    currentCardsPackID: string
}
export const ModalDoubleInputContainer = (props: ModalDoubleInputContainerPropsType) => {
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)

    const [show, setShow] = useState<boolean>(false)

    const showModalInputHandler = () => setShow(true)
    const closeModalInputHandler = () => setShow(false)
    return <>
        <SuperButton onClick={showModalInputHandler} disabled={entityStatus === 'loading'}>{props.title}</SuperButton>
        <ModalDoubleInput title={props.title} messageName={props.messageName}
                    callback={props.callback} show={show} closeModalInput={closeModalInputHandler}/></>
}

