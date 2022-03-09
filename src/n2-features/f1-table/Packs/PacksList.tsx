import React, {ReactElement, useEffect, useState} from "react";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {AddCardsPackThunk, FetchPacksThunk, SetPrivatePacksThunk} from "./PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardPacksResponseType} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Navigate} from "react-router-dom";
import s from '../Table.module.css'
import {ModalInputContainer} from "../../../n3-modals/InputModal/SimpleInput/ModalInputContainer";
import {Packs} from "./Packs";
import {ModalUp} from "../../../n3-modals/UpModal/ModalUp";
import {StatusType} from "../../../n1-main/m2-bll/app-reducer";
import {CardsList} from "../Cards/CardsList";
import {MultiSlider} from "../../../n1-main/m1-ui/common/MultiSlider/MultiSlider";

export const PacksList = (): ReactElement => {

    const dispatch = useDispatch()

    const cardsPacks = useSelector<AppRootStateType, CardPacksResponseType[]>(state => state.packs.cardPacks)
    const user_id = useSelector<AppRootStateType, string | null | undefined>(state => state.profile._id)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)

    const [show, setShow] = useState(false)

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

    if (show) {
        return <CardsList setShow={setShow} show={show} cardsPacks={cardsPacks}/>
    }

    return <div className={s.tableContainer}>
            <div className={s.tableBar}>
                <div>
                    <div>Show packs cards</div>
                    <SuperButton onClick={showMyCardsPacks}>My</SuperButton>
                    <SuperButton onClick={showAllCardsPacks}>ALL</SuperButton>
                </div>
                <div>
                    <span>Number of cards</span>
                    <MultiSlider max={103} min={0} callback={() => {}}/>
                </div>
                <ModalInputContainer title={'Add new pack'} messageName={'Add new pack'} callback={addPackHandler}/>
            </div>
            <div className={s.items}>
                <Packs cardsPacks={cardsPacks} user_id={user_id} entityStatus={entityStatus} setShow={setShow}/>
            </div>
            <ModalUp/>
        </div>
};
