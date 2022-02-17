import {API} from '../../../n1-main/m3-dal/API';
import {AuthLoginTypes} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Dispatch} from "redux";

export type initLoginStateType = {
    _id?: string | null;
    error?: string;
    isLoggedIn: boolean;
    statusApp: StatusType;
    entityStatus: StatusType
};

const initLoginState = {
    isLoggedIn: false,
    statusApp: 'idle' as StatusType,
    entityStatus: 'idle' as StatusType,
};

export const LoginReducer = (state: initLoginStateType = initLoginState, action: LoginActionTypes,
): initLoginStateType => {
    switch (action.type) {
        case 'login/LOGIN_CASE':
            return {
                ...state, isLoggedIn: action.payload.isLoggedIn
            }
        case 'login/SET_ERROR_CASE':
            return {
                ...state, error: action.payload.error
            }
        case 'login/SET_STATUS_APP_CASE':
            return {
                ...state, statusApp: action.payload.statusApp
            }
        case 'login/SET_ENTITY_STATUS_CASE':
            return {
                ...state, entityStatus: action.payload.entityStatus
            }
        default:
            return state;
    }
};

export const LoginAction = (isLoggedIn: boolean) =>
    ({type: 'login/LOGIN_CASE', payload: {isLoggedIn}} as const);
export const SetError = (error: string) =>
    ({type: 'login/SET_ERROR_CASE', payload: {error}} as const);
export const SetStatusApp = (statusApp: StatusType) =>
    ({type: 'login/SET_STATUS_APP_CASE', payload: {statusApp}} as const);
export const SetEntityStatus = (entityStatus: StatusType) =>
    ({type: 'login/SET_ENTITY_STATUS_CASE', payload: {entityStatus}} as const);

export const LoginThunk = (param: AuthLoginTypes) => (dispatch: Dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.loginAPI.login(param)
        //.fakeRequest(param)
        .then(res => {
            dispatch(LoginAction(true))
            dispatch(SetStatusApp('succeeded'))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(SetError(error))
            console.log('Error: ', error)
        })
}
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type LoginActionTypes = ReturnType<typeof LoginAction>
    | ReturnType<typeof SetError>
    | ReturnType<typeof SetStatusApp>
    | ReturnType<typeof SetEntityStatus>