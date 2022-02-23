import React from "react";
import s from '../n1-main/m1-ui/common/Container.module.css'

type ModalPropsType = {
    enableBackground?: boolean;
    backgroundOnClick?: () => void;
    modalOnClick?: () => void;
    width?: number;
    height?: number;
    modalStyle?: any;
    show: boolean
}
export const Modal: React.FC<ModalPropsType> = ({
                                                    enableBackground,
                                                    backgroundOnClick,
                                                    modalOnClick,
                                                    width = 0,
                                                    height = 0,
                                                    modalStyle= {},
                                                    show,
                                                    children,
                                                }) => {

    const top = `calc(50vh - ${height / 2}px)`;
    const left = `calc(50vw - ${width / 2}px)`;

    if (!show) return null
    return <div>
        {enableBackground &&
        <div style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100vw',
            height: '100vh',
            background: 'black',
            opacity: 0.35,
            zIndex: 20,
        }} onClick={backgroundOnClick}/>}
        <div className={s.container} style={{
            position: 'fixed',
            top,
            left,
            width,
            height,
            ...modalStyle,

            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 21,
        }} onClick={modalOnClick}>{children}
        </div>
    </div>
}