import axios from 'axios';
import {initLoginStateType} from '../../n2-features/f0-test/Profile/ProfileReducer';
import {
    ApiResponseTypes,
    AuthLoginResponseTypes,
    AuthLoginTypes,
    RegisterParamsType,
    RecoveryParamsType,
    UpdateUserDataType,
    NewPasswordParamsType,
    CardsPacksResponseType,
    CardsPacksType,
    CardPacksResponseType,
    GetCardsQueryParams,
    CardsResponseType,
    PostCardsQueryParams,
    CardType,
    PutCardsQueryParams,
    UpdateGradeQueryParams, UpdatedGradeType, LogOutResponse,
} from "./ApiResponseTypes";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
    // ...settings
});

export const API = {
    logAPI: {
        login: (param: AuthLoginTypes) => instance.post<AuthLoginTypes, ApiResponseTypes<{ data: AuthLoginResponseTypes }>>('auth/login', param),
        logOut: () => instance.delete<LogOutResponse>('auth/me', {})
    },
    recoveryPass(param: RecoveryParamsType) {
        return instance.post<RecoveryParamsType, ApiResponseTypes>('auth/forgot', param)
    },
    newPassword(param: NewPasswordParamsType) {
        return instance.post<NewPasswordParamsType, ApiResponseTypes>('auth/set-new-password', param)
    },
    registration(param: RegisterParamsType) {
        return instance.post<{ addedUser: AuthLoginResponseTypes }>('/auth/register', param)
    },
    profileInfo() {
        return instance.post<AuthLoginTypes, ApiResponseTypes<initLoginStateType>>('auth/me', {})
    },
    updateUser(param: UpdateUserDataType) {
        return instance.put("auth/me", param)
    },
    packsAPI: {
        getPack: (payload?: CardsPacksResponseType) =>
            instance.get<CardsPacksResponseType>('cards/pack', {params: payload}),
        addPack: (packName: string) =>
            instance.post<{ newCardPacks: CardsPacksType },
                ApiResponseTypes<{ data: CardPacksResponseType }>>('cards/pack', {cardsPack: {name: packName}}),
        deletePack: (idPack: string) =>
            instance.delete<CardsPacksResponseType>('cards/pack', {params: {id: idPack}}),
        updatePack: (idPack: string, packName: string) =>
            instance.put<{ updateCardPacks: CardsPacksType },
                ApiResponseTypes<{ data: CardPacksResponseType }>>('cards/pack', {
                cardsPack: {
                    _id: idPack,
                    name: packName
                }
            })
    },
    cardsAPI: {
        getCards: (payload?: GetCardsQueryParams) =>
            instance.get<CardsResponseType>('cards/card', {params: payload}),
        addCard: (payload: PostCardsQueryParams) =>
            instance.post<CardType, ApiResponseTypes<CardType>>('cards/card', payload),
        deleteCard: (idCard: string) =>
            instance.delete<CardsResponseType>('cards/card', {params: {id: idCard}}),
        updateCard: (payload?: PutCardsQueryParams) =>
            instance.put<CardType, ApiResponseTypes<CardType>>('cards/card', payload),
        updateGrade: (payload: UpdateGradeQueryParams) =>
            instance.put<{ updatedGrade: UpdatedGradeType }, ApiResponseTypes<UpdatedGradeType>>('/cards/grade', payload)
    }
};