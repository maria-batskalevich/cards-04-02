import {ReactElement} from "react";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {Packs} from "./Packs";

export const PacksList = (): ReactElement => {

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
                <Packs/>
            </div>
        </div>
    );
};
