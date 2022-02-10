import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {SetUserThunk} from "./ProfileReducer";

export const Profile = () => {

    const {name, email} = useSelector<AppRootStateType, { name: string, email: string }>(state => state.profile)

    const [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(SetUserThunk())
        console.log(name, email)
    }, [dispatch])

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
            <h1>PROFILE COMPONENT</h1>

                <img
                    style={{borderRadius: '50%', width: '150px', height: '150px'}}
                    src="https://avatars.mds.yandex.net/i?id=a53f190616d5598d4d70d2488508ec89-5499599-images-thumbs&n=13"
                    alt=""/>
            {!editMode
                ?
                <>
                    <div>{name}</div>
                    <div>{email}</div>

                    <button onClick={() => setEditMode(true)}>Edit</button>
                </>
                :
                <>

                    <span>Name</span>
                    <input type="text" placeholder={name}/>
                    <span>Email</span>
                    <input type="text" placeholder={email}/>
                    <div>
                        <button>Cansel</button>
                        <button onClick={() => setEditMode(false)}>Save</button>
                    </div>
                </>
            }
        </div>
    );
};

