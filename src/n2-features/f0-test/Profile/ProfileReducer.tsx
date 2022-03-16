import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/API";
import {UpdateUserDataType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {LoginAction} from "../Login/LoginReducer";
import {handleInternetError} from "../../../n1-main/m1-ui/common/utils";
import {SetEntityStatus, SetStatusApp} from "../../../n1-main/m2-bll/app-reducer";

export type initLoginStateType = {
    avatar: string
    isLoading: boolean
    name: string
    email: string
    _id: string | null | undefined
};

const initLoginState = {
    avatar: '',
    name: '',
    email: '',
    isLoading: true,
    _id: null
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
        case 'SET-ID':
            return {...state, _id: action._id}
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
export const SetUserId = (_id: string | null | undefined) =>
    ({type: 'SET-ID', _id} as const);

export type ProfileActionTypes =
    | ReturnType<typeof SetNameAction>
    | ReturnType<typeof SetEmailAction>
    | ReturnType<typeof SetLoadingAction>
    | ReturnType<typeof SetAvatarAction>
    | ReturnType<typeof SetUserId>
    | ReturnType<typeof LoginAction>

export const SetUserThunk = () => (dispatch: Dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.profileInfo()
        .then(res => {
            dispatch(SetNameAction(res.data.name))
            dispatch(SetEmailAction(res.data.email))
            dispatch(SetAvatarAction(res.data.avatar))
            dispatch(SetUserId(res.data._id))
            dispatch(SetLoadingAction(false))
            dispatch(SetStatusApp('succeeded'))
            dispatch(SetEntityStatus('succeeded'))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            handleInternetError(dispatch, error)
        })
}
export const LogOutThunk = () => (dispatch: Dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.logAPI.logOut()
        .then(res => {
            dispatch(SetNameAction(''))
            dispatch(SetEmailAction(''))
            dispatch(SetAvatarAction(''))
            dispatch(SetUserId(null))
            dispatch(SetLoadingAction(false))
            dispatch(LoginAction(false))
            dispatch(SetStatusApp('succeeded'))
            dispatch(SetEntityStatus('succeeded'))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            handleInternetError(dispatch, error)
        })
}

export const UpdateUserData = (param: UpdateUserDataType) => (dispatch: Dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    dispatch(SetLoadingAction(true))
    API.updateUser(param)
        .then(res => {
            dispatch(SetAvatarAction(res.data.updatedUser.avatar))
            dispatch(SetNameAction(res.data.updatedUser.name))
            dispatch(SetLoadingAction(false))
            dispatch(SetStatusApp('succeeded'))
            dispatch(SetEntityStatus('succeeded'))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            handleInternetError(dispatch, error)
        })
}