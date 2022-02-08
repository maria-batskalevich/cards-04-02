import React from "react";
import s from './LoagingProgress.module.css'
export const LoadingProgress = () => {
    return <div className={s.wrapper}>
        <div className={s.loader}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>

    </div>
}