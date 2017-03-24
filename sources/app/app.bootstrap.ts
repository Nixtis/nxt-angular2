import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppActions, AppModule, appParams } from './'

import { store } from '../reducers'

export function Bootstrap () {
    let state = {
        loading: true,
        location: appParams.defaultLocation,
    }

    store.dispatch(AppActions.setAppState(state))

    platformBrowserDynamic().bootstrapModule(AppModule)
}
