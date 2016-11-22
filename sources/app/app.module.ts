import { NgModule, ValueProvider } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgRedux, NgReduxModule } from 'ng2-redux'

import { HomeComponent } from '../components/home'
import { NxtModule } from '../modules/nxt/nxt.module'
import { AppStore } from '../reducers'
import { AppComponent, IAppState } from './'
import { APP_ROUTER_PROVIDER, routing } from './app.routes'

let appStore: ValueProvider = { provide: 'AppStore', useValue: AppStore }

const components: any[] = [
    HomeComponent,
]

const modalContentComponents: any[] = []

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        ...components,
        ...modalContentComponents,
    ],
    entryComponents: [ ...modalContentComponents ],
    imports: [ BrowserModule, FormsModule, NgReduxModule, NxtModule, routing ],
    providers: [ APP_ROUTER_PROVIDER, NgRedux, appStore ],
})

export class AppModule {
    constructor (ngRedux: NgRedux<IAppState>) {
        ngRedux.provideStore(appStore.useValue)
    }
}
