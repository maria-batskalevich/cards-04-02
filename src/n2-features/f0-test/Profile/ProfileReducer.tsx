import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/API";
import {UpdateUserDataType} from "../../../n1-main/m3-dal/ApiResponseTypes";

export type initLoginStateType = {
    avatar: string
    isLoading: boolean
    name: string
    email: string
};

const initLoginState = {
    avatar: '',
    name: '',
    email: '',
    isLoading: true,
};

export const ProfileReducer = (state: initLoginStateType = initLoginState, action: ProfileActionTypes,): initLoginStateType => {
    switch (action.type) {
        case 'CHANGE-NAME':
            return {...state, name: action.name};
        case 'CHANGE-EMAIL':
            return {...state, email: action.email};
        case 'SET-AVATAR':
            return {...state, avatar: action.avatar};
        case 'SET-LOADING':
            return {...state, isLoading: action.isLoading};
        default:
            return state;
    }
};

export const SetNameAction = (name: string) =>
    ({type: 'CHANGE-NAME', name} as const);

export const SetEmailAction = (email: string) =>
    ({type: 'CHANGE-EMAIL', email} as const);

export const SetLoadingAction = (isLoading: boolean) =>
    ({type: 'SET-LOADING', isLoading} as const);

export const SetAvatarAction = (avatar: string) =>
    ({type: 'SET-AVATAR', avatar} as const);

export type ProfileActionTypes =
    | ReturnType<typeof SetNameAction>
    | ReturnType<typeof SetEmailAction>
    | ReturnType<typeof SetLoadingAction>
    | ReturnType<typeof SetAvatarAction>

export const SetUserThunk = () => (dispatch: Dispatch) => {
    API.profileInfo()
        .then(res => {
            dispatch(SetNameAction(res.data.name))
            dispatch(SetEmailAction(res.data.email))
            dispatch(SetAvatarAction(res.data.avatar))
            dispatch(SetLoadingAction(false))
        })
        .catch(err => {
            alert(err.data)
        })
}

export const UpdateUserData = (param: UpdateUserDataType) => (dispatch: Dispatch) => {
    dispatch(SetLoadingAction(true))
    API.updateUser(param)
        .then(res => {
            console.log(res)
            dispatch(SetAvatarAction(res.data.updatedUser.avatar))
            dispatch(SetNameAction(res.data.updatedUser.name))
            dispatch(SetLoadingAction(false))
        })
        .catch(err => {
            alert(err.data)
        })
}