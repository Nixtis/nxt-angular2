import { Component } from '@angular/core'

export class DynamicComponent {
    public static create<T extends IBase> (componentAttributes: any, superClass: IConstructor<T>) {
        class DynamicComponent extends (<IConstructor<IBase>> superClass) {}

        return Component(componentAttributes)(DynamicComponent)
    }
}

interface IConstructor<T> {
    new (...args): T
}

interface IBase {}
