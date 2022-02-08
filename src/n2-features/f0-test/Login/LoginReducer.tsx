import {API} from '../../../n1-main/m3-dal/API';
import {AuthLoginTypes} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Dispatch} from "redux";

export type initLoginStateType = {
    _id?: string | null;
    error?: string;
    isLoggedIn: boolean
};

const initLoginState = {
    isLoggedIn: false
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
        default:
            return state;
    }
};

export const LoginAction = (isLoggedIn: boolean) =>
    ({type: 'login/LOGIN_CASE', payload: {isLoggedIn}} as const);
export const SetError = (error: string) =>
    ({type: 'login/SET_ERROR_CASE', payload: {error}} as const);

export const LoginThunk = (param: AuthLoginTypes) => (dispatch: Dispatch) => {
    API.loginAPI.login(param)
        //.fakeRequest(param)
        .then(res => {
            dispatch(LoginAction(true))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(SetError(error))
            console.log('Error: ', error)
        })
}

export type LoginActionTypes = ReturnType<typeof LoginAction> | ReturnType<typeof SetError>;