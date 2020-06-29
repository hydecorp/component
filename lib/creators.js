import { Observable, animationFrames } from "rxjs";
import { map, takeWhile, endWith } from "rxjs/operators";
export function fetchRx(input, init) {
    return Observable.create((observer) => {
        const controller = new AbortController();
        const { signal } = controller;
        let response = null;
        fetch(input, { ...init, signal })
            .then(r => {
            response = r;
            observer.next(r);
            observer.complete();
        })
            .catch(x => observer.error(x));
        return () => { if (!response)
            controller.abort(); };
    });
}
export function fromMediaQuery(mql) {
    return Observable.create((o) => {
        const l = o.next.bind(o);
        mql.addListener(l);
        return () => mql.removeListener(l);
    });
}
export function tween(easingFn, b, c, d, s) {
    return animationFrames().pipe(takeWhile(t => t < d), endWith(d), map(t => easingFn(t, b, c, d, s)));
}
//# sourceMappingURL=creators.js.map