import { Component, Inject } from '@angular/core'

import { AppActions } from '../../../../app'

@Component({
    selector: 'bar',
    template: '',
})

export class BarComponent {
    private appStore

    constructor (
        @Inject('AppStore') appStore
    ) {
        this.appStore = appStore
    }

    public ngOnInit() {
        this.appStore.dispatch(AppActions.setAppState({ loading: false }))
    }
}
