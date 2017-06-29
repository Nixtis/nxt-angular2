import { ComponentFactoryResolver, Inject, Injectable, ReflectiveInjector, ValueProvider, ViewContainerRef, ViewRef } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

import { NxtTooltipComponent } from './'

@Injectable()

export class NxtTooltipService {
    private componentResolver: ComponentFactoryResolver
    private domSanitizer: DomSanitizer

    constructor (
        @Inject(ComponentFactoryResolver) componentResolver,
        domSanitizer: DomSanitizer,
    ) {
        this.componentResolver = componentResolver
        this.domSanitizer = domSanitizer
    }

    public pop (viewContainerRef: ViewContainerRef, content: string, el: HTMLElement, position: string): Promise<ViewRef> {
        const tooltip = this.componentResolver.resolveComponentFactory(NxtTooltipComponent)
        const index = viewContainerRef.length

        const providers: ValueProvider[] = [
            { provide: 'content', useValue: this.domSanitizer.bypassSecurityTrustHtml(content) },
            { provide: HTMLElement, useValue: el },
            { provide: 'position', useValue: position },
        ]
        const childInjector = ReflectiveInjector.resolve(providers)
        const injector = ReflectiveInjector.fromResolvedProviders(childInjector, viewContainerRef.injector)

        viewContainerRef.createComponent(tooltip, index, injector)

        return new Promise((resolve, reject) => {
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
