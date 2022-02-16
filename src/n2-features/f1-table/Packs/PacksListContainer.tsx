import {ReactElement, useEffect, useState} from "react";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {AddCardsPackThunk, FetchPacksThunk} from "./PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {AddItem} from "../../../n1-main/m1-ui/common/AddItemForm/AddItem";
import {PacksList} from "./PacksList";
import {CardsPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import { Navigate } from "react-router-dom";

export const PacksListContainer = (): ReactElement => {

    const dispatch = useDispatch()
    const packs = useSelector<AppRootStateType, CardsPacksResponseType>(state => state.packs)
    const user_id = useSelector<AppRootStateType, string | null | undefined>(state => state.profile._id)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const [addPack, setAddPack] = useState<boolean>(false)

    useEffect(() => {
        dispatch(FetchPacksThunk())
    }, [dispatch])

    let filteredCardsPacks = packs.cardPacks

    const showMyCardsPacks = () => {
        filteredCardsPacks = packs.cardPacks.filter(p => p.user_id === user_id)
        console.log('my')
    }
    const showAllCardsPacks = () => {
        filteredCardsPacks = packs.cardPacks.filter(p => p.user_id === user_id)
        console.log('all')
    }
    if (!isLoggedIn) {
        return  <Navigate to={'/login'}/>
    }
    return (
        <div>
            <div>
                <div>
                    <span>Show packs cards</span>
                    <SuperButton onClick={showMyCardsPacks}>My</SuperButton>
                    <SuperButton onClick={showAllCardsPacks}>ALL</SuperButton>
                </div>
                <div>
                    <span>Number of cards</span>
                    <input type={'range'}/>
                </div>
            </div>
            <div>
                {addPack
                    ? <AddItem itemTitle={'Add new pack'}
                               addItem={addPack}
                               setAddItem={setAddPack}
                               callback={AddCardsPackThunk}/>
                    : <PacksList addPack={addPack}
                                 setAddPack={setAddPack}
                                 cardsPacks={filteredCardsPacks}
                                 user_id={user_id}/>}
            </div>
        </div>
    );
};
