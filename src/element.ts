import { LitElement } from "lit-element";
import { Subject } from "rxjs";

export class RxLitElement extends LitElement {
  $connected = new Subject<boolean>();

  connectedCallback() { 
    super.connectedCallback();
    this.$connected.next(true);
  }

  disconnectedCallback() { 
    super.disconnectedCallback();
    this.$connected.next(false);
  }

  private firstUpdate: boolean;

  $: {};

  firstUpdated() {
    this.firstUpdate = true;
  }

  updated(changedProperties: Map<string, any>) {
    if (!this.firstUpdate) for (const prop of changedProperties.keys()) {
      if (prop in this.$) this.$[prop].next(this[prop]);
    }
    this.firstUpdate = false;
  }
}

export function applyMixins<T>(derivedCtor: Constructor<T>, baseCtors: Constructor<any>[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
  return derivedCtor;
}