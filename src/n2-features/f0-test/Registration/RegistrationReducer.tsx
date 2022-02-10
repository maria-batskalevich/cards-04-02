import {API} from "../../../n1-main/m3-dal/API";
import {RegisterParamsType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Dispatch} from "redux";

export type initLoginStateType = {
    isRegistered: boolean;
};

const initLoginState = {
    isRegistered: false
};

export const RegistrationReducer = (state: initLoginStateType = initLoginState, action: RegistrationActionTypes,): initLoginStateType => {
    switch (action.type) {
        case 'REGISTRATION_CASE':
            return {
                isRegistered: action.isRegistered
            };
        default:
            return state;
    }
};

export const RegistrationAction = (isRegistered: boolean) =>
    ({type: 'REGISTRATION_CASE', isRegistered} as const);

export type RegistrationActionTypes = ReturnType<typeof RegistrationAction>;

export const RegistrationThunk = (param: RegisterParamsType) => (dispatch: Dispatch) => {
    API.registration(param)
        .then(res => {
            if (res.status === 201) {
                dispatch(RegistrationAction(true))
                alert(res.statusText)
            }
            console.log(res)
        })
        .catch(err => {
            const error = err.response
            alert(error.data.error)
        })
}