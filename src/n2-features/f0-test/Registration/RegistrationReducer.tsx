import {API} from "../../../n1-main/m3-dal/API";
import {RegisterParamsType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Dispatch} from "redux";
import {handleInternetError} from "../../../n1-main/m1-ui/common/utils";
import {SetEntityStatus, SetStatusApp} from "../../../n1-main/m2-bll/app-reducer";

export type initLoginStateType = {
    isRegistered: boolean;
    registerSend: boolean
    isLoading: boolean
};

const initLoginState = {
    isRegistered: false,
    registerSend: false,
    isLoading: false,
};

export const RegistrationReducer = (
    state: initLoginStateType = initLoginState,
    action: RegistrationActionTypes,): initLoginStateType => {
    switch (action.type) {
        case 'IS_REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        case 'REGISTER_SEND':
            return {...state, registerSend: action.registerSend}
        case 'SET-LOADING':
            return {...state, isLoading: action.isLoading};
        default:
            return state;
    }
};

export const RegistrationAction = (isRegistered: boolean) =>
    ({type: 'IS_REGISTERED', isRegistered} as const);

export const RegisterSendAction = (registerSend: boolean) =>
    ({type: 'REGISTER_SEND', registerSend: registerSend } as const);

export const SetLoadingAction = (isLoading: boolean) =>
    ({type: 'SET-LOADING', isLoading} as const);

export type RegistrationActionTypes =
    | ReturnType<typeof RegistrationAction>
    | ReturnType<typeof RegisterSendAction>
    | ReturnType<typeof SetLoadingAction>

export const RegistrationThunk = (param: RegisterParamsType) => (dispatch: Dispatch) => {
    dispatch(RegisterSendAction(true))
    dispatch(SetLoadingAction(true))
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.registration(param)
        .then(res => {
            if (res.status === 201) {
                dispatch(RegistrationAction(true))
                dispatch(RegisterSendAction(false))
                dispatch(SetLoadingAction(false))
                dispatch(SetStatusApp('succeeded'))
                dispatch(SetEntityStatus('succeeded'))
                alert(res.statusText)
            }
            console.log(res)
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            handleInternetError(dispatch, error)
        })
}