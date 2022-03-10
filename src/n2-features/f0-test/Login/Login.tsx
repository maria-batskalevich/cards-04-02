import React, {ChangeEvent, useState} from 'react';
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {LoginThunk} from "./LoginReducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from 'react-router-dom';
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {LoadingProgress} from '../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress';
import s from '../../../n1-main/m1-ui/common/Container.module.css'
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";

export const Login = (): React.ReactElement => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)

    //state
    const [email, setEmail] = useState<string>('nya-admin@nya.nya')
    const [password, setPassword] = useState<string>('1qazxcvBG')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    //functions
    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
    const changePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
    const changeRememberMe = () => setRememberMe(!rememberMe)
    const login = () => {
        dispatch(LoginThunk({email, password, rememberMe}))
    }

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    return <div>
        <div className={s.container}>
            <h1>Sign In</h1>
            <div><SuperInputText type={'email'} placeholder={'Email'} value={email} name={'Email'}
                                 onChange={changeEmail} disabled={entityStatus === 'loading'}/></div>
            <div><SuperInputText type={'password'} placeholder={'Password'} value={password} name={'Password'}
                                 onChange={changePassword} disabled={entityStatus === 'loading'}/></div>
            <div><span>Remember me</span>
                <SuperCheckbox type={'checkbox'} checked={rememberMe}
                               onChange={changeRememberMe} disabled={entityStatus === 'loading'}/>
            </div>
            <div><a href={'RECOVERY_PASS_ROUTE#/recoveryPass'}>forgot?</a></div>
            <div><SuperButton onClick={login} disabled={entityStatus === 'loading'}>Login</SuperButton></div>
            <div><a href={''}>Don't have an account?</a></div>
            <div><SuperButton>Sign Up</SuperButton></div>
        </div>
        {entityStatus === 'loading' && <LoadingProgress/>}
    </div>
}