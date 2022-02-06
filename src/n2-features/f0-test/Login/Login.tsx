import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {LoginThunk} from "./LoginReducer";
import {useDispatch, useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';

export const Login = (): React.ReactElement => {
        console.log('login')

        const dispatch = useDispatch()
        const _id = useSelector<AppRootStateType>(state => state.login._id)
        //state
        const [email, setEmail] = useState<string>('nya-admin@nya.nya')
        const [password, setPassword] = useState<string>('1qazxcvBG')
        const [rememberMe, setRememberMe] = useState<boolean>(false)
        //functions
        const changeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
        const changePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
        const changeRememberMe = (e: ChangeEvent<HTMLInputElement>) => setRememberMe(!rememberMe)
        const login = (e: MouseEvent<HTMLButtonElement>) => {
                if(_id !== null) dispatch(LoginThunk({email, password, rememberMe}))
                console.log({email, password, rememberMe})
        }
        if(_id !== null) {
                return <Navigate to={'/profile'}/>
        }
        return  <div className={'loginContainer'}>
                <h1>Sign In</h1>
                <div><input type={'email'} placeholder={'Email'} value={email} onChange={changeEmail}/></div>
                <div><input type={'password'} placeholder={'Password'} value={password} onChange={changePassword}/></div>
                <div><span>Remember me</span><input type={'checkbox'} checked={rememberMe} onChange={changeRememberMe}/></div>
                <div><a href={''}>forgot?</a></div>
                <div><button onClick={login}>Login</button></div>
                <div><a href={''}>Don't have an account?</a></div>
                <div><button>Sign Up</button></div>
        </div>
}