import {API} from "../../../n1-main/m3-dal/API";
import {AppDispatch, AppRootStateType, ThunkType} from "../../../n1-main/m2-bll/store";
import {SetEntityStatus, SetStatusApp} from "../../../n1-main/m2-bll/app-reducer";
import {handleInternetError, handleResponse} from "../../../n1-main/m1-ui/common/utils";
import {CardPacksResponseType, CardsPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";

const initCardPacksState = {
    cardPacks: [],
    token: '',
    cardPacksTotalCount: 4142, // количество колод
    maxCardsCount: 103,
    minCardsCount: 0,
    page: 1,  // выбранная страница
    pageCount: 10, // количество элементов на странице
};


export const PacksReducer = (
    state: CardsPacksResponseType = initCardPacksState, action: CardPacksActionTypes,): CardsPacksResponseType => {
    switch (action.type) {
        case 'packs/CARDS_PACK': {
            return {...state, ...action.payload, cardPacks: action.payload.cardPacks};
        }
        case 'packs/PRIVATE_CARDS_PACK': {
            return {...state, cardPacks: state.cardPacks.filter(p => p.user_id === action.payload.user_id)};
        }
        case 'packs/SET-COUNT-ON-PAGE': {
            return {...state, pageCount: action.payload.pageCount};
        }
        case 'packs/ADD_CARDS_PACK': {
            return {...state, cardPacks: [action.newCardPacks, ...state.cardPacks]}
        }
        case "packs/DELETE_CARDS_PACK": {
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.idPack)}
        }
        case "packs/UPDATE_CARDS_PACK": {
            return {
                ...state,
                cardPacks: state.cardPacks.map(p => p._id === action.idPack ? {...p, name: action.packName} : p)
            }
        }
        default:
            return state;
    }
};
//action
export const SetCardsPackAC = (cardsPack: CardsPacksResponseType) => {
    return {type: 'packs/CARDS_PACK', payload: cardsPack} as const
};
export const SetPrivateCardsPackAC = (user_id: string | null | undefined) => {
    return {type: 'packs/PRIVATE_CARDS_PACK', payload: {user_id}} as const
};
export const SetPageCountAC = (countOnPage: number) => {
    return {type: 'packs/SET-COUNT-ON-PAGE', payload: {pageCount: countOnPage}} as const
};
export const AddNewCardsPackAC = (newCardsPack: CardPacksResponseType) => {
    return {type: 'packs/ADD_CARDS_PACK', newCardPacks: newCardsPack} as const
}
export const DeleteCardsPackAC = (idPack: string) => {
    return {type: 'packs/DELETE_CARDS_PACK', idPack} as const
}
export const UpdateCardsPackAC = (idPack: string, packName: string) => {
    return {type: 'packs/UPDATE_CARDS_PACK', idPack, packName} as const
}
//thunk
export const FetchPacksThunk = () => (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    const packs = getState().packs
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.packsAPI.getPack({
        ...packs,
        page: packs.page,
        pageCount: packs.pageCount,
        maxCardsCount: packs.maxCardsCount,
        minCardsCount: packs.minCardsCount,
    })
        .then(res => {
            handleResponse(dispatch, SetCardsPackAC(res.data))
            dispatch(SetPageCountAC(10))
        })
        .catch(err => handleInternetError(dispatch, err.response.message))
}
export const SetPrivatePacksThunk = (user_id: string | null | undefined) => (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.packsAPI.getPack()
        .then(res => {
            handleResponse(dispatch, SetPrivateCardsPackAC(user_id))
        })
        .catch(err => handleInternetError(dispatch, err.response.message))
}
export const AddCardsPackThunk = (packName: string): ThunkType => (dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.packsAPI.addPack(packName)
        .then(res => {
            dispatch(FetchPacksThunk())
            handleResponse(dispatch, AddNewCardsPackAC(res.data.data))
        })
        .catch(err => handleInternetError(dispatch, err.response.message))
}
export const DeleteCardsPackThunk = (idPack: string): ThunkType => (dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.packsAPI.deletePack(idPack)
        .then(res => {
            dispatch(FetchPacksThunk())
            handleResponse(dispatch, DeleteCardsPackAC(idPack))
        })
        .catch(err => handleInternetError(dispatch, err.response.message))
}
export const UpdateCardsPackThunk = (idPack: string, packName: string): ThunkType => (dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.packsAPI.updatePack(idPack, packName)
        .then(res => {
            dispatch(FetchPacksThunk())
            handleResponse(dispatch, UpdateCardsPackAC(idPack, packName))
        })
        .catch(err => handleInternetError(dispatch, err.response.message))
}
export type CardPacksActionTypes =
    ReturnType<typeof SetCardsPackAC>
    | ReturnType<typeof AddNewCardsPackAC>
    | ReturnType<typeof DeleteCardsPackAC>
    | ReturnType<typeof UpdateCardsPackAC>
    | ReturnType<typeof SetPrivateCardsPackAC>
    | ReturnType<typeof SetPageCountAC>;

