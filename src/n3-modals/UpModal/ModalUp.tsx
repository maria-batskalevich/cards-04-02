import React, {useEffect, useState} from "react";
import {Modal} from "../Modal";

type ModalUpPropsType = {
    speed?: number
}
export const ModalUp: React.FC<ModalUpPropsType> = ({speed = 10}) => {

    const [show, setShow] = useState<boolean>(false)

    const handleScroll = () => {
        if (window.pageYOffset > 100) setShow(true)
        else setShow(false)
    }
    const scroll = () => {
        const step = window.pageYOffset / speed
        let lastState = window.pageYOffset
        const innerTimer = setInterval(() => {
            if (lastState < window.pageYOffset) clearInterval(innerTimer)
            lastState = window.pageYOffset

            window.scroll(0, lastState - step)
            if (window.pageYOffset === 0) clearInterval(innerTimer)
        }, 50)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    return <div>
        <Modal enableBackground={false}
               width={70}
               height={50}
               modalStyle={{top: '20%', left: '80%'}}
               modalOnClick={scroll}
               show={show}>
            Up
        </Modal></div>
}