export function getScrollHeight() {
  const h = document.documentElement;
  const b = document.body;
  const sh = "scrollHeight";
  return h[sh] || b[sh];
}

export function getScrollLeft() {
  return window.pageXOffset || document.body.scrollLeft;
}

export function getScrollTop() {
  return window.pageYOffset || document.body.scrollTop;
}

export const matches = (el: Element, selector: string) => (el.matches || el['msMatchesSelector']).call(el, selector);

// Checks if this element or any of its parents matches a given `selector`.
export function matchesAncestors(el: Element, selector: string): Element | null {
  let curr = el;
  while (curr != null) {
    if (matches(curr, selector)) return curr;
    curr = curr.parentNode instanceof Element ? curr.parentNode : null;
  }
  return null;
}

export function fragmentFromString(strHTML: string): DocumentFragment {
  return document.createRange().createContextualFragment(strHTML);
}
