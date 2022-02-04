export type initLoginStateType = {
    someProperty: string;
};

const initLoginState = {
    someProperty: '',
};

export const RegistrationReducer = (
    state: initLoginStateType = initLoginState,
    action: RegistrationActionTypes,
): initLoginStateType => {
    switch (action.type) {
        case 'REGISTRATION_CASE':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const RegistrationAction = (param: string) =>
    ({ type: 'REGISTRATION_CASE', payload: { param } } as const);

export type RegistrationActionTypes = ReturnType<typeof RegistrationAction>;