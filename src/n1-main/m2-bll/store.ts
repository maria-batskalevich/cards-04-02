import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {AppReducer} from './app-reducer';
import {LoginReducer} from "../../n2-features/f0-test/Login/LoginReducer";
import {NewPasswordReducer} from "../../n2-features/f0-test/New password/NewPasswordReducer";
import {ProfileReducer} from "../../n2-features/f0-test/Profile/ProfileReducer";
import {RecoveryPasswordReducer} from "../../n2-features/f0-test/RecoveryPass/RecoveryPasswordReducer";
import {RegistrationReducer} from "../../n2-features/f0-test/Registration/RegistrationReducer";

const rootReducer = combineReducers({
    app: AppReducer,
    login: LoginReducer,
    newPassword: NewPasswordReducer,
    profile: ProfileReducer,
    recoveryPassword: RecoveryPasswordReducer,
    registration: RegistrationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;