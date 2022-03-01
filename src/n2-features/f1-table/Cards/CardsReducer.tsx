import {AppDispatch, AppRootStateType} from "../../../n1-main/m2-bll/store";
import {API} from "../../../n1-main/m3-dal/API";
import {handleInternetError, handleResponse} from "../../../n1-main/m1-ui/common/utils";
import {CardsResponseType, GetCardsQueryParams} from "../../../n1-main/m3-dal/ApiResponseTypes";
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
        default:
            return state;
    }
};

//actions
export const SetCardsAC = (payload: CardsResponseType) =>
    ({type: 'cards/SET-CARDS', payload} as const);
export const SetCurrentCardsPackIdAC = (payload: { id: string }) =>
    ({type: 'cards/SET-CURRENT-CARDS-PACK-ID', payload} as const);

//thunks
export const FetchCardsThunk = (payload?: GetCardsQueryParams) => (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))

    const cards = getState().cards

    API.cardsAPI.getCards({
        cardsPack_id: cards.currentCardsPackID || payload && payload.cardsPack_id
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
export type CardsActionTypes = ReturnType<typeof SetCardsAC> | ReturnType<typeof SetCurrentCardsPackIdAC>;
