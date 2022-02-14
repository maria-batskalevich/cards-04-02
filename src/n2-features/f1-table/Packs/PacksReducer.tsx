import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/API";
import {CardPacksResponseType, CardsPacksResponseType, CardsPacksType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {AppDispatch, AppRootStateType, ThunkType} from "../../../n1-main/m2-bll/store";

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
//thunk
export const FetchPacksThunk = () => (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    API.packsAPI.getPack()
        .then(res => dispatch(SetCardsPackAC(res.data)))
        .catch(err => console.log(err.message))
}
export const AddCardsPackThunk = (packName: string): ThunkType => (dispatch) => {
    API.packsAPI.addPack(packName)
        .then(res => {
            dispatch(AddNewCardsPackAC(res.data.data))
            dispatch(FetchPacksThunk())
        })
}
export const DeleteCardsPackThunk = (idPack: string): ThunkType => (dispatch) => {
    API.packsAPI.deletePack(idPack)
        .then(res => {
            dispatch(DeleteCardsPackAC(idPack))
            dispatch(FetchPacksThunk())
        })
}
export type CardPacksActionTypes =
    ReturnType<typeof SetCardsPackAC>
    | ReturnType<typeof AddNewCardsPackAC>
    | ReturnType<typeof DeleteCardsPackAC>;

