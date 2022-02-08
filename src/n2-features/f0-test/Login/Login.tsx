import React, {ChangeEvent, useState} from 'react';
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {LoginThunk, StatusType} from "./LoginReducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from 'react-router-dom';
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {LoadingProgress} from '../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress';

export const Login = (): React.ReactElement => {
    console.log('login')

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const error = useSelector<AppRootStateType, string | undefined>(state => state.login.error)
    const statusApp = useSelector<AppRootStateType, StatusType>(state => state.login.statusApp)
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.login.entityStatus)

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
        console.log({email, password, rememberMe})
    }

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    return <div>
        {statusApp === 'loading' && <LoadingProgress/>}
        <h1>Sign In</h1>
        <div><SuperInputText type={'email'} placeholder={'Email'} value={email}
                             onChange={changeEmail} disabled={entityStatus === 'loading'}/></div>
        <div><SuperInputText type={'password'} placeholder={'Password'} value={password}
                             onChange={changePassword} disabled={entityStatus === 'loading'}/></div>
        {error && <div>{error}</div>}
        <div><span>Remember me</span>
            <SuperCheckbox type={'checkbox'} checked={rememberMe}
                           onChange={changeRememberMe} disabled={entityStatus === 'loading'}/>
        </div>
        <div><a href={''}>forgot?</a></div>
        <div><SuperButton onClick={login} disabled={entityStatus === 'loading'}>Login</SuperButton></div>
        <div><a href={''}>Don't have an account?</a></div>
        <div><SuperButton>Sign Up</SuperButton></div>
    </div>
}