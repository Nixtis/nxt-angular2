import { combineReducers, createStore } from 'redux'

import { appReducer } from '../app/app.reducer'

let appStore

if (process.env.NODE_ENV === 'production') {
    appStore = createStore(combineReducers({
        appState: appReducer,
    }))
} else {
    let devToolsExtension: string = 'devToolsExtension'

    appStore = createStore(combineReducers({
        appState: appReducer,
    }), window[devToolsExtension] && window[devToolsExtension]())
}

export const AppStore = appStore
