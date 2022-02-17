import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {Navigate, useParams} from "react-router-dom";
import {NewPasswordThunk} from "./NewPasswordReducer";
import {initAppStateType, SetError} from "../../../n1-main/m2-bll/app-reducer";


export const NewPassword = () => {

    const dispatch = useDispatch()

    const passwordChanged = useSelector<AppRootStateType, boolean>(state => state.newPassword.passwordChanged)

    const {error, entityStatus} = useSelector<AppRootStateType, initAppStateType>(state => state.app)
    const [password, setPassword] = useState<string>('1qazxcvBG')
    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
        dispatch(SetError(''))
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
            <div>New password
                <div><SuperInputText type={'password'}
                                     placeholder={'new password'}
                                     value={password}
                                     onChange={changePassword}
                                     disabled={entityStatus === 'loading'}
                                     error={error}
                /></div>Change password
                <div><SuperButton onClick={setNewPassword}
                                  disabled={entityStatus === 'loading'}>Change</SuperButton>
                </div>
            </div>
        </div>
    );
};