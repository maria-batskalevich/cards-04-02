export type initLoginStateType = {
    someProperty: string;
};

const initLoginState = {
    someProperty: '',
};

export const ProfileReducer = (
    state: initLoginStateType = initLoginState,
    action: ProfileActionTypes,
): initLoginStateType => {
    switch (action.type) {
        case 'PROFILE_CASE':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const ProfileAction = (param: string) =>
    ({ type: 'PROFILE_CASE', payload: { param } } as const);

export type ProfileActionTypes = ReturnType<typeof ProfileAction>;