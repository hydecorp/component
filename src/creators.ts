import { Observable, PartialObserver, animationFrames } from "rxjs";
import { map, takeWhile, endWith } from "rxjs/operators";

export function fetchRx(input: RequestInfo, init?: RequestInit): Observable<Response> {
  return Observable.create((observer: PartialObserver<Response>) => {
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

    return () => { if (!response) controller.abort(); };
  });
}

export function fromMediaQuery(mql: MediaQueryList): Observable<MediaQueryListEvent> {
  return Observable.create((o: PartialObserver<MediaQueryListEvent>) => {
    const l = o.next.bind(o);
    mql.addListener(l);
    return () => mql.removeListener(l);
  });
}

export function tween(easingFn: (t: number, b: number, c: number, d: number, s?: number) => number, b: number, c: number, d: number, s?: number): Observable<number> {
  return animationFrames().pipe(
    takeWhile(t => t < d),
    endWith(d),
    map(t => easingFn(t, b, c, d, s)),
  )
}
