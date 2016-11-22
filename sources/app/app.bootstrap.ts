import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppActions, AppModule, appParams } from './'

import { AppStore } from '../reducers'

export function Bootstrap () {
    let state = {
        loading: true,
        location: appParams.defaultLocation,
    }

    AppStore.dispatch(AppActions.setAppState(state))

    platformBrowserDynamic().bootstrapModule(AppModule)
}
