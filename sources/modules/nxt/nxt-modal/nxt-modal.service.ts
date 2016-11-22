import { ComponentFactoryResolver, Injectable, ReflectiveInjector, ValueProvider, ViewContainerRef, ViewRef } from '@angular/core'

import { EventsService } from '../../../helpers'
import { NxtModalContentComponent } from './nxt-modal-content.component'
import { NxtModalComponent } from './nxt-modal.component'

@Injectable()

export class NxtModalService extends EventsService {
    private componentResolver: ComponentFactoryResolver

    constructor (
        componentResolver: ComponentFactoryResolver
    ) {
        super()

        this.componentResolver = componentResolver
    }

    public pop (viewContainerRef: ViewContainerRef, title: string, content: any, context: any, className: string = ''): Promise<ViewRef> {
        const index = viewContainerRef.length

        if (!(content.prototype instanceof NxtModalContentComponent)) {
            throw new Error('Component class must extends NxtModalContentComponent')
        }

        let modal = this.componentResolver.resolveComponentFactory(NxtModalComponent)
        const providers: ValueProvider[] = [
            { provide: 'title', useValue: title },
            { provide: 'content', useValue: content },
            { provide: 'context', useValue: context },
            { provide: 'className', useValue: className },
            { provide: 'index', useValue: index },
            { provide: 'viewContainerRef', useValue: viewContainerRef },
            { provide: 'nxtModalService', useValue: this },
            { provide: EventsService, useValue: this },
        ]
        const childInjector = ReflectiveInjector.resolve(providers)
        const injector = ReflectiveInjector.fromResolvedProviders(childInjector, viewContainerRef.injector)

        return new Promise(resolve => {
            viewContainerRef.createComponent(modal, index, injector)
            resolve(viewContainerRef.get(index))
        })
    }

    public close (viewContainerRef: ViewContainerRef, viewRef) {
        const index =  viewContainerRef.indexOf(viewRef)

        if (index > -1) {
            viewContainerRef.remove(index)
        }
    }
}
