export declare function getScrollHeight(): number;
export declare function getScrollLeft(): number;
export declare function getScrollTop(): number;
export declare const matches: (el: Element, selector: string) => any;
export declare function matchesAncestors(el: Element, selector: string): Element | null;
export declare function fragmentFromString(strHTML: string): DocumentFragment;
declare type Resolver<T> = (value: T | PromiseLike<T>) => void;
declare type Rejector = (reason?: any) => void;
declare type ResolvablePromise<T> = Promise<T> & {
    resolve: Resolver<T>;
    reject: Rejector;
};
export declare function createResolvablePromise<T>(): ResolvablePromise<T>;
export {};
