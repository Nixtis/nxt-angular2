import { NgModule, ValueProvider } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgRedux, NgReduxModule } from '@angular-redux/store'

import { NxtModule } from '../modules/nxt/nxt.module'
import { store } from '../reducers'
import { AppComponent, IAppState } from './'
import { APP_ROUTER_PROVIDER, routing } from './app.routes'

/// SERVICES IMPORTATION START
/// SERVICES IMPORTATION END

/// COMPONENTS IMPORTATION START
import * as Home from '../components/home'
/// COMPONENTS IMPORTATION END

let appStore: ValueProvider = { provide: 'AppStore', useValue: store }

/// COMPONENTS DEFINITION START
const components: any[] = [
    Home.HomeComponent,
]
/// COMPONENTS DEFINITION END

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
    providers: [
        APP_ROUTER_PROVIDER,
        appStore,
    ],
})

export class AppModule {
    constructor (ngRedux: NgRedux<IAppState>) {
        ngRedux.provideStore(appStore.useValue)
    }
}
