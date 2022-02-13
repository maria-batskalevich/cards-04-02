import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/API";
import {CardsPacksType} from "../../../n1-main/m3-dal/ApiResponseTypes";

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
    state: CardsPacksType = initCardPacksState,
    action: CardPacksActionTypes,
): CardsPacksType => {
    switch (action.type) {
        case 'CARD_PACKS': { // добавила для подготовки ко 2му занятию, название и т.д. можно менять
            return {...state, ...action.payload, cardPacks: action.payload.cardPacks};
        }
        default:
            return state;
    }
};
//action
export const SetCardPacksAC = (cardsPacks: CardsPacksType) => {
    return {type: 'CARD_PACKS', payload: cardsPacks} as const
};

//thunk
export const FetchPacksThunk = () => (dispatch: Dispatch) => {
    API.packsAPI.getPacks()
        .then(res => dispatch(SetCardPacksAC(res.data)))
        .catch(err => console.log(err.message))
}
export type CardPacksActionTypes = ReturnType<typeof SetCardPacksAC>;

