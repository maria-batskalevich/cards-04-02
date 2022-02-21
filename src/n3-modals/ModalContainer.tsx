import React, {useState} from 'react'
import SuperButton from "../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {Modal} from "./Modal";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../n1-main/m2-bll/store";
import {initAppStateType, StatusType} from "../n1-main/m2-bll/app-reducer";

type ModalContainerPropsType = {
    title: string
    messange: string
    callback?: () => void
}
export const ModalContainer = (props: ModalContainerPropsType) => {
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)

    const [show, setShow] = useState<boolean>(false)
    const showModalHandler = () => setShow(true)
    const closeModalHandler = () => setShow(false)

    return <div>
        <SuperButton onClick={showModalHandler} disabled={entityStatus === 'loading'}>{props.title}</SuperButton>
        <Modal
            enableBackground={true}
            backgroundOnClick={closeModalHandler}
            modalOnClick={closeModalHandler}
            width={300}
            height={200}
            show={show}>{props.messange}
            <SuperButton onClick={props.callback}>{props.title}</SuperButton>
            <SuperButton onClick={closeModalHandler}>Close</SuperButton>
        </Modal>
    </div>
}