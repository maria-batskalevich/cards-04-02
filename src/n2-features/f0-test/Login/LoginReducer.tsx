import {API} from '../../../n1-main/m3-dal/API';
import {AuthLoginTypes} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Dispatch} from "redux";

export type initLoginStateType = {
    _id?: string | null;
};

const initLoginState = {};

export const LoginReducer = (state: initLoginStateType = initLoginState, action: LoginActionTypes,
): initLoginStateType => {
    switch (action.type) {
        case 'login/LOGIN_CASE':
            return {
                ...state, _id: action.payload._id
            };
        default:
            return state;
    }
};

export const LoginAction = (_id: string) =>
    ({type: 'login/LOGIN_CASE', payload: {_id}} as const);

export const LoginThunk = (param: AuthLoginTypes) => (dispatch: Dispatch) => {
    API.loginAPI.login(param)
        //.fakeRequest(param)
        .then(res => {
            const _id = res.data.data._id
            if(_id === null) {
                dispatch(LoginAction(res.data.data._id))
            }
            else console.warn('some error')
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            console.log('Error: ', error)
        })
}

export type LoginActionTypes = ReturnType<typeof LoginAction>;