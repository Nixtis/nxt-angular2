import { Component, Inject } from '@angular/core'

import { AppActions } from '../../app'

@Component({
    selector: 'home',
    styles: [
        require('./_home.component.scss'),
    ],
    template: require('./_home.component.html'),
})

export class HomeComponent {

    private appStore

    constructor (
        @Inject('AppStore') appStore
    ) {
        this.appStore = appStore
    }

    public ngOnInit () {
        this.appStore.dispatch(AppActions.setAppState({ loading: false }))
    }

}
