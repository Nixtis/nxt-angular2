import { AppActions } from './'

const initialState: IAppState = {
    loading: true,
    location: '',
}

export function appReducer (state = initialState, action) {
    switch (action.type) {
        case AppActions.SET_APP_STATE:
            return Object.assign({}, state, action.state)
        default:
            return state
    }
}

export interface IAppState {
    loading: boolean
    location: string
}
