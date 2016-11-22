import { Component, ViewEncapsulation } from '@angular/core'

import { Input } from '@angular/core'

import { NxtFormComponent, NxtFormService, NxtRadioItemComponent, inputs, outputs } from '../'

@Component({
    encapsulation: ViewEncapsulation.None,
    inputs,
    outputs,
    selector: 'nxt-radio',
    styles: [
        require('./_nxt-radio.component.scss'),
    ],
    template: `
        <div class="nxt-radio-container" [ngClass]="{ 'error': !valid && (touched || formSent), 'disabled': disabled }">
            <label>
                <div class="label" *ngIf="label != ''">{{label}} <span class="nxt-input-required" *ngIf="required">*</span> :</div>
            </label>
            <div class="nxt-radio-content">
                <ng-content></ng-content>
            </div>
            <div class="error-msg" *ngIf="!valid && (touched || formSent)">{{errorMsg}}</div>
        </div>
    `,
})

export class NxtRadioComponent extends NxtFormComponent {
    @Input() public label: string
    private radios: NxtRadioItemComponent[]

    constructor (nxtFormService: NxtFormService) {
        super(nxtFormService)

        this.radios = []
    }

    set value (value: any) {
        if (this.radios === undefined) {
            this.radios = []
        }

        if (this._value !== value) {
            let radio = this.radios.filter(r => r.value === value)

            if (radio.length > 0) {
                this.initChange(radio[0])
            }
        }
    }

    get value () {
        return this._value
    }

    public addItem (item: NxtRadioItemComponent) {
        this.radios.push(item)

        if (this.value === item.value) {
            this.initChange(item)
        }
    }

    public initChange (item: NxtRadioItemComponent) {
        if (!this.disabled) {
            this.onChange(item.value)

            item.selected = true

            this.radios.forEach(radio => {
                if (radio !== item) {
                    radio.selected = false
                }
            })
        }
    }

    public reset () {
        this.onChange('', false)

        this.radios.forEach(radio => radio.selected = false)
    }
}
