import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core'
import { SafeHtml } from '@angular/platform-browser'
import { Observable } from 'rxjs/Rx'

import { NxtFormComponent, NxtFormService, NxtSelectOptionComponent, inputs, outputs } from '../'

@Component({
    encapsulation: ViewEncapsulation.None,
    host: {
        '(document:click)': 'onClick($event)',
    },
    inputs,
    outputs,
    selector: 'nxt-select',
    styles: [
        require('./_nxt-select.component.scss'),
    ],
    template: `
        <div class="nxt-select-container" [ngClass]="{'error': !valid && (touched || formSent), 'disabled': disabled}">
            <label>
                <div class="label" *ngIf="label != ''">{{label}} <span class="nxt-input-required" *ngIf="required">*</span> :</div>
                <input type="text" *ngIf="autocomplete" (keyup)="keyup($event)" [(ngModel)]="currentTextOption" [placeholder]="placeholder" class="nxt-select-input-autocomplete" autocomplete="off" [disabled]="disabled" />
                <div *ngIf="autocomplete && loading" class="nxt-select-loader"></div>
            </label>

            <div class="nxt-select-dropdown" *ngIf="!autocomplete" (click)="showOptions = disabled ? false : !showOptions">
                <span class="nxt-select-current-option" [innerHtml]="currentOption"></span>
                <span class="fa fa-caret-down"></span>
            </div>

            <div [hidden]="!showOptions" class="nxt-select-options">
                <ng-content></ng-content>
                <nxt-select-option *ngFor="let option of autocompleteResults" [value]="option.value">{{ option.label }}</nxt-select-option>
            </div>

            <div class="error-msg" *ngIf="!valid && (touched || formSent)">{{errorMsg}}</div>
        </div>
    `,
})

export class NxtSelectComponent extends NxtFormComponent {
    @Input() public label: string

    @Input() public autocomplete: boolean
    @Input() public currentTextOption: string
    @Input() public placeholder: string = ''
    @Output() public autocompleteCallback: any = new EventEmitter<Observable<{}>>()

    public autocompleteResults: INxtSelectAutocompleteResults[]
    public showOptions: boolean
    public loading: boolean
    public currentOption: SafeHtml

    private optionsList: NxtSelectOptionComponent[]

    private initialValue: string
    private initialTextOption: string
    private initialOption: SafeHtml
    private timeout: any
    private elementRef: ElementRef

    constructor (
        elementRef: ElementRef,
        nxtFormService: NxtFormService
    ) {
        super(nxtFormService)

        this.label = ''

        this.initialValue = ''
        this.initialTextOption = ''
        this.initialOption = ''
        this.showOptions = false
        this.loading = false
        this.currentTextOption = ''
        this.currentOption = ''
        this.optionsList = []
        this.elementRef = elementRef
    }

    public ngOnInit () {
        if (this.initialValue === '') {
            this.initialValue = this._value
        }

        this.init()
    }

    set value (value: any) {
        if (this.optionsList === undefined) {
            this.optionsList = []
        }

        if (this.optionsList.length === 0) {
            this.initialValue = value
        }

        if (this._value !== value) {
            let options = this.optionsList.filter(o => o.value === value)

            if (options.length > 0 && this.checkIfOptionInDom(options[0])) {
                this.initChange(options[0])
            } else {
                this.onChange(value)
            }
        }
    }

    get value () {
        return this._value
    }

    public initChange (option: NxtSelectOptionComponent) {
        this.showOptions = false

        this.currentTextOption = ''
        this.currentTextOption = option.textContent
        this.currentOption = ''
        this.currentOption = option.getInnerHTML()
        this.autocompleteResults = []

        this.onChange(option.value)
    }

    public keyup (event) {
        let search = event.path !== undefined ? event.path[0].value : event.target.value
        this.showOptions = true
        this.loading = true

        this.nxtFormService.dispatch('cancelSearch')
        clearTimeout(this.timeout)

        let cancelled = false
        this.nxtFormService.on(event, 'cancelSearch', () => {
            cancelled = true

            this.nxtFormService.unsubscribe('cancelSearch', event)
        })

        let callback = (res: INxtSelectAutocompleteResults[]) => {
            if (!cancelled) {
                this.autocompleteResults = res
                this.loading = false
            }
        }

        this.timeout = setTimeout(() => {
            this.autocompleteCallback.emit({ callback, search })
        }, 500)
    }

    public addOption (option: NxtSelectOptionComponent) {
        this.optionsList.push(option)

        if (!this.autocomplete && ((this.currentOption === '' && (this._value === '' || this._value === undefined)) || this._value === option.value || this.initialValue === option.value)) {
            this.initialTextOption = option.textContent
            this.initialOption = option.getInnerHTML()
            this.initChange(option)
            this.touched = false
        }
    }

    public onClick (event) {
        let target = event.path !== undefined ? event.path[0] : event.target
        let selectDropdown = this.elementRef.nativeElement.querySelector('.nxt-select-dropdown') || this.elementRef.nativeElement.querySelector('.nxt-select-input-autocomplete')
        let selectOptions = this.elementRef.nativeElement.querySelector('.nxt-select-options')

        if (!selectDropdown.contains(target) && !selectOptions.contains(target)) {
            this.showOptions = false
        }
    }

    public reset () {
        this.showOptions = false

        this.currentTextOption = this.initialTextOption
        this.currentOption = this.initialOption
        this.onChange(this.initialValue, false)
    }

    private checkIfOptionInDom (option: NxtSelectOptionComponent) {
        let selectOptions = this.elementRef.nativeElement.querySelector('.nxt-select-options')
        let optionElement = option.elementRef.nativeElement

        if (selectOptions.contains(optionElement)) {
            return true
        } else {
            this.optionsList = this.optionsList.filter(o => o !== option)

            return false
        }
    }
}

export interface INxtSelectAutocompleteResults {
    value: any
    label: string
}
