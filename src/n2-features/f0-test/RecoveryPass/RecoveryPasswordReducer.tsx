import {
    AuthLoginTypes,
    RecoveryParamsType
} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/API";
import {
    LoginAction,
    SetEntityStatus, SetError,
    SetStatusApp
} from "../Login/LoginReducer";

export type initRecoveryStateType = {
    recoveryLinkSent: boolean;
};

const initRecoveryState = {
    recoveryLinkSent: false
};

export const RecoveryPasswordReducer = (
    state: initRecoveryStateType = initRecoveryState,
    action: RecoveryPassActionTypes,
): initRecoveryStateType => {
    switch (action.type) {
        case 'RECOVERY_PASSWORD_CASE':
            return {
                ...state, recoveryLinkSent: action.payload.recoveryLinkSent
            };
        default:
            return state;
    }
};

export const RecoveryPassAction = (recoveryLinkSent: boolean) =>
    ({type: 'RECOVERY_PASSWORD_CASE', payload: {recoveryLinkSent}} as const);

export type RecoveryPassActionTypes = ReturnType<typeof RecoveryPassAction>;
export const RecoverPassThunk = (param: RecoveryParamsType) => (dispatch: Dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))

    API.recoveryPasswordAPI.recoveryPass(param)
        //.fakeRequest(param)
        .then(res => {
            dispatch(RecoveryPassAction(true))
            dispatch(SetStatusApp('succeeded'))
            dispatch(SetEntityStatus('succeeded'))
            dispatch(RecoveryPassAction(false))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(SetError(error))
            console.log('Error: ', error)
            dispatch(SetEntityStatus('succeeded'))
        })

}