import {API} from "../../../n1-main/m3-dal/API";
import {CardPacksResponseType, CardsPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {AppDispatch, AppRootStateType, ThunkType} from "../../../n1-main/m2-bll/store";
import {SetEntityStatus, SetStatusApp} from "../../../n1-main/m2-bll/app-reducer";
import {handleInternetError, handleResponse} from "../../../n1-main/m1-ui/common/utils";

const initCardPacksState = {
    cardPacks: [],
    token: '',
    cardPacksTotalCount: 0, // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 4,  // выбранная страница
    pageCount: 1000, // количество элементов на странице
};


export const PacksReducer = (
    state: CardsPacksResponseType = initCardPacksState, action: CardPacksActionTypes,): CardsPacksResponseType => {
    switch (action.type) {
        case 'packs/CARDS_PACK': {
            return {...state, ...action.payload, cardPacks: action.payload.cardPacks};
        }
        case 'packs/ADD_CARDS_PACK': {
            return {...state, cardPacks: [action.newCardPacks, ...state.cardPacks]}
        }
        case "packs/DELETE_CARDS_PACK": {
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.idPack)}
        }
        case "packs/UPDATE_CARDS_PACK":{
            return {...state, cardPacks: state.cardPacks.map(p => p._id === action.idPack ? {...p, name: action.packName} : p)}
        }
        default:
            return state;
    }
};
//action
export const SetCardsPackAC = (cardsPack: CardsPacksResponseType) => {
    return {type: 'packs/CARDS_PACK', payload: cardsPack} as const
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
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.packsAPI.getPack()
        .then(res => {
            handleResponse(dispatch, SetCardsPackAC(res.data))
        })
        .catch(err => handleInternetError(dispatch, err.response))
}
export const AddCardsPackThunk = (packName: string): ThunkType => (dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.packsAPI.addPack(packName)
        .then(res => {
            dispatch(FetchPacksThunk())
            handleResponse(dispatch, AddNewCardsPackAC(res.data.data))
        })
        .catch(err => handleInternetError(dispatch, err.response))
}
export const DeleteCardsPackThunk = (idPack: string): ThunkType => (dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.packsAPI.deletePack(idPack)
        .then(res => {
            dispatch(FetchPacksThunk())
            handleResponse(dispatch, DeleteCardsPackAC(idPack))
        })
        .catch(err => handleInternetError(dispatch, err.response))
}
export const UpdateCardsPackThunk = (idPack: string, packName: string): ThunkType => (dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.packsAPI.updatePack(idPack, packName)
        .then(res => {
            dispatch(FetchPacksThunk())
            handleResponse(dispatch, UpdateCardsPackAC(idPack,packName))
        })
        .catch(err => handleInternetError(dispatch, err.response))
}
export type CardPacksActionTypes =
    ReturnType<typeof SetCardsPackAC>
    | ReturnType<typeof AddNewCardsPackAC>
    | ReturnType<typeof DeleteCardsPackAC>
    | ReturnType<typeof UpdateCardsPackAC>;

