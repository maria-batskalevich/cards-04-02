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
    state: CardsPacksResponseType = initCardPacksState,
    action: CardPacksActionTypes,
): CardsPacksResponseType => {
    switch (action.type) {
        case 'packs/CARD_PACKS': {
            return {...state, ...action.payload, cardPacks: action.payload.cardPacks};
        }
        case 'packs/ADD_CARD_PACKS': {
            return {...state, cardPacks: [action.newCardPacks, ...state.cardPacks]}
        }
        default:
            return state;
    }
};
//action
export const SetCardPacksAC = (cardsPacks: CardsPacksResponseType) => {
    return {type: 'packs/CARD_PACKS', payload: cardsPacks} as const
};
export const AddNewCardToPackAC = (newCardPacks: CardPacksResponseType) => {
    return {type: 'packs/ADD_CARD_PACKS', newCardPacks} as const
}
//thunk
export const FetchPacksThunk = () => (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    API.packsAPI.getPacks()
        .then(res => dispatch(SetCardPacksAC(res.data)))
        .catch(err => console.log(err.message))
}
export const AddCardPacksThunk = (packName: string): ThunkType => (dispatch) => {
    API.packsAPI.addPacks(packName)
        .then(res => {
            dispatch(AddNewCardToPackAC(res.data.data))
            dispatch(FetchPacksThunk())
        })
}
export type CardPacksActionTypes = ReturnType<typeof SetCardPacksAC> | ReturnType<typeof AddNewCardToPackAC>;

