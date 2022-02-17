export type ApiResponseTypes<D = {}> = {
    //resultCode: number;
    data: D;
    info?: string;
    error?: string;
};
export type AuthLoginResponseTypes = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
export type AuthLoginTypes = {
    email: string;
    password: string;
    rememberMe: boolean; // - куки умрут если пользователь будет
}

export type RegisterParamsType = {
    email: string;
    password: string;
}

export type UpdateUserDataType = {
    avatar: string
    name: string
}

export type RecoveryParamsType = {
    email: string
    from: string
    message: string
}
export type NewPasswordParamsType = {
    password:string
    resetPasswordToken:any
}
export type CardPacksResponseType = {
    _id: string;
    user_id: string;
    name: string;
    path: string;
    cardsCount: number;
    grade: number;
    shots: number;
    rating: number;
    type: string;
    created: string;
    updated: string;
    __v: number;
}
export type CardsPacksResponseType = {
    cardPacks: Array<CardPacksResponseType>;
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
};
export type CardsPacksType = {
    _id: string;
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    deckCover: string
    private: boolean
    type: string
}