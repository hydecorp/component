import { LitElement } from "lit-element";
import { Subject } from "rxjs";
export declare class RxLitElement extends LitElement {
    $connected: Subject<boolean>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private firstUpdate;
    $: {};
    firstUpdated(): void;
    updated(changedProperties: Map<string, any>): void;
}
export declare function applyMixins<T>(derivedCtor: Constructor<T>, baseCtors: Constructor<any>[]): Constructor<T>;
