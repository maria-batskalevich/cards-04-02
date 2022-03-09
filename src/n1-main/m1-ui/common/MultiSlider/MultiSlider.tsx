import React, {ChangeEvent, useRef, useState} from 'react'
import s from './MultiSlider.module.css'

type MultiSliderPropsType = {
    min: number
    max: number
    callback: () => void
}
export const MultiSlider = (props: MultiSliderPropsType) => {
    const [minVal, setMinVal] = useState<number>(props.min)
    const [maxVal, setMaxVal] = useState<number>(props.max)
    const minValRef = useRef(props.min)
    const maxValRef = useRef(props.max)
    const range = useRef(null)

    const minRangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.currentTarget.value), maxVal - 1)
        setMinVal(value)
        minValRef.current = value
    }
    const maxRangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.currentTarget.value), minVal + 1)
        setMaxVal(value)
        maxValRef.current = value
    }
    return <div className={s.container}>
        <input type={'range'} min={props.min} max={props.max} value={minVal}
               onChange={minRangeHandler} style={{zIndex: `${minVal > props.max - 100 && "5"}`}}
               className={`${s.thumb} ${s.thumbLeft}`}/>
        <input type={'range'} min={props.min} max={props.max} value={maxVal}
               onChange={maxRangeHandler} className={`${s.thumb} ${s.thumbRight}`}/>
        <div className={s.slider}>
            <div className={s.sliderTrack}>
                <div className={s.sliderRange} ref={range}/>
                <div className={s.sliderLeftValue}>{minVal}</div>
                <div className={s.sliderRightValue}>{maxVal}</div>
            </div>
        </div>
    </div>
}