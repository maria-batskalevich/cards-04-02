import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/API";

export type initLoginStateType = {
    name: string
    email: string
};

const initLoginState = {
    name: '',
    email: '',
};

export const ProfileReducer = (state: initLoginStateType = initLoginState, action: ProfileActionTypes,): initLoginStateType => {
    switch (action.type) {
        case 'CHANGE-NAME':
            return {...state, name: action.name};
        case 'CHANGE-EMAIL':
            return {...state, email: action.email};
        default:
            return state;
    }
};

export const SetNameAction = (name: string) =>
    ({type: 'CHANGE-NAME', name} as const);

export const SetEmailAction = (email: string) =>
    ({type: 'CHANGE-EMAIL', email} as const);

export type ProfileActionTypes = ReturnType<typeof SetNameAction> | ReturnType<typeof SetEmailAction>

export const SetUserThunk = () => (dispatch: Dispatch) => {
    API.profileInfo()
        .then(res => {
            dispatch(SetNameAction(res.data.name))
            dispatch(SetEmailAction(res.data.email))
        })
        .catch(err => {
            console.log(err.data)
        })
}