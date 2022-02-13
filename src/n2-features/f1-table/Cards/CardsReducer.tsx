
export type CardsType = {
    cards: Array <{
        answer: string
        question: string
        cardsPack_id: string
        grade: number
        rating: number
        shots: number
        type: string
        user_id: string
        created: string
        updated: string
        __v: number
        _id: string
    }>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

const initialState: CardsType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: ''
}


export const CardsReducer = (state = initialState, action: CardsActionTypes): CardsType => {
    switch (action.type) {
        case 'SET-CARDS': {  // добавила для подготовки ко 2му занятию, название и т.д. можно менять
            return { ...state, ...action.payload, cardPacks: action.payload.cardPacks };
        }
        default:
            return state;
    }
};

export const setCardsAC = (payload: any) =>
    ({ type: 'SET-CARDS', payload } as const);

export type CardsActionTypes = ReturnType<typeof setCardsAC>;
