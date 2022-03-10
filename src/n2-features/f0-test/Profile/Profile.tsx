import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {initLoginStateType, SetAvatarAction, SetNameAction, SetUserThunk, UpdateUserData} from "./ProfileReducer";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import s from '../../../n1-main/m1-ui/common/Container.module.css'
import {LoadingProgress} from "../../../n1-main/m1-ui/common/LoagingProgress/LoadingProgress";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";

export const Profile = () => {

    const {name, email, avatar} = useSelector<AppRootStateType, initLoginStateType>(state => state.profile)

    const [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)

    useEffect(() => {
        dispatch(SetUserThunk())
        console.log(name, email)
    }, [dispatch])

    const updateUserData = () => {
        setEditMode(false)
        dispatch(UpdateUserData({name: name, avatar: avatar}))
    }

    const updateName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(SetNameAction(e.currentTarget.value))
    }
    const updateAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(SetAvatarAction(e.currentTarget.value))
    }

    return <div>
        {!editMode
            ?
            <div className={s.container}>
                <h1>Profile</h1>
                <img
                    style={{borderRadius: '50%', width: '150px', height: '150px'}}
                    src={avatar}
                    alt=""/>
                <div>{name}</div>
                <div>{email}</div>

                <SuperButton onClick={() => setEditMode(true)}>Edit</SuperButton>
            </div>
            :
            <div className={s.container}><h1>Profile</h1>
                <img
                    style={{borderRadius: '50%', width: '150px', height: '150px'}}
                    src={avatar}
                    alt=""/>
                <div><span>Avatar: </span><SuperInputText type="text" value={avatar} onChange={updateAvatar}
                                                 placeholder={'http:'}/></div>
                <div><span>Name :</span>
                    <SuperInputText type="text" value={name} onChange={updateName} placeholder={name}/></div>
                <div><span>Email :</span>
                    <span>{email}</span>
                </div>
                <div>
                    <SuperButton style={{background: '#D7D8EF', color: '#21268F'}} onClick={() => setEditMode(false)}>Cansel</SuperButton>
                    <SuperButton onClick={updateUserData}>Save</SuperButton>
                </div>
            </div>
        }
        {entityStatus === 'loading' && <LoadingProgress/>}
    </div>
};

