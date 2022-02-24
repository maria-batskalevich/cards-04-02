import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {Main} from './Main';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";
import {StatusType} from "../m2-bll/app-reducer";
import {LoadingProgress} from "./common/LoagingProgress/LoadingProgress";

export const App = (): React.ReactElement => {
    const statusApp = useSelector<AppRootStateType, StatusType>(state => state.app.statusApp)

    if(statusApp === 'loading') <LoadingProgress/>

    return < HashRouter>
        <div className="App">
            < Main />
        </div>
    </HashRouter>
};
