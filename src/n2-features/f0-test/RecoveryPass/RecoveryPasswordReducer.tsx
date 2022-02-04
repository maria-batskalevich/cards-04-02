export type initLoginStateType = {
    someProperty: string;
};

const initLoginState = {
    someProperty: '',
};

export const RecoveryPasswordReducer = (
    state: initLoginStateType = initLoginState,
    action: RecoveryPassActionTypes,
): initLoginStateType => {
    switch (action.type) {
        case 'RECOVERY_PASSWORD_CASE':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const RecoveryPassAction = (param: string) =>
    ({ type: 'RECOVERY_PASSWORD_CASE', payload: { param } } as const);

export type RecoveryPassActionTypes = ReturnType<typeof RecoveryPassAction>;