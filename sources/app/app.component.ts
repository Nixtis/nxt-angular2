import { select } from '@angular-redux/store'
import { ChangeDetectorRef, Component, ComponentFactoryResolver, Inject, ReflectiveInjector, ViewContainerRef } from '@angular/core'
import { Observable } from 'rxjs/Rx'

import { NxtAnalyticsGoogleService } from '../modules/nxt/nxt-analytics'
import { NxtGamesComponent } from '../modules/nxt/nxt-games'
import { NxtTranslateService } from '../modules/nxt/nxt-translate'

import { AppActions, appConfig } from './'

import '../sass/screen.scss'

@Component({
    selector: 'app',
    styles: [],
    template: require('./_app.component.html'),
})

export class AppComponent {
    public loading: boolean = true
    public viewContainerRef: ViewContainerRef

    private componentResolver: ComponentFactoryResolver
    private nxtTranslateService: NxtTranslateService
    private nxtAnalyticsGoogleService: NxtAnalyticsGoogleService
    private changeDetectorRef: ChangeDetectorRef

    // Redux
    @select((state) => state.appState) private appState$: Observable<any>
    private appStore

    constructor (
        viewContainerRef: ViewContainerRef,
        nxtTranslateService: NxtTranslateService,
        @Inject('AppStore') appStore,
        componentResolver: ComponentFactoryResolver,
        nxtAnalyticsGoogleService: NxtAnalyticsGoogleService,
        changeDetectorRef: ChangeDetectorRef,
    ) {
        this.viewContainerRef = viewContainerRef

        this.nxtTranslateService = nxtTranslateService
        this.nxtAnalyticsGoogleService = nxtAnalyticsGoogleService
        this.changeDetectorRef = changeDetectorRef

        this.appStore = appStore
        this.componentResolver = componentResolver
    }

    public ngOnInit () {
        this.nxtTranslateService.setFilePattern('/resources', 'locale-', '.json')

        if (process.env.NODE_ENV === 'production') {
            this.nxtAnalyticsGoogleService.init(appConfig.ga.key)
        }

        this.appState$.subscribe((appState) => {
            if (appState.location !== this.nxtTranslateService.getCurrentLanguage()) {
                this.nxtTranslateService.setLanguage(appState.location)
                this.nxtTranslateService.setTranslateContents()
                    .then((res) => this.appStore.dispatch(AppActions.setLoading(false)))
            }

            if (appState.loading !== this.loading) {
                this.loading = appState.loading
                this.changeDetectorRef.detectChanges()
            }
        })

        const konami: number[] = [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ]
        let n: number = 0
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === konami[n++]) {
                if (n === konami.length) {
                    const games = this.componentResolver.resolveComponentFactory(NxtGamesComponent)
                    const childInjector = ReflectiveInjector.resolve([ { provide: 'viewContainerRef', useValue: this.viewContainerRef } ])
                    const injector = ReflectiveInjector.fromResolvedProviders(childInjector, this.viewContainerRef.injector)

                    this.viewContainerRef.createComponent(games, this.viewContainerRef.length, injector)
                    n = 0
                    return false
                }
            } else {
                n = 0
            }
        })
    }
}
