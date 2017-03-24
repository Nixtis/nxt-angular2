import { ComponentFixture, TestBed } from '@angular/core/testing'

import { appStore } from '../../../mocks'
import { NxtModule } from '../../../modules/nxt/nxt.module'
import { HomeComponent } from '../home.component'

describe('Component: HomeComponent', () => {
    let component: HomeComponent
    let fixture: ComponentFixture<HomeComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
            ],
            imports: [ NxtModule ],
            providers: [
                { provide: 'AppStore', useValue: appStore },
            ],
        })

        fixture = TestBed.createComponent(HomeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
