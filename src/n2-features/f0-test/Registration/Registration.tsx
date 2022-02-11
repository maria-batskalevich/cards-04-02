import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {initLoginStateType, RegistrationThunk} from "./RegistrationReducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {Navigate} from "react-router-dom";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {Loader} from "../../../n1-main/m1-ui/common/c4-Loadrer-Spinner/loader";

export const Registration = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {isRegistered, registerSend, isLoading} = useSelector<AppRootStateType, initLoginStateType>(state => state.registration)

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
    } else return (
        <div style={{
            padding: "20px",
            margin: "0 auto",
            width: "50vw",
            height: "50vh",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid black",
            borderRadius: '20px',
        }}>
            {isLoading
                ?
                <>
                    <Loader />
                </>
                :
                <>
                    <h1>REGISTRATION COMPONENT</h1>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>Email :</div>
                        <SuperInputText type="text" value={email} onChange={onChangeEmail}/>
                        <div>Password :</div>
                        <SuperInputText type="password" value={password} onChange={onChangePassword}/>

                    </div>
                    <SuperButton disabled={registerSend} onClick={registerUser}>Register</SuperButton>
                </>
            }

        </div>
    );
};