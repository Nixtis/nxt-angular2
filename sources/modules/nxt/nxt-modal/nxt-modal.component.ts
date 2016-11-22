import { Component, ComponentFactoryResolver, ElementRef, Inject, ReflectiveInjector, ValueProvider, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core'

import { EventsService } from '../../../helpers'

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'nxt-modal',
    styles: [
        require('./_nxt-modal.component.scss'),
    ],
    template: `
        <div class="nxt-modal-overlay" [ngClass]="className" (click)="close()">
            <div class="nxt-modal-container">
                <div class="nxt-modal-header">
                    <h4 class="nxt-modal-title">{{ title }}</h4>
                    <button type="button" class="nxt-modal-close-btn fa fa-times" (click)="close()"></button>
                </div>
                <div class="nxt-modal-content">
                    <div #nxtModalContent></div>
                </div>
            </div>
        </div>
    `,
})

export class NxtModalComponent {
    public title: string
    public className: string

    private content: any
    private context: any
    private index: number
    private viewContainerRef: ViewContainerRef
    private eventsService: EventsService
    private elementRef: ElementRef
    private componentResolver: ComponentFactoryResolver
    @ViewChild('nxtModalContent', { read: ViewContainerRef }) private nxtModalContent: ViewContainerRef

    constructor (
        @Inject('title') title: string,
        @Inject('content') content: any,
        @Inject('context') context: any,
        @Inject('className') className: string,
        @Inject('index') index: number,
        @Inject(EventsService) eventsService: EventsService,
        @Inject('viewContainerRef') viewContainerRef: ViewContainerRef,
        elementRef: ElementRef,
        componentResolver: ComponentFactoryResolver
    ) {
        this.title = title
        this.content = content
        this.context = context
        this.className = className
        this.index = index
        this.viewContainerRef = viewContainerRef
        this.eventsService = eventsService
        this.elementRef = elementRef
        this.componentResolver = componentResolver
    }

    public ngOnInit () {
        this.elementRef.nativeElement.querySelector('.nxt-modal-container').addEventListener('click', (e) => e.stopPropagation())

        this.eventsService.on(this, 'nxtModalUpdateTitle', (el, t: string) => {
            if (this.viewContainerRef.get(this.index) === el) {
                this.title = t
            }
        })

        const index = this.nxtModalContent.length

        let content = this.componentResolver.resolveComponentFactory(this.content)
        const providers: ValueProvider[] = [
            { provide: 'context', useValue: this.context },
            { provide: 'index', useValue: this.index },
            { provide: 'viewContainerRef', useValue: this.viewContainerRef },
            { provide: EventsService, useValue: this.eventsService },
        ]
        const childInjector = ReflectiveInjector.resolve(providers)
        const injector = ReflectiveInjector.fromResolvedProviders(childInjector, this.nxtModalContent.injector)
        this.nxtModalContent.createComponent(content, index, injector)
    }

    public ngOnDestroy () {
        this.eventsService.unsubscribe('nxtModalUpdateTitle', this)
    }

    public close () {
        this.viewContainerRef.remove(this.index)
    }
}
