import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {AppReducer} from './app-reducer';

const rootReducer = combineReducers({
    app: AppReducer,
    // login: LoginReducer
    // newPassword: NewPassowdReducer,
    // profile: ProfileReducer,
    // recoveryPassword: RecoveryPasswordReducer,
    // registration: RegistrationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;