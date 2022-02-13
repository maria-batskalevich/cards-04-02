export type CardPacksType = {
    _id: string;
    user_id: string;
    name: string;
    path: string;
    cardsCount: number;
    grade: number;
    shots: number;
    rating: number;
    type: string;
    created: string;
    updated: string;
    __v: number;
}
export type CardsPacksType = {
    cardPacks: Array<CardPacksType>;
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
};

const initCardPacksState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            name: '',
            path: '', // папка
            cardsCount: 0,
            grade: 0,  // средняя оценка карточек
            shots: 0, // количество попыток
            rating: 0, // лайки
            type: '', // ещё будет "folder" (папка)
            created: '',
            updated: '',
            __v: 0,
        },
    ],
    token: '',
    cardPacksTotalCount: 0, // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,  // выбранная страница
    pageCount: 4, // количество элементов на странице
};


export const PacksReducer = (
    state: CardsPacksType = initCardPacksState,
    action: CardPacksActionTypes,
): CardsPacksType => {
    switch (action.type) {
        case 'CARD_PACKS': { // добавила для подготовки ко 2му занятию, название и т.д. можно менять
            return {...state, ...action.payload, cardPacks: action.payload.cardPacks};
        }
        default:
            return state;
    }
};

export const SetCardPacksAC = (payload: CardsPacksType) =>
    ({type: 'CARD_PACKS', payload} as const);

export type CardPacksActionTypes = ReturnType<typeof SetCardPacksAC>;
