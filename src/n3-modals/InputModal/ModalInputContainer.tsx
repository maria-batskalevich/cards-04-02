import React, {useState} from "react";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {StatusType} from "../../n1-main/m2-bll/app-reducer";
import {ModalInput} from "./ModalInput";

type ModalInputContainerPropsType = {
    title: string
    messageName: string
    messageAnswer?: string
    callback: (newPackName: string) => void
}
export const ModalInputContainer = (props: ModalInputContainerPropsType) => {
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)

    const [show, setShow] = useState<boolean>(false)

    const showModalInputHandler = () => setShow(true)
    const closeModalInputHandler = () => setShow(false)
    return <>
        <SuperButton onClick={showModalInputHandler} disabled={entityStatus === 'loading'}>{props.title}</SuperButton>
        <ModalInput title={props.title} messageName={props.messageName} messageAnswer={props.messageAnswer}
                    callback={props.callback} show={show} closeModalInput={closeModalInputHandler}/></>
}

