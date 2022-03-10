import React, {useState} from 'react'
import SuperButton from "../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {Modal} from "./Modal";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../n1-main/m2-bll/store";
import {StatusType} from "../n1-main/m2-bll/app-reducer";

type ModalContainerPropsType = {
    title: string
    message: string
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
            show={show}>
            {props.message}
            <SuperButton onClick={props.callback}>{props.title}</SuperButton>
            <SuperButton style={{background: '#D7D8EF', color: '#21268F'}} onClick={closeModalHandler}>Close</SuperButton>
        </Modal>
    </div>
}