import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RegistrationThunk} from "./RegistrationReducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {Navigate} from "react-router-dom";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import s from '../../../n1-main/m1-ui/common/Container.module.css'
import {LoadingProgress} from "../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress";
import {initAppStateType} from "../../../n1-main/m2-bll/app-reducer";

export const Registration = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered)
    const {error, entityStatus} = useSelector<AppRootStateType, initAppStateType>(state => state.app)

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const registerUser = () => {
        dispatch(RegistrationThunk({email, password}))
    }

    if (isRegistered) {
        return <Navigate to={"/login"}/>
    }

    return <div>
        <div className={s.container}><h1>Register</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>Email :</div>
                <SuperInputText type="text" value={email} onChange={onChangeEmail}/>
                <div>Password :</div>
                <SuperInputText type="password" value={password} onChange={onChangePassword}/>
            </div>
            <SuperButton disabled={entityStatus === 'loading'} onClick={registerUser}>Register</SuperButton>
        </div>
        {entityStatus === 'loading' && <LoadingProgress/>}
    </div>
};