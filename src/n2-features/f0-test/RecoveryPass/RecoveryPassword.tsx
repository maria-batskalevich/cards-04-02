import React, {ChangeEvent, useState} from 'react';
import SuperButton
    from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperInputText
    from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {SetError, StatusType} from "../Login/LoginReducer";
import {RecoverPassThunk} from "./RecoveryPasswordReducer";
import {Navigate} from "react-router-dom";


export const RecoveryPassword = (): React.ReactElement => {
    const dispatch = useDispatch()

    const recoveryLinkSent = useSelector<AppRootStateType, boolean>(state => state.recoveryPassword.recoveryLinkSent)
    const error = useSelector<AppRootStateType, string | undefined>(state => state.login.error)
    // const [error,setError] = useState()
    const [email, setEmail] = useState<string>('nya-admin@nya.nya')
    const from = "test-front-admin <ai73a@yandex.by>"
    const message = "<div style=\"background-color: lime; padding: 15px\">password recovery link:" +
        // "<a href='http://localhost:3000/#/set-new-password/$token$'>link</a>" +
        "<a href='https://maria-batskalevich.github.io/cards-04-02/#/newPass/$token$'>link</a>" +
        "</div>"
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.login.entityStatus)
    const statusApp = useSelector<AppRootStateType, StatusType>(state => state.login.statusApp)
    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
        dispatch(SetError(''))
    }
    const recoveryPass = () => {
        dispatch(RecoverPassThunk({email, from, message}))
    }
    if (recoveryLinkSent) {
        return <Navigate to={'/newPass/token'}/>
    }
    return <div>email
        <div><SuperInputText type={'email'} placeholder={'Email'}
                             value={email}
                             onChange={changeEmail}
                             disabled={statusApp === 'loading'}
                             error={error}

        /></div>Send link to reset password
        <div><SuperButton onClick={recoveryPass}
                          disabled={statusApp === 'loading'}>Send</SuperButton>
        </div>
    </div>
}
