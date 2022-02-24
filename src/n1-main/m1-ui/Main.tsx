import React from 'react';
import {Header} from './header/Header';
import {AppRoutes} from "./routes/AppRoutes";
import {AppRootStateType} from "../m2-bll/store";
import {useSelector} from "react-redux";
import {ModalMessage} from "../../n3-modals/MessageModal/ModalMessage";
import {initAppStateType} from "../m2-bll/app-reducer";


export const Main = (): React.ReactElement => {
    const {error, entityStatus} = useSelector<AppRootStateType, initAppStateType>(state => state.app)

    return <div>
        <Header/>
        <AppRoutes/>
        {error && <ModalMessage error={error}/>}
        {entityStatus && <ModalMessage message={entityStatus}/>}
    </div>
};