import { ComponentFixture, TestBed } from '@angular/core/testing'

import { appStore } from '../../../mocks'
import { TestComponent } from '../test.component'

describe('Component: TestComponent', () => {
    let component: TestComponent
    let fixture: ComponentFixture<TestComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
            ],
            imports: [],
            providers: [
                { provide: 'AppStore', useValue: appStore },
            ],
        })

        fixture = TestBed.createComponent(TestComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
