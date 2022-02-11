import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {initLoginStateType, SetAvatarAction, SetNameAction, SetUserThunk, UpdateUserData} from "./ProfileReducer";
import {Loader} from "../../../n1-main/m1-ui/common/c4-Loadrer-Spinner/loader";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";

export const Profile = () => {

    const {name, email, isLoading, avatar} = useSelector<AppRootStateType, initLoginStateType>(state => state.profile)

    const [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()
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

    if (isLoading) {
        return (
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
                <h1>PROFILE COMPONENT</h1>
                <Loader/>
            </div>)
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
            <h1>PROFILE COMPONENT</h1>

            {!editMode
                ?
                <>
                    <img
                        style={{borderRadius: '50%', width: '150px', height: '150px'}}
                        src={avatar}
                        alt=""/>
                    <div>{name}</div>
                    <div>{email}</div>

                    <SuperButton onClick={() => setEditMode(true)}>Edit</SuperButton>
                </>
                :
                <>
                    <img
                        style={{borderRadius: '50%', width: '150px', height: '150px'}}
                        src={avatar}
                        alt=""/>
                    <div>Avatar: </div>
                    <input type="text" value={avatar} onChange={updateAvatar} placeholder={'http:'}/>
                    <span>Name :</span>
                    <input type="text" value={name} onChange={updateName} placeholder={name}/>
                    <span>Email :</span>
                    <div>{email}</div>
                    <div>
                        <SuperButton onClick={() => setEditMode(false)}>Cansel</SuperButton>
                        <SuperButton onClick={updateUserData}>Save</SuperButton>
                    </div>

                </>
            }
        </div>
    );
};

