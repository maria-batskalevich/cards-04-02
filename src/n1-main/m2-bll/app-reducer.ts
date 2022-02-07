export type initAppStateType = {
    someProperty: string;
};

const initAppState = {
    someProperty: '',
};

export const AppReducer = (
    state: initAppStateType = initAppState,
    action: AppActionTypes,
): initAppStateType => {
    switch (action.type) {
        case 'TEST_CASE':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const testAction = (payload: {}) => ({ type: 'TEST_CASE', payload });

export type AppActionTypes = ReturnType<typeof testAction>;