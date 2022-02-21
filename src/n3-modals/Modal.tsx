import React, {useState} from "react";

type ModalPropsType = {
    enableBackground?: boolean;
    backgroundOnClick?: () => void;
    modalOnClick?: () => void;
    width?: number;
    height?: number;
    show: boolean
}
export const Modal: React.FC<ModalPropsType> = ({
                                                    enableBackground,
                                                    backgroundOnClick,
                                                    modalOnClick,
                                                    width,
                                                    height,
                                                    show,
                                                    children,
                                                }) => {

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
        <div style={{
            position: 'fixed',
            width,
            height,
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'lime',
            zIndex: 21,
        }} onClick={modalOnClick}>{children}
        </div>
    </div>
}