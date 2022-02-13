import axios from 'axios';
import {
    ApiResponseTypes,
    AuthLoginResponseTypes,
    AuthLoginTypes,
    RegisterParamsType,
    RecoveryParamsType,
    UpdateUserDataType, CardsPacksType
} from "./ApiResponseTypes";


// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': ''
//     }
// }

const instance = axios.create({
    //baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
    // ...settings
});

export const API = {
    appAPI: {
        fakeRequest: (param: string) =>
            instance.post<string, ApiResponseTypes>('', {param}),
    },
    loginAPI: {
        login: (param: AuthLoginTypes) => instance.post<AuthLoginTypes, ApiResponseTypes<{ data: AuthLoginResponseTypes }>>('auth/login', param),
    },
    recoveryPasswordAPI: {
        recoveryPass: (param: RecoveryParamsType) =>
            instance.post<RecoveryParamsType, ApiResponseTypes>('auth/forgot', param),
    },
    registration(param: RegisterParamsType) {
        return instance.post<{ addedUser: AuthLoginResponseTypes }>('/auth/register', param)
    },
    profileInfo() {
        return instance.post<any>('auth/me', {})
    },
    updateUser(param: UpdateUserDataType) {
        return instance.put("auth/me", param)
    },
    packsAPI: {
        getPacks: () =>
            instance.get<CardsPacksType>('cards/pack')
    }
};


// export const authAPI = {
//     login(data: LoginParamsType) {
//         return instance.post<AuthResponseType| {error: string}>('auth/login', {...data})
//     },
//     logOut(data: {}) {
//         return instance.delete<{info: string} | {error: string}>('auth/me', {})
//     },
//     registration(data: {email: string, password: string}) {
//         return instance.post<{addedUser: AuthResponseType}>('/auth/register', data)
//     },
//     me(data: {}) {
//         return instance.post<AuthResponseType>('/auth/me', data)
//     }
// }