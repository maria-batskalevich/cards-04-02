import axios from 'axios';
import {ApiResponseTypes, AuthLoginResponseTypes, AuthLoginTypes} from "./ApiResponseTypes";


// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': ''
//     }
// }

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // ...settings
});

export const API = {
    appAPI: {
        fakeRequest: (param: string) =>
            instance.post<string, ApiResponseTypes>('', {param}),
    },
    loginAPI: {
        login: (param: AuthLoginTypes) => instance.post<AuthLoginTypes, ApiResponseTypes<{data: AuthLoginResponseTypes}>>('auth/login', param),
    },
    recoveryPasswordAPI: {
        recoveryPass: (param: string) =>
            instance.post<string, ApiResponseTypes>('', {param}),
    },
};