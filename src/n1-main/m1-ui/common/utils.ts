import {SetEntityStatus, SetError, SetStatusApp} from "../../m2-bll/app-reducer";
import {CardPacksActionTypes} from "../../../n2-features/f1-table/Packs/PacksReducer";
import {CardType} from "../../m3-dal/ApiResponseTypes";
import {CardsActionTypes} from "../../../n2-features/f1-table/Cards/CardsReducer";

export const handleResponse = (dispatch: any, actionCreator: CardPacksActionTypes | CardsActionTypes) => {
    dispatch(actionCreator)
    dispatch(SetStatusApp('succeeded'))
    dispatch(SetEntityStatus('succeeded'))
}
export const handleInternetError = (dispatch: any, err: string) => { //как типизировать правилбно диспатч??
    dispatch(SetStatusApp('failed'))
    dispatch(SetEntityStatus('failed'))
    dispatch(SetError(err))
    console.log('Error: ', err)
}