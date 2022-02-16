import React, {ChangeEvent, useState} from 'react';
import SuperButton
    from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperInputText
    from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";

import {RecoverPassThunk} from "./RecoveryPasswordReducer";
import {Navigate} from "react-router-dom";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";

export const RecoveryPassword = (): React.ReactElement => {
    const dispatch = useDispatch()
    const recoveryLinkSent = useSelector<AppRootStateType, boolean>(state => state.recoveryPassword.recoveryLinkSent)
    const error = useSelector<AppRootStateType, string | undefined>(state => state.app.error)
    const [email, setEmail] = useState<string>('nya-admin@nya.nya')
    const from = "test-front-admin <ai73a@yandex.by>"
    const message = "<div style=\"background-color: lime; padding: 15px\">password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>"
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)
    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
    const recoveryPass = () =>{

        dispatch(RecoverPassThunk({email, from , message}))
        console.log({email, from, message})
    }
    if (recoveryLinkSent) {
        return <Navigate to={'/newPass'}/>
    }
    return <div>email
        <div><SuperInputText type={'email'} placeholder={'Email'}
                             value={email}
                             onChange={changeEmail}
                             disabled={entityStatus === 'loading'}
                             error={error}
        /></div>Send link to reset password
        <div><SuperButton onClick={recoveryPass} disabled={entityStatus === 'loading'}>Send</SuperButton></div>
    </div>
}
