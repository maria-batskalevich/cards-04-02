import React, {useState} from 'react'
import {Modal} from "../Modal";

type ModalMessagePropsType = {
    error?: string
    message?: string
}
export const ModalMessage = (props: ModalMessagePropsType) => {

    const [show, setShow] = useState<boolean>(true)

    const innerTimer = setInterval(() => {
        setShow(false)
        clearInterval(innerTimer)
    }, 3000)

    const closeModalHandler = () => setShow(false)

    return <div>
        {props.error && <Modal enableBackground={false}
                               height={50}
                               modalStyle={{backgroundColor: '#F1453D', width: 'fit-content', top: '80%', left: '80%',}}
                               modalOnClick={closeModalHandler}
                               backgroundOnClick={closeModalHandler}
                               show={show}>
            {props.error}
        </Modal>}
        {props.message && <Modal enableBackground={false}
                                 height={50}
                                 modalStyle={{
                                     backgroundColor: '#21268F',
                                     width: '100px',
                                     top: '80%',
                                     left: '10%',
                                 }}
                                 modalOnClick={closeModalHandler}
                                 backgroundOnClick={closeModalHandler}
                                 show={show}>
            {props.message}
        </Modal>}
    </div>
}