import { Component, ViewEncapsulation } from '@angular/core'

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [],
    selector: 'home',
    styles: [
        require('./_home.component.scss'),
    ],
    template: require('./_home.component.html'),
})

export class HomeComponent {

    constructor () {}

}
