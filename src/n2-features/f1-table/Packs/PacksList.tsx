import {ReactElement, useEffect} from "react";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {Packs} from "./Packs";
import {FetchPacksThunk} from "./PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardPacksType} from "../../../n1-main/m3-dal/ApiResponseTypes";

export const PacksList = (): ReactElement => {

    const dispatch = useDispatch()
    const isLoading = useSelector<AppRootStateType>(state => state.profile.isLoading)
    const cardsPacks = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.cardPacks)

    useEffect(() => {
        if(!isLoading) return
        dispatch(FetchPacksThunk())
    }, [dispatch])

    return (
        <div>
            <div>
                <div>
                    <span>Show packs cards</span>
                    <SuperButton>My</SuperButton>
                    <SuperButton>ALL</SuperButton>
                </div>
                <div>
                    <span>Number of cards</span>
                    <input type={'range'}/>
                </div>
            </div>
            <div>
                <Packs cardsPacks = {cardsPacks}/>
            </div>
        </div>
    );
};
