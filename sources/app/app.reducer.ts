import { AppActions } from './'

const initialState: IAppState = {
    loading: true,
    location: '',
}

export function appReducer (state = initialState, action) {
    switch (action.type) {
        case AppActions.SET_LOADING:
            return { ...state, loading: action.loading }
        case AppActions.SET_LOCATION:
            return { ...state, location: action.location }
        default:
            return state
    }
}

export interface IAppState {
    loading: boolean
    location: string
}
