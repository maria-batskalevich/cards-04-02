import {
    RecoveryParamsType
} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/API";
import {SetEntityStatus, SetError, SetStatusApp} from "../../../n1-main/m2-bll/app-reducer";
import {handleInternetError} from "../../../n1-main/m1-ui/common/utils";

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
                ...state,
                recoveryLinkSent: action.payload.recoveryLinkSent
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
    API.recoveryPass(param)
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
            handleInternetError(dispatch, error)
        })

}