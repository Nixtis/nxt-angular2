import { Component, Inject } from '@angular/core'

import { AppActions } from '../../app'

@Component({
    selector: 'test',
    template: '',
})

export class TestComponent {
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
