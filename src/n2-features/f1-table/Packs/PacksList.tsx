import {ReactElement, useEffect} from "react";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {AddCardsPackThunk, FetchPacksThunk, SetPrivatePacksThunk} from "./PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Navigate} from "react-router-dom";
import s from './Packs.module.css'
import {ModalInputContainer} from "../../../n3-modals/InputModal/ModalInputContainer";
import {Packs} from "./Packs";

export const PacksList = (): ReactElement => {

    const dispatch = useDispatch()

    const cardsPacks = useSelector<AppRootStateType, CardPacksResponseType[]>(state => state.packs.cardPacks)
    const user_id = useSelector<AppRootStateType, string | null | undefined>(state => state.profile._id)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(FetchPacksThunk())
    }, [dispatch])

    const showMyCardsPacks = () => dispatch(SetPrivatePacksThunk(user_id))
    const showAllCardsPacks = () => dispatch(FetchPacksThunk())
    const addPackHandler = (name: string) => {
        dispatch(AddCardsPackThunk(name))
    }
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.packsContainer}>
            <div className={s.packsBar}>
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
            <div className={s.packs}>
                <ModalInputContainer title={'Add new pack'} message={'Add new pack'} callback={addPackHandler}/>
                <Packs cardsPacks={cardsPacks} user_id={user_id}/>
            </div>
        </div>
    );
};
