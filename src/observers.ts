import { Observable, PartialObserver } from "rxjs";

export function createResizeObservable(el: HTMLElement): Observable<ResizeObserverEntry> {
  return Observable.create((obs: PartialObserver<ResizeObserverEntry>) => {
    const observer = new window.ResizeObserver(xs => xs.forEach(x => obs.next(x)));
    observer.observe(el);
    return () => { observer.unobserve(el); };
  });
}

export function createMutationObservable(el: HTMLElement, options?: MutationObserverInit): Observable<MutationRecord> {
  return Observable.create((obs: PartialObserver<MutationRecord>) => {
    const observer = new MutationObserver(xs => xs.forEach(x => obs.next(x)));
    observer.observe(el, options);
    return () => { observer.disconnect(); };
  });
}

export function createIntersectionObservable(els: HTMLElement|HTMLElement[], options?: IntersectionObserverInit): Observable<IntersectionObserverEntry[]> {
  return Observable.create((obs: PartialObserver<IntersectionObserverEntry[]>) => {
    const observer = new IntersectionObserver(xs => obs.next(xs), options);

    if (Array.isArray(els)) els.forEach(el => observer.observe(el));
    else observer.observe(els);

    return () => {
      if (Array.isArray(els)) els.forEach(el => observer.unobserve(el));
      else observer.unobserve(els);
    };
  });
}