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