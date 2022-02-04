export type initLoginStateType = {
    someProperty: string;
};

const initLoginState = {
    someProperty: '',
};

export const NewPasswordReducer = (
    state: initLoginStateType = initLoginState,
    action: NewPasswordActionTypes,
): initLoginStateType => {
    switch (action.type) {
        case 'NEW_PASSWORD_CASE':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const NewPasswordAction = (param: string) =>
    ({ type: 'NEW_PASSWORD_CASE', payload: { param } } as const);

export type NewPasswordActionTypes = ReturnType<typeof NewPasswordAction>;