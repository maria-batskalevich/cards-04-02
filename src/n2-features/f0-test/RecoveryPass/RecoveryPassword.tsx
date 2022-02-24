import React, {ChangeEvent, useState} from 'react';
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {RecoverPassThunk} from "./RecoveryPasswordReducer";
import {Navigate} from "react-router-dom";
import {initAppStateType} from "../../../n1-main/m2-bll/app-reducer";
import s from '../../../n1-main/m1-ui/common/Container.module.css'
import {LoadingProgress} from "../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress";


export const RecoveryPassword = (): React.ReactElement => {
    const dispatch = useDispatch()

    const recoveryLinkSent = useSelector<AppRootStateType, boolean>(state => state.recoveryPassword.recoveryLinkSent)
    const {entityStatus, statusApp} = useSelector<AppRootStateType, initAppStateType>(state => state.app)
    const [email, setEmail] = useState<string>('nya-admin@nya.nya')
    const from = "test-front-admin <ai73a@yandex.by>"
    const message = "<div style=\"background-color: lime; padding: 15px\">password recovery link:" +
        "<a href='https://maria-batskalevich.github.io/cards-04-02/#/newPass/$token$'>link</a>" +
        "</div>"
    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }
    const recoveryPass = () => {
        dispatch(RecoverPassThunk({email, from, message}))
    }
    if (recoveryLinkSent) {
        return <Navigate to={'/newPass:token'}/>
    }
    return <div>
        <div className={s.container}><h1>Recovery Password</h1>
            email
            <div><SuperInputText type={'email'} placeholder={'Email'}
                                 value={email}
                                 onChange={changeEmail}
                                 disabled={statusApp === 'loading'}
            /></div>Send link to reset password
            <div><SuperButton onClick={recoveryPass}
                              disabled={statusApp === 'loading'}>Send</SuperButton>
            </div>
        </div>
        {entityStatus === 'loading' && <LoadingProgress/>}
    </div>
}
