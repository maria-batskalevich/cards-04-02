import {SetEntityStatus, SetError, SetStatusApp} from "../../m2-bll/app-reducer";
import {CardPacksActionTypes} from "../../../n2-features/f1-table/Packs/PacksReducer";

export const handleResponse = (dispatch: any, actionCreator: CardPacksActionTypes) => {
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