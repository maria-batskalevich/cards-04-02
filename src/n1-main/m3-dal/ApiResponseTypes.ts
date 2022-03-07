export type ApiResponseTypes<D = {}> = {
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
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating?: number
    shots: number
    type?: string
    user_id?: string
    created?: string
    updated?: string
    __v?: number
    _id: string
}
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type GetCardsQueryParams = {
    cardsPack_id?: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type PostCardQueryParams = {
    cardsPack_id: string | undefined
    question?: string
    answer?: string
    grade?: number
    shots?: number
}
export type PutCardQueryParams = PostCardQueryParams & {
    _id: string
}
export type PostCardsQueryParams = {
    card: PostCardQueryParams
}
export type PutCardsQueryParams = {
    card: PutCardQueryParams
}
export type UpdatedGradeType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}
export type UpdateGradeQueryParams = {
    grade: number,
    card_id: string
}