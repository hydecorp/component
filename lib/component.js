import { LitElement } from "lit-element";
import { Subject } from "rxjs";
export class RxLitElement extends LitElement {
    constructor() {
        super(...arguments);
        this.$connected = new Subject();
    }
    connectedCallback() {
        super.connectedCallback();
        this.$connected.next(true);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.$connected.next(false);
    }
    firstUpdated() {
        this.firstUpdate = true;
    }
    updated(changedProperties) {
        if (!this.firstUpdate)
            for (const prop of changedProperties.keys()) {
                if (prop in this.$)
                    this.$[prop].next(this[prop]);
            }
        this.firstUpdate = false;
    }
    fireEvent(name, eventInitDict) {
        this.dispatchEvent(new CustomEvent(name, eventInitDict));
        this.dispatchEvent(new CustomEvent(`${this.tagName.toLowerCase()}-${name}`, eventInitDict));
    }
}
export function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
    return derivedCtor;
}
//# sourceMappingURL=component.js.map