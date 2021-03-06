import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {Navigate, useParams} from "react-router-dom";
import {NewPasswordThunk} from "./NewPasswordReducer";
import {initAppStateType} from "../../../n1-main/m2-bll/app-reducer";
import s from '../../../n1-main/m1-ui/common/Container.module.css'
import {LoadingProgress} from "../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress";


export const NewPassword = () => {

    const dispatch = useDispatch()

    const passwordChanged = useSelector<AppRootStateType, boolean>(state => state.newPassword.passwordChanged)

    const {error, entityStatus} = useSelector<AppRootStateType, initAppStateType>(state => state.app)
    const [password, setPassword] = useState<string>('1qazxcvBG')
    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const {token} = useParams<'token'>()
    const setNewPassword = () => {
        dispatch(NewPasswordThunk({
            password: password,
            resetPasswordToken: token
        }))
    }
    if (passwordChanged) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <div className={s.container}>
                <div>
                    <h1>New password</h1>
                    <div><SuperInputText type={'password'}
                                         placeholder={'new password'}
                                         value={password}
                                         onChange={changePassword}
                                         disabled={entityStatus === 'loading'}
                                         name={'New password'}
                    /></div>
                    <div>
                        <SuperButton onClick={setNewPassword} disabled={entityStatus === 'loading'}>Change</SuperButton>
                    </div>
                </div>
            </div>
            {entityStatus === 'loading' && <LoadingProgress/>}
        </div>
    );
};