import {AppDispatch, AppRootStateType, ThunkType} from "../../../n1-main/m2-bll/store";
import {API} from "../../../n1-main/m3-dal/API";
import {handleInternetError, handleResponse} from "../../../n1-main/m1-ui/common/utils";
import {
    CardsResponseType,
    CardType,
    PostCardsQueryParams,
    PutCardsQueryParams
} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {SetEntityStatus, SetStatusApp} from "../../../n1-main/m2-bll/app-reducer";

export type CardsInitialState = CardsResponseType & {
    currentCardsPackID: string
    currentGrade: number[]
}
const initialState: CardsInitialState = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: '',
    currentCardsPackID: '',
    currentGrade: [] as number[]
}

export const CardsReducer = (state = initialState, action: CardsActionTypes): CardsInitialState => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {...state, ...action.payload};
        case "cards/SET-CURRENT-CARDS-PACK-ID":
            return {...state, currentCardsPackID: action.payload.id}
        case "cards/DELETE-CARD":
            return {...state, cards: state.cards.filter(c => c._id !== action.payload.id)}
        case "cards/ADD-CARD":
            return {...state, cards: [action.payload.card, ...state.cards]}
        case "cards/UPDATE-CARD":
            return {
                ...state,
                cards: state.cards.map(c => c._id === action.payload._id ? {...c, ...action.payload}: c)
            } as CardsResponseType & { currentCardsPackID: string; currentGrade: number[] }
        default:
            return state;
    }
};

//actions
export const SetCardsAC = (payload: CardsResponseType) =>
    ({type: 'cards/SET-CARDS', payload} as const);
export const SetCurrentCardsPackIdAC = (payload: { id: string }) =>
    ({type: 'cards/SET-CURRENT-CARDS-PACK-ID', payload} as const);
export const AddCardAC = (payload: { card: CardType}) =>
    ({type: 'cards/ADD-CARD', payload} as const);
export const DeleteCardAC = (payload: { id: string }) =>
    ({type: 'cards/DELETE-CARD', payload} as const);
export const UpdateCardAC = (payload: CardType) =>
    ({type: 'cards/UPDATE-CARD', payload} as const);

//thunks
export const FetchCardsThunk = () => (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    const cards = getState().cards

    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))

    API.cardsAPI.getCards({
        ...cards,
        cardsPack_id: cards.currentCardsPackID,
    })
        .then(res => {
            handleResponse(dispatch, SetCardsAC(res.data))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            handleInternetError(dispatch, error)
        })
}
export const AddCardThunk = (payload: PostCardsQueryParams): ThunkType => (dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.cardsAPI.addCard(payload)
        .then(res => {
            dispatch(FetchCardsThunk())
            handleResponse(dispatch, AddCardAC({card: res.data}))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            handleInternetError(dispatch, error)
        })
}
export const DeleteCardThunk = (idCard: string): ThunkType => (dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.cardsAPI.deleteCard(idCard)
        .then(res => {
            dispatch(FetchCardsThunk())
            DeleteCardAC({id: idCard})
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            handleInternetError(dispatch, error)})
}
export const UpdateCardThunk = (payload?: PutCardsQueryParams): ThunkType => (dispatch, getState: () => AppRootStateType) => {
    const cards = getState().cards
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.cardsAPI.updateCard(payload)
        .then(res => {
            handleResponse(dispatch, UpdateCardAC(res.data))
            dispatch(FetchCardsThunk())
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            handleInternetError(dispatch, error)
        })
}
export type CardsActionTypes =
    ReturnType<typeof SetCardsAC>
    | ReturnType<typeof SetCurrentCardsPackIdAC>
    | ReturnType<typeof DeleteCardAC>
    | ReturnType<typeof AddCardAC>
    | ReturnType<typeof UpdateCardAC>;

