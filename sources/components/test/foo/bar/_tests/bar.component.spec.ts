import { ComponentFixture, TestBed } from '@angular/core/testing'

import { appStore } from '../../../../../mocks'
import { BarComponent } from '../bar.component'

describe('Component: BarComponent', () => {
    let component: BarComponent
    let fixture: ComponentFixture<BarComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BarComponent,
            ],
            imports: [],
            providers: [
                { provide: 'AppStore', useValue: appStore },
            ],
        })

        fixture = TestBed.createComponent(BarComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
