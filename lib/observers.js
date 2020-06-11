import { Observable } from "rxjs";
export function createResizeObservable(el) {
    return Observable.create((obs) => {
        const observer = new window.ResizeObserver(xs => xs.forEach(x => obs.next(x)));
        observer.observe(el);
        return () => { observer.unobserve(el); };
    });
}
export function createMutationObservable(el, options) {
    return Observable.create((obs) => {
        const observer = new MutationObserver(xs => xs.forEach(x => obs.next(x)));
        observer.observe(el, options);
        return () => { observer.disconnect(); };
    });
}
export function createIntersectionObservable(els, options) {
    return Observable.create((obs) => {
        const observer = new IntersectionObserver(xs => obs.next(xs), options);
        if (Array.isArray(els))
            els.forEach(el => observer.observe(el));
        else
            observer.observe(els);
        return () => {
            if (Array.isArray(els))
                els.forEach(el => observer.unobserve(el));
            else
                observer.unobserve(els);
        };
    });
}
