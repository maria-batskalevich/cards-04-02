export type initAppStateType = {
    statusApp: StatusType;
    entityStatus: StatusType;
    error?: string;
};

const initAppState = {
    statusApp: 'idle' as StatusType,
    entityStatus: 'idle' as StatusType,
    error: '',
};

export const AppReducer = (state: initAppStateType = initAppState, action: AppActionTypes,): initAppStateType => {
    switch (action.type) {
        case 'app/SET-STATUS-APP':
            return {...state, statusApp: action.payload.statusApp};
        case 'app/SET-ENTITY-STATUS':
            return {...state, entityStatus: action.payload.entityStatus};
        case 'app/SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state;
    }
};
export const SetStatusApp = (statusApp: StatusType) =>
    ({type: 'app/SET-STATUS-APP', payload: {statusApp}} as const);
export const SetEntityStatus = (entityStatus: StatusType) =>
    ({type: 'app/SET-ENTITY-STATUS', payload: {entityStatus}} as const);
export const SetError = (error: string) =>
    ({type: 'app/SET-ERROR', payload: {error}} as const);

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionTypes = ReturnType<typeof SetStatusApp>
    | ReturnType<typeof SetEntityStatus>
    | ReturnType<typeof SetError>;