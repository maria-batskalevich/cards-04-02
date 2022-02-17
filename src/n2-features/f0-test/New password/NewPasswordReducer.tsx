import {NewPasswordParamsType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/API";
import {SetEntityStatus, SetError, SetStatusApp} from "../../../n1-main/m2-bll/app-reducer";

export type initPWCStateType = {
    passwordChanged: boolean;
};

const initPWCState = {
    passwordChanged: false
};

export const NewPasswordReducer = (
    state: initPWCStateType = initPWCState,
    action: NewPasswordActionTypes,
): initPWCStateType => {
    switch (action.type) {
        case 'NEW_PASSWORD_CASE':
            return {
                ...state,
                passwordChanged: action.payload.passwordChanged,
            };
        default:
            return state;
    }
};

export const NewPasswordAction = (passwordChanged: boolean) =>
    ({type: 'NEW_PASSWORD_CASE', payload: {passwordChanged}} as const);

export type NewPasswordActionTypes = ReturnType<typeof NewPasswordAction>;
export const NewPasswordThunk = (param: NewPasswordParamsType) => (dispatch: Dispatch) => {

    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.newPassword(param)
        .then(res => {
            dispatch(NewPasswordAction(true))
            dispatch(SetStatusApp('succeeded'))
            dispatch(SetEntityStatus('succeeded'))
            dispatch(NewPasswordAction(true))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(SetError(error))
            dispatch(SetEntityStatus('succeeded'))
            dispatch(SetStatusApp('succeeded'))
        })

}