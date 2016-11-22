import { ViewContainerRef } from '@angular/core'

import { EventsService } from '../../../helpers'

export class NxtModalContentComponent {
    public context: any

    protected eventsService: EventsService
    protected index: number

    private viewContainerRef: ViewContainerRef

    constructor (
        context: any,
        eventsService: EventsService,
        index: number,
        viewContainerRef: ViewContainerRef
    ) {
        this.context = context
        this.eventsService = eventsService
        this.index = index
        this.viewContainerRef = viewContainerRef
    }

    public ngOnInit () {
        this.eventsService.on(this, 'nxtModalUpdateContext', (el, c: string) => {
            if (this.viewContainerRef.get(this.index) === el) {
                this.context = c
            }
        })
    }

    public ngOnDestroy () {
        this.eventsService.unsubscribe('nxtModalUpdateContext', this)
    }
}
