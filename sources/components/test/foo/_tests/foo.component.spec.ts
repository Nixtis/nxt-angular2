import { ComponentFixture, TestBed } from '@angular/core/testing'

import { appStore } from '../../../../mocks'
import { FooComponent } from '../foo.component'

describe('Component: FooComponent', () => {
    let component: FooComponent
    let fixture: ComponentFixture<FooComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                FooComponent,
            ],
            imports: [],
            providers: [
                { provide: 'AppStore', useValue: appStore },
            ],
        })

        fixture = TestBed.createComponent(FooComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
