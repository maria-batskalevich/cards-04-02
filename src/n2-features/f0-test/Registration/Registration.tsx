import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RegistrationThunk} from "./RegistrationReducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";

export const Registration = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    // const reg = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered)

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const registerUser = () => {
        dispatch(RegistrationThunk({email, password}))
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
            <h1>REGISTRATION COMPONENT</h1>
            <input type="text" value={email} onChange={onChangeEmail}/>
            <input type="password" value={password} onChange={onChangePassword}/>
            <button onClick={registerUser}>Register</button>
        </div>
    );
};