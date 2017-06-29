import { ComponentFactoryResolver, ComponentRef, Injectable, ReflectiveInjector, ValueProvider, ViewContainerRef, ViewRef } from '@angular/core'

import { EventsService } from '../../../helpers'
import { NxtModalContentComponent } from './nxt-modal-content.component'
import { NxtModalComponent } from './nxt-modal.component'

@Injectable()

export class NxtModalService extends EventsService {
    private componentResolver: ComponentFactoryResolver

    constructor (
        componentResolver: ComponentFactoryResolver,
    ) {
        super()

        this.componentResolver = componentResolver
    }

    public pop (viewContainerRef: ViewContainerRef, title: string, content: any, context: any, className: string = ''): Promise<ViewRef> {
        if (!(content.prototype instanceof NxtModalContentComponent)) {
            throw new Error('Component class must extends NxtModalContentComponent')
        }

        const modal = this.componentResolver.resolveComponentFactory(NxtModalComponent)
        const providers: ValueProvider[] = [
            { provide: 'title', useValue: title },
            { provide: 'content', useValue: content },
            { provide: 'context', useValue: context },
            { provide: 'className', useValue: className },
            { provide: 'viewContainerRef', useValue: viewContainerRef },
            { provide: 'nxtModalService', useValue: this },
            { provide: EventsService, useValue: this },
        ]
        const childInjector = ReflectiveInjector.resolve(providers)
        const injector = ReflectiveInjector.fromResolvedProviders(childInjector, viewContainerRef.injector)

        return new Promise((resolve) => {
            const index = viewContainerRef.length

            const componentRef: ComponentRef<NxtModalComponent> = viewContainerRef.createComponent(modal, index, injector)
            const viewRef = viewContainerRef.get(index)

            componentRef.instance.setViewRef(viewRef)

            resolve(viewRef)
        })
    }

    public close (viewContainerRef: ViewContainerRef, viewRef) {
        const index =  viewContainerRef.indexOf(viewRef)

        if (index > -1) {
            viewContainerRef.remove(index)
        }
    }
}
