import React, {ReactElement, useEffect, useMemo, useState} from "react";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {AddCardsPackThunk, FetchPacksThunk, SetCardsCountAC, SetPrivatePacksThunk} from "./PacksReducer";
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
import debounce from "lodash.debounce";

export const PacksList = (): ReactElement => {
    let [value, setValue] = useState('')
    const dispatch = useDispatch()

    const cardsPacks = useSelector<AppRootStateType, CardPacksResponseType[]>(state => state.packs.cardPacks)
    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.packs.maxCardsCount)
    const minCardsCount = useSelector<AppRootStateType, number>(state => state.packs.minCardsCount)

    const user_id = useSelector<AppRootStateType, string | null | undefined>(state => state.profile._id)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const entityStatus = useSelector<AppRootStateType, StatusType>(state => state.app.entityStatus)

    const [show, setShow] = useState(false)

    const filteredCards = cardsPacks.filter(c => c && c.cardsCount >= minCardsCount && c.cardsCount <= maxCardsCount)
    const searchPacks = cardsPacks.filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
    const changeCardsCount = useMemo(() => debounce((max: number, min: number) =>
        dispatch(SetCardsCountAC(max, min)), 500), [dispatch])
    const showMyCardsPacks = () => dispatch(SetPrivatePacksThunk(user_id))
    const showAllCardsPacks = () => dispatch(FetchPacksThunk())
    const addPackHandler = (name: string) => dispatch(AddCardsPackThunk(name))
    const onChangeHandler = (e: any) => setValue(e.currentTarget.value)
    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(FetchPacksThunk())
    }, [dispatch, changeCardsCount])

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
                <MultiSlider max={103} min={0} callback={changeCardsCount}/>
            </div>
            <ModalInputContainer title={'Add new pack'} messageName={'Add new pack'} callback={addPackHandler}/>
            <input type="text" onChange={onChangeHandler}/>
        </div>
        <div className={s.items}>
            <Packs cardsPacks={value ? searchPacks : filteredCards} user_id={user_id} entityStatus={entityStatus}
                   setShow={setShow}/>
        </div>
        <ModalUp/>
    </div>
};
