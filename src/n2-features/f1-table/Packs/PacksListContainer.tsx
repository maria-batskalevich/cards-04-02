import {ReactElement, useEffect, useState} from "react";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {FetchPacksThunk} from "./PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {AddItem} from "../../../n1-main/m1-ui/common/AddItemForm/AddItem";
import {PacksList} from "./PacksList";

export const PacksListContainer = (): ReactElement => {

    const dispatch = useDispatch()
    const isLoading = useSelector<AppRootStateType>(state => state.profile.isLoading)

    const [addPack, setAddPack] = useState<boolean>(false)

    useEffect(() => {
        if (!isLoading) return
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
                {addPack
                    ? <AddItem title={'Add new pack'}/>
                    : <PacksList addPack={addPack} setAddPack={setAddPack}/>}
            </div>
        </div>
    );
};
