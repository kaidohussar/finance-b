// Contentstorage Live Editor v1.0.18 - Built 2025-11-05T18:41:25.231Z
console.log('FUCKKKKK');
const e = 'parent-handshake-acknowledge',
  t = 'contentstorage-set-config',
  n = 'contentstorage-set-highlight-content',
  o = 'contentstorage-set-hide-highlight-content',
  r = 'contentstorage-show-pending-changes',
  i = 'contentstorage-show-original-content',
  a = 'contentstorage-request-screenshot',
  s = 'contentstorage-handshake-initiate',
  c = 'contentstorage-click-item-edit-btn',
  l = 'contentstorage-found-content-nodes',
  d = 'contentstorage-screenshot-response',
  u = (e, t) => {
    const n = { type: e, payload: t };
    (console.log('[Live editor] Sending message to parent:', n),
      window.parent.postMessage(n, '*'));
  };
const h = (e) => /\{\{[^}]+\}\}|\{[^}]+\}/g.test(e),
  f = (e) => {
    let t = e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return (
      (t = t.replace(/\\{\\{[^}]+\\}\\}/g, '(.+?)')),
      (t = t.replace(/\\{[^}]+\\}/g, '(.+?)')),
      (t = t.trim()),
      new RegExp(t, 'i')
    );
  },
  p = (e, t) => {
    if (h(t))
      try {
        return f(t).test(e.trim());
      } catch (n) {
        return (
          console.warn('[Live editor] Variable pattern matching failed:', n),
          e.includes(t)
        );
      }
    return e.includes(t);
  },
  g = (e) => {
    if (!e) return '';
    const t = document.createElement('div');
    return ((t.innerHTML = e), t.textContent || t.innerText || '');
  },
  m = (e) => (e ? e.replace(/\s+/g, ' ').trim() : '');
let y = !1;
const w = new Map(),
  b = (e, t, n = !1) => {
    const o = m(e.trim()),
      r = m(t.trim());
    if (n) {
      if (o === r) return !0;
      if (h(r))
        try {
          return ((e) => {
            let t = e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            return (
              (t = t.replace(/\\{\\{[^}]+\\}\\}/g, '(.+?)')),
              (t = t.replace(/\\{[^}]+\\}/g, '(.+?)')),
              (t = t.trim()),
              new RegExp(`^${t}$`, 'i')
            );
          })(r).test(o);
        } catch {
          return !1;
        }
      return !1;
    }
    if (p(o, r)) return !0;
    if (/<[^>]+>/.test(t)) {
      const e = g(t),
        n = m(e),
        r = h(n) ? 2 : 3,
        i = h(n) ? 0.15 : 0.2;
      if (o.length < r) return !1;
      if (o.length / n.length < i) return !1;
      const a = n.length / o.length;
      if (a < 0.3) return !1;
      if (o.length < 4) {
        if (a > 3) return !1;
      }
      return (h(n) && p(o, n)) || n.toLowerCase().includes(o.toLowerCase());
    }
    return !1;
  },
  E = (e, t) => {
    Object.entries(t).forEach(([t, n]) => {
      e.style.setProperty(t, n, 'important');
    });
  },
  v = (e) => {
    E(e, {
      'font-family':
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      'font-size': '14px',
      'font-weight': 'normal',
      'font-style': 'normal',
      'line-height': 'normal',
      color: 'inherit',
      'text-decoration': 'none',
      'text-transform': 'none',
      'letter-spacing': 'normal',
      'text-align': 'left',
      'text-indent': '0',
      'white-space': 'normal',
      'word-spacing': 'normal',
      margin: '0',
      padding: '0',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      'box-sizing': 'border-box',
      'vertical-align': 'baseline',
      'text-shadow': 'none',
      'box-shadow': 'none',
      opacity: '1',
      visibility: 'visible',
      overflow: 'visible',
      transform: 'none',
      transition: 'none',
      animation: 'none',
    });
  },
  x = (e, t) => {
    if (e.nodeType === Node.TEXT_NODE && e.textContent) {
      const n = e.parentElement;
      if (n?.getAttribute('data-content-key') === t) return;
      const o = document.createElement('span');
      (o.setAttribute('data-content-key', t), (o.textContent = e.textContent));
      (E(o, { 'box-sizing': 'border-box' }), e.parentNode?.replaceChild(o, e));
    } else if (e.nodeType === Node.ELEMENT_NODE) {
      const n = e;
      if (n.getAttribute('data-content-key') === t) return;
      n.setAttribute('data-content-key', t);
    }
  },
  N = (e) => {
    if (e.nodeType === Node.TEXT_NODE && e.textContent) {
      const t = e.parentElement;
      if (t?.hasAttribute('data-content-checked')) return;
      const n = document.createElement('span');
      (n.setAttribute('data-content-checked', 'true'),
        (n.textContent = e.textContent),
        e.parentNode?.replaceChild(n, e));
    } else if (e.nodeType === Node.ELEMENT_NODE) {
      const t = e;
      if (t.hasAttribute('data-content-checked')) return;
      t.setAttribute('data-content-checked', 'true');
    }
  },
  T = () => {
    (w.forEach((e) => {
      if (
        (console.log(
          `[GROUPING] Processing group for contentKey: ${e.contentKey}, nodes: ${e.nodes.length}`
        ),
        0 === e.nodes.length)
      )
        return;
      if (
        ((e.commonParent = ((e) => {
          if (0 === e.length) return null;
          if (1 === e.length) return e[0].parentElement;
          const t = e[0].parentElement;
          if (e.every((e) => e.parentElement === t) && t) return t;
          const n = [];
          let o = e[0].parentElement;
          for (; o && o !== document.body; ) (n.push(o), (o = o.parentElement));
          for (const t of n) if (e.every((e) => t.contains(e))) return t;
          return null;
        })(e.nodes)),
        !e.commonParent)
      )
        return void e.nodes.forEach((t) => x(t, e.contentKey));
      if (
        !((e, t) => {
          const n = e.querySelectorAll('input, img');
          for (const e of Array.from(n)) {
            const n = e.getAttribute('data-content-key');
            if (n && n !== t) return !1;
            if (!n) return !1;
          }
          const o = new Set([
              'span',
              'strong',
              'em',
              'b',
              'i',
              'a',
              'code',
              'small',
              'mark',
              'u',
              's',
              'sub',
              'sup',
              'abbr',
              'cite',
              'kbd',
              'samp',
              'var',
              'time',
              'data',
              'q',
              'dfn',
              'ins',
              'del',
              'bdi',
              'bdo',
            ]),
            r = Array.from(e.querySelectorAll('*'));
          for (const e of r) {
            const n = e.tagName.toLowerCase();
            if (
              'contentstorage-element-label' !== e.id &&
              'contentstorage-element-button' !== e.id &&
              e.getAttribute('data-content-key') !== t &&
              !e.hasAttribute('data-content-checked') &&
              !o.has(n)
            )
              return !1;
          }
          return !0;
        })(e.commonParent, e.contentKey)
      )
        return void e.nodes.forEach((t) => x(t, e.contentKey));
      const t = document.createElement('span');
      t.setAttribute('data-content-key', e.contentKey);
      E(t, { 'box-sizing': 'border-box' });
      (Array.from(e.commonParent.childNodes).forEach((e) => {
        t.appendChild(e);
      }),
        e.commonParent.appendChild(t));
    }),
      w.clear());
  },
  C = (e, t) => {
    const n = e.parentElement;
    if (!n) return !1;
    if ('' === t) {
      if (n.hasAttribute('data-content-checked')) return !0;
      for (const e of Array.from(n.children))
        if (e.hasAttribute('data-content-checked')) return !0;
      let e = n.parentElement,
        t = 0;
      const o = 5;
      for (; e && e !== document.body && t < o; ) {
        if (e.hasAttribute('data-content-checked')) return !0;
        ((e = e.parentElement), t++);
      }
    } else {
      if (n.getAttribute('data-content-key') === t) return !0;
      for (const e of Array.from(n.children))
        if (e.getAttribute('data-content-key') === t) return !0;
      let e = n.parentElement,
        o = 0;
      const r = 5;
      for (; e && e !== document.body && o < r; ) {
        if (e.getAttribute('data-content-key') === t) return !0;
        ((e = e.parentElement), o++);
      }
    }
    return !1;
  },
  L = (e, t) => {
    if (
      e.nodeType === Node.ELEMENT_NODE &&
      ('IMG' === e.tagName || 'INPUT' === e.tagName)
    ) {
      const n = e;
      let o;
      if ('IMG' === n.tagName) {
        const e = n;
        o = t.find((t) => 'image' === t.type && t.url === e.src);
      } else {
        const e = n,
          r = e.placeholder?.trim() || e.getAttribute('aria-label')?.trim();
        r &&
          (o = t.find((e) =>
            'text' === e.type
              ? b(r, e.text, !0)
              : 'variation' === e.type
                ? b(r, e.variation || e.text, !0)
                : void 0
          ));
      }
      return void (o ? x(e, o.contentKey[o.contentKey.length - 1]) : N(e));
    }
    if (e.nodeType === Node.TEXT_NODE && e.textContent?.trim()) {
      const n = e.parentElement,
        o = n?.getAttribute('data-content-key');
      let r;
      if (o) r = t.find((e) => e.contentKey.includes(o));
      else {
        let o = null;
        if (n)
          for (const e of Array.from(n.children)) {
            const t = e.getAttribute('data-content-key');
            if (t) {
              o = t;
              break;
            }
          }
        if (
          (o &&
            ((r = t.find((e) => e.contentKey.includes(o))),
            !r ||
              ('text' !== r.type && 'variation' !== r.type) ||
              !e.textContent ||
              b(e.textContent, r.text) ||
              (r = void 0)),
          !r)
        ) {
          const n = t.filter(
            (t) =>
              ('text' === t.type || 'variation' === t.type) &&
              e.textContent &&
              b(e.textContent, t.text)
          );
          1 === n.length
            ? (r = n[0])
            : n.length > 1 &&
              (r = n.reduce((e, t) => {
                if (
                  !(
                    ('text' !== e.type && 'variation' !== e.type) ||
                    ('text' !== t.type && 'variation' !== t.type)
                  )
                ) {
                  const n = g(e.text);
                  if (g(t.text).length > n.length) return t;
                }
                return e;
              }));
        }
      }
      if (r) {
        const t = r.contentKey[r.contentKey.length - 1];
        if (!C(e, t)) {
          w.has(t) ||
            w.set(t, { nodes: [], commonParent: null, contentKey: t });
          w.get(t).nodes.push(e);
        }
      } else C(e, '') || N(e);
      return;
    }
    if (e.nodeType === Node.ELEMENT_NODE) {
      const t = e;
      if (
        t.hasAttribute('data-content-key') ||
        t.hasAttribute('data-content-checked')
      )
        return;
    }
    const n = Array.from(e.childNodes);
    for (const e of n) L(e, t);
  },
  k = (e, t) => {
    if (!y) {
      y = !0;
      try {
        e && e?.length > 0 && (L(document.body, e), T());
        document.querySelectorAll('[data-content-key]').forEach((e) => {
          const n = e.dataset.contentKey;
          if (!n || !t) return;
          const o = (function (e) {
              return e && 'IMG' === e.tagName;
            })(e),
            r = 'INPUT' === e.tagName;
          let i,
            a = null;
          if (o) i = e.src;
          else if (r) {
            const t = e;
            i = t.placeholder || t.getAttribute('aria-label');
          } else i = e.textContent;
          const s = e.getAttribute('data-content-showing-pending-change');
          if (!i) return;
          const l = e.hasAttribute('data-content-key');
          if (!s && !l) {
            let e = window.memoryMap.has(i);
            if (!e && !o && !r) {
              const t = m(i.trim());
              for (const [n] of window.memoryMap) {
                if (h(n))
                  try {
                    if (f(n).test(t)) {
                      e = !0;
                      break;
                    }
                  } catch {
                    continue;
                  }
                const o = g(n);
                if (o !== n) {
                  const n = m(o);
                  if (h(o))
                    try {
                      if (f(o).test(t)) {
                        e = !0;
                        break;
                      }
                    } catch {
                      continue;
                    }
                  else if (n.includes(t)) {
                    e = !0;
                    break;
                  }
                }
              }
            }
            if (!e) return;
          }
          if (o || r) {
            const t = o
                ? 'contentstorage-element-image-wrapper'
                : 'contentstorage-element-input-wrapper',
              n = e.parentNode;
            if (n && n.id === t) a = n;
            else {
              ((a = document.createElement('div')),
                a.setAttribute('id', t),
                v(a));
              (E(a, {
                position: 'relative',
                display: 'inline-block',
                'vertical-align': 'baseline',
                'max-width': 'none',
                'max-height': 'none',
                'min-width': '0',
                'min-height': '0',
              }),
                e.parentNode &&
                  (e.parentNode.insertBefore(a, e), a.appendChild(e)));
            }
            E(a, {
              outline: '1px solid #1791FF',
              'border-radius': o ? '2px' : '4px',
              'outline-offset': '0',
            });
          } else {
            E(e, {
              outline: '1px solid #1791FF',
              'outline-offset': '4px',
              'border-radius': '2px',
              position: 'relative',
            });
          }
          const d = a || e;
          if (d.querySelector('#contentstorage-element-label')) return;
          const p = document.createElement('div');
          (p.setAttribute('id', 'contentstorage-element-label'),
            (p.textContent = n),
            v(p));
          const y = {
            position: 'absolute',
            left: 'calc(100% + 10px)',
            color: '#1791FF',
            'font-size': '10px',
            'font-weight': '400',
            'font-family':
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            'line-height': '1.2',
            'z-index': '9999',
            'pointer-events': 'none',
            'user-select': 'none',
            'white-space': 'nowrap',
            'text-align': 'left',
            display: 'block',
            'max-width': 'none',
            width: 'auto',
            height: 'auto',
          };
          (r || o ? (y.bottom = '0px') : (y.top = '4px'), E(p, y));
          const w = ((e) => {
            const t = document.createElement('button');
            (t.setAttribute('id', 'contentstorage-element-button'),
              (t.type = 'button'),
              v(t),
              E(t, {
                width: '30px',
                height: '30px',
                position: 'absolute',
                top: '-25px',
                right: '-15px',
                cursor: 'pointer',
                border: '1px solid #C0C0CA',
                'background-color': '#EAF1F9',
                'border-radius': '30px',
                display: 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                padding: '0',
                color: '#222225',
                'z-index': '9999',
                'min-width': '30px',
                'min-height': '30px',
                'max-width': '30px',
                'max-height': '30px',
                'flex-shrink': '0',
                'user-select': 'none',
                'pointer-events': 'auto',
                'font-size': '0',
                'line-height': '1',
              }),
              (t.onclick = (t) => {
                (t.stopPropagation(),
                  t.preventDefault(),
                  u(c, { contentKey: e }));
              }));
            const n = 'http://www.w3.org/2000/svg',
              o = document.createElementNS(n, 'svg');
            (o.setAttribute('xmlns', n),
              o.setAttribute('viewBox', '0 0 20 20'),
              o.setAttribute('fill', 'currentColor'),
              o.setAttribute('width', '16'),
              o.setAttribute('height', '16'),
              E(o, {
                display: 'block',
                'pointer-events': 'none',
                'user-select': 'none',
                'flex-shrink': '0',
                width: '16px',
                height: '16px',
                'min-width': '16px',
                'min-height': '16px',
                'max-width': '16px',
                'max-height': '16px',
                margin: '0',
                padding: '0',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                'box-sizing': 'border-box',
                'vertical-align': 'baseline',
                fill: 'currentColor',
                stroke: 'none',
                'stroke-width': '0',
                opacity: '1',
                visibility: 'visible',
                overflow: 'visible',
                transform: 'none',
                transition: 'none',
                animation: 'none',
                filter: 'none',
                'clip-path': 'none',
                mask: 'none',
              }));
            const r = document.createElementNS(n, 'path');
            return (
              r.setAttribute(
                'd',
                'M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'
              ),
              E(r, {
                fill: 'currentColor',
                stroke: 'none',
                'stroke-width': '0',
                margin: '0',
                padding: '0',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                'box-sizing': 'border-box',
                'vertical-align': 'baseline',
                opacity: '1',
                visibility: 'visible',
                transform: 'none',
                transition: 'none',
                animation: 'none',
                filter: 'none',
                'clip-path': 'none',
                mask: 'none',
                'pointer-events': 'none',
                'user-select': 'none',
              }),
              o.appendChild(r),
              t.appendChild(o),
              t
            );
          })(n);
          (d.appendChild(p), d.appendChild(w));
        });
      } finally {
        y = !1;
      }
    }
  },
  S = (e) => {
    e.forEach((e) => {
      const t = document.querySelector(`[data-content-key="${e.contentId}"]`);
      if (t) {
        const n = t.childNodes;
        for (const o of n)
          if (
            o.nodeType === Node.TEXT_NODE &&
            o.textContent &&
            o.textContent.trim().length > 0
          ) {
            (e.value?.toString() || '') &&
              e.langCountry === window.currentLanguageCode &&
              (t.setAttribute('data-content-showing-pending-change', 'true'),
              (o.nodeValue = e.value?.toString() || ''));
            break;
          }
      }
    });
  };
let A = { highlightEditableContent: !1, showPendingChanges: !1 };
const R = (e) => {
    A = { ...A, ...e };
  },
  P = () => A,
  F = (e, t = !1, n = !1) =>
    !('checkVisibility' in e) ||
    e.checkVisibility({ checkOpacity: t, checkVisibilityCSS: n }),
  M = (e) => !!e && (!!e.isContentEditable || M(e.parentElement));
let $ = [];
function I(e) {
  if (e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = e;
  return (
    t.hasAttribute('data-content-key') || t.hasAttribute('data-content-checked')
  );
}
function D() {
  try {
    const e = (() => {
      const e = [],
        t = (e) =>
          e instanceof HTMLScriptElement ||
          e instanceof HTMLStyleElement ||
          e instanceof HTMLTextAreaElement ||
          e instanceof HTMLOptionElement ||
          'NOSCRIPT' === e.tagName,
        n = !!document.querySelector('[contenteditable="true"]'),
        o = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
          {
            acceptNode: (e) => {
              if (e.nodeType === Node.ELEMENT_NODE) {
                const o = e,
                  r = 'IMG' === o.tagName,
                  i =
                    'INPUT' === o.tagName &&
                    (o.placeholder?.trim() ||
                      o.getAttribute('aria-label')?.trim());
                if (r || i) {
                  let e = o;
                  for (; e && e !== document.body; ) {
                    if (e.hasAttribute('data-content-checked'))
                      return NodeFilter.FILTER_REJECT;
                    e = e.parentElement;
                  }
                  return t(o)
                    ? NodeFilter.FILTER_REJECT
                    : F(o)
                      ? n && M(o)
                        ? NodeFilter.FILTER_REJECT
                        : NodeFilter.FILTER_ACCEPT
                      : NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_SKIP;
              }
              if (e.nodeType === Node.TEXT_NODE) {
                if (!e.textContent?.trim()) return NodeFilter.FILTER_SKIP;
                const o = e.parentElement;
                if (!o) return NodeFilter.FILTER_REJECT;
                let r = o;
                for (; r && r !== document.body; ) {
                  if (r.hasAttribute('data-content-checked'))
                    return NodeFilter.FILTER_REJECT;
                  r = r.parentElement;
                }
                return t(o)
                  ? NodeFilter.FILTER_REJECT
                  : F(o)
                    ? n && M(o)
                      ? NodeFilter.FILTER_REJECT
                      : NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_SKIP;
            },
          }
        );
      let r;
      for (; (r = o.nextNode()); ) e.push(r);
      return e;
    })();
    if (e.length > 0) {
      const t = e
          .map((e) => {
            if (e.nodeType === Node.TEXT_NODE && e.textContent?.trim()) {
              let t = window.memoryMap?.get(e.textContent);
              if (!t) {
                const n = e.textContent.trim(),
                  o = m(n);
                for (const [e, n] of window.memoryMap) {
                  if (h(e))
                    try {
                      if (f(e).test(o)) {
                        t = n;
                        break;
                      }
                    } catch {
                      continue;
                    }
                  const r = g(e),
                    i = m(r);
                  if (r !== e)
                    if (h(r))
                      try {
                        if (f(r).test(o)) {
                          t = n;
                          break;
                        }
                      } catch {
                        continue;
                      }
                    else if (i.includes(o)) {
                      t = n;
                      break;
                    }
                }
              }
              const n = e.parentElement?.getAttribute(
                'data-content-showing-pending-change'
              );
              if (n) {
                const n =
                  e.parentElement?.getAttribute('data-content-key') || '';
                Array.from(window.memoryMap).forEach((e) => {
                  e[1].ids.has(n) && (t = e[1]);
                });
              }
              const o = Array.from(t?.ids || []),
                r = t?.variation;
              if (0 === o.length) return null;
              return {
                type: r ? 'variation' : 'text',
                text: e.textContent.trim(),
                contentKey: o,
                variation: r || '',
              };
            }
            if (e.nodeType === Node.ELEMENT_NODE) {
              const t = e;
              if ('IMG' === t.tagName) {
                const e = t,
                  n = Array.from(window.memoryMap?.get(e.src)?.ids || []);
                return 0 === n.length
                  ? null
                  : {
                      type: 'image',
                      url: e.src,
                      altText: e.alt,
                      contentKey: n,
                    };
              }
              if ('INPUT' === t.tagName) {
                const e = t,
                  n =
                    e.placeholder?.trim() ||
                    e.getAttribute('aria-label')?.trim();
                if (!n) return null;
                const o = window.memoryMap?.get(n),
                  r = Array.from(o?.ids || []),
                  i = o?.variation;
                if (0 === r.length) return null;
                return {
                  type: i ? 'variation' : 'text',
                  text: n,
                  contentKey: r,
                  variation: i || '',
                };
              }
            }
            return null;
          })
          .filter(Boolean),
        n = (function (e) {
          const t = new Map();
          for (const n of e) {
            const e = n.contentKey.join('|');
            (t.has(e) || t.set(e, []), t.get(e).push(n));
          }
          const n = [];
          for (const [, e] of t) {
            if (1 === e.length) {
              n.push(e[0]);
              continue;
            }
            const t = e[0];
            if ('text' === t.type || 'variation' === t.type) {
              const o = e
                .map((e) => ('text' in e ? e.text : ''))
                .filter((e) => e.length > 0)
                .join(' ');
              'variation' === t.type
                ? n.push({
                    type: 'variation',
                    text: o,
                    contentKey: t.contentKey,
                    variation: t.variation,
                  })
                : n.push({ type: 'text', text: o, contentKey: t.contentKey });
            } else 'image' === t.type && n.push(t);
          }
          return n;
        })(t);
      (console.log('[Live editor] Sending nodes to parent:', n),
        u(l, { contentNodes: n }));
      const o = P().highlightEditableContent,
        r = P().showPendingChanges;
      (k(t, void 0 === o || o),
        r && S([...$]),
        console.log(
          '[Live editor] Significant mutation detected. Processing and sending text nodes.'
        ));
    }
  } catch (e) {
    console.error('Error during DOM processing after mutation:', e);
  }
}
const O = (function (e, t) {
    let n,
      o = 0;
    return (...r) => {
      const i = Date.now();
      i - o >= t
        ? ((o = i), e(...r))
        : (n && clearTimeout(n),
          (n = window.setTimeout(
            () => {
              ((o = Date.now()), e(...r));
            },
            t - (i - o)
          )));
    };
  })((e, t) => {
    let n = !1;
    const o = document.body,
      r = ['contentstorage-element-label'],
      i = ['style', 'class'],
      a = e.some(
        (e) => 'childList' === e.type && Array.from(e.addedNodes).some(I)
      );
    for (const t of e) {
      if ('childList' === t.type) {
        if (Array.from(t.addedNodes).some(I)) continue;
      }
      if (a && 'childList' === t.type) {
        if (
          t.removedNodes.length > 0 &&
          0 === t.addedNodes.length &&
          Array.from(t.removedNodes).every((e) => e.nodeType === Node.TEXT_NODE)
        )
          continue;
      }
      if ('attributes' === t.type && i.includes(t.attributeName || '')) {
        if (!t.target.hasAttribute('data-content-key')) continue;
      }
      const e = t.target;
      if (e) {
        let t = e.nodeType === Node.ELEMENT_NODE ? e : e.parentElement;
        for (; t; ) {
          if (t.id && r.includes(t.id)) {
            n = !1;
            break;
          }
          t = t.parentElement;
        }
        if (t && r.includes(t.id)) continue;
      }
      n = !0;
      break;
    }
    n &&
      (t.disconnect(),
      D(),
      Promise.resolve()
        .then(() => {
          t.observe(o, _);
        })
        .catch((e) => {
          console.error('Error re-observing target node:', e);
        }));
  }, 1e3),
  _ = { childList: !0, subtree: !0, attributes: !0 };
const q = (() => {
  let e = 0;
  return () => (
    (e += 1),
    `u${`0000${((Math.random() * 36 ** 4) | 0).toString(36)}`.slice(-4)}${e}`
  );
})();
function U(e) {
  const t = [];
  for (let n = 0, o = e.length; n < o; n++) t.push(e[n]);
  return t;
}
let H = null;
function K(e = {}) {
  return (
    H ||
    (e.includeStyleProperties
      ? ((H = e.includeStyleProperties), H)
      : ((H = U(window.getComputedStyle(document.documentElement))), H))
  );
}
function V(e, t) {
  const n = (e.ownerDocument.defaultView || window)
    .getComputedStyle(e)
    .getPropertyValue(t);
  return n ? parseFloat(n.replace('px', '')) : 0;
}
function z(e, t = {}) {
  return {
    width:
      t.width ||
      (function (e) {
        const t = V(e, 'border-left-width'),
          n = V(e, 'border-right-width');
        return e.clientWidth + t + n;
      })(e),
    height:
      t.height ||
      (function (e) {
        const t = V(e, 'border-top-width'),
          n = V(e, 'border-bottom-width');
        return e.clientHeight + t + n;
      })(e),
  };
}
const j = 16384;
function B(e) {
  return new Promise((t, n) => {
    const o = new Image();
    ((o.onload = () => {
      o.decode().then(() => {
        requestAnimationFrame(() => t(o));
      });
    }),
      (o.onerror = n),
      (o.crossOrigin = 'anonymous'),
      (o.decoding = 'async'),
      (o.src = e));
  });
}
async function G(e, t, n) {
  const o = 'http://www.w3.org/2000/svg',
    r = document.createElementNS(o, 'svg'),
    i = document.createElementNS(o, 'foreignObject');
  return (
    r.setAttribute('width', `${t}`),
    r.setAttribute('height', `${n}`),
    r.setAttribute('viewBox', `0 0 ${t} ${n}`),
    i.setAttribute('width', '100%'),
    i.setAttribute('height', '100%'),
    i.setAttribute('x', '0'),
    i.setAttribute('y', '0'),
    i.setAttribute('externalResourcesRequired', 'true'),
    r.appendChild(i),
    i.appendChild(e),
    (async function (e) {
      return Promise.resolve()
        .then(() => new XMLSerializer().serializeToString(e))
        .then(encodeURIComponent)
        .then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
    })(r)
  );
}
const W = (e, t) => {
  if (e instanceof t) return !0;
  const n = Object.getPrototypeOf(e);
  return null !== n && (n.constructor.name === t.name || W(n, t));
};
function X(e, t, n, o) {
  const r = `.${e}:${t}`,
    i = n.cssText
      ? (function (e) {
          const t = e.getPropertyValue('content');
          return `${e.cssText} content: '${t.replace(/'|"/g, '')}';`;
        })(n)
      : (function (e, t) {
          return K(t)
            .map(
              (t) =>
                `${t}: ${e.getPropertyValue(t)}${e.getPropertyPriority(t) ? ' !important' : ''};`
            )
            .join(' ');
        })(n, o);
  return document.createTextNode(`${r}{${i}}`);
}
function J(e, t, n, o) {
  const r = window.getComputedStyle(e, n),
    i = r.getPropertyValue('content');
  if ('' === i || 'none' === i) return;
  const a = q();
  try {
    t.className = `${t.className} ${a}`;
  } catch (e) {
    return;
  }
  const s = document.createElement('style');
  (s.appendChild(X(a, n, r, o)), t.appendChild(s));
}
const Q = 'application/font-woff',
  Y = 'image/jpeg',
  Z = {
    woff: Q,
    woff2: Q,
    ttf: 'application/font-truetype',
    eot: 'application/vnd.ms-fontobject',
    png: 'image/png',
    jpg: Y,
    jpeg: Y,
    gif: 'image/gif',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    webp: 'image/webp',
  };
function ee(e) {
  const t = (function (e) {
    const t = /\.([^./]*?)$/g.exec(e);
    return t ? t[1] : '';
  })(e).toLowerCase();
  return Z[t] || '';
}
function te(e) {
  return -1 !== e.search(/^(data:)/);
}
async function ne(e, t, n) {
  const o = await fetch(e, t);
  if (404 === o.status) throw new Error(`Resource "${o.url}" not found`);
  const r = await o.blob();
  return new Promise((e, t) => {
    const i = new FileReader();
    ((i.onerror = t),
      (i.onloadend = () => {
        try {
          e(n({ res: o, result: i.result }));
        } catch (e) {
          t(e);
        }
      }),
      i.readAsDataURL(r));
  });
}
const oe = {};
async function re(e, t, n) {
  const o = (function (e, t, n) {
    let o = e.replace(/\?.*/, '');
    return (
      n && (o = e),
      /ttf|otf|eot|woff2?/i.test(o) && (o = o.replace(/.*\//, '')),
      t ? `[${t}]${o}` : o
    );
  })(e, t, n.includeQueryParams);
  if (null != oe[o]) return oe[o];
  let r;
  n.cacheBust && (e += (/\?/.test(e) ? '&' : '?') + new Date().getTime());
  try {
    const o = await ne(
      e,
      n.fetchRequestInit,
      ({ res: e, result: n }) => (
        t || (t = e.headers.get('Content-Type') || ''),
        (function (e) {
          return e.split(/,/)[1];
        })(n)
      )
    );
    r = (function (e, t) {
      return `data:${t};base64,${e}`;
    })(o, t);
  } catch (t) {
    r = n.imagePlaceholder || '';
    let o = `Failed to fetch resource: ${e}`;
    (t && (o = 'string' == typeof t ? t : t.message), o && console.warn(o));
  }
  return ((oe[o] = r), r);
}
async function ie(e, t) {
  return W(e, HTMLCanvasElement)
    ? (async function (e) {
        const t = e.toDataURL();
        return 'data:,' === t ? e.cloneNode(!1) : B(t);
      })(e)
    : W(e, HTMLVideoElement)
      ? (async function (e, t) {
          if (e.currentSrc) {
            const t = document.createElement('canvas'),
              n = t.getContext('2d');
            return (
              (t.width = e.clientWidth),
              (t.height = e.clientHeight),
              null == n || n.drawImage(e, 0, 0, t.width, t.height),
              B(t.toDataURL())
            );
          }
          const n = e.poster,
            o = ee(n);
          return B(await re(n, o, t));
        })(e, t)
      : W(e, HTMLIFrameElement)
        ? (async function (e, t) {
            var n;
            try {
              if (
                null === (n = null == e ? void 0 : e.contentDocument) ||
                void 0 === n
                  ? void 0
                  : n.body
              )
                return await le(e.contentDocument.body, t, !0);
            } catch (e) {}
            return e.cloneNode(!1);
          })(e, t)
        : e.cloneNode(se(e));
}
const ae = (e) => null != e.tagName && 'SLOT' === e.tagName.toUpperCase(),
  se = (e) => null != e.tagName && 'SVG' === e.tagName.toUpperCase();
function ce(e, t, n) {
  return (
    W(t, Element) &&
      ((function (e, t, n) {
        const o = t.style;
        if (!o) return;
        const r = window.getComputedStyle(e);
        r.cssText
          ? ((o.cssText = r.cssText), (o.transformOrigin = r.transformOrigin))
          : K(n).forEach((n) => {
              let i = r.getPropertyValue(n);
              if ('font-size' === n && i.endsWith('px')) {
                const e =
                  Math.floor(parseFloat(i.substring(0, i.length - 2))) - 0.1;
                i = `${e}px`;
              }
              (W(e, HTMLIFrameElement) &&
                'display' === n &&
                'inline' === i &&
                (i = 'block'),
                'd' === n &&
                  t.getAttribute('d') &&
                  (i = `path(${t.getAttribute('d')})`),
                o.setProperty(n, i, r.getPropertyPriority(n)));
            });
      })(e, t, n),
      (function (e, t, n) {
        (J(e, t, ':before', n), J(e, t, ':after', n));
      })(e, t, n),
      (function (e, t) {
        (W(e, HTMLTextAreaElement) && (t.innerHTML = e.value),
          W(e, HTMLInputElement) && t.setAttribute('value', e.value));
      })(e, t),
      (function (e, t) {
        if (W(e, HTMLSelectElement)) {
          const n = t,
            o = Array.from(n.children).find(
              (t) => e.value === t.getAttribute('value')
            );
          o && o.setAttribute('selected', '');
        }
      })(e, t)),
    t
  );
}
async function le(e, t, n) {
  return n || !t.filter || t.filter(e)
    ? Promise.resolve(e)
        .then((e) => ie(e, t))
        .then((n) =>
          (async function (e, t, n) {
            var o, r;
            if (se(t)) return t;
            let i = [];
            return (
              (i =
                ae(e) && e.assignedNodes
                  ? U(e.assignedNodes())
                  : W(e, HTMLIFrameElement) &&
                      (null === (o = e.contentDocument) || void 0 === o
                        ? void 0
                        : o.body)
                    ? U(e.contentDocument.body.childNodes)
                    : U(
                        (null !== (r = e.shadowRoot) && void 0 !== r ? r : e)
                          .childNodes
                      )),
              0 === i.length ||
                W(e, HTMLVideoElement) ||
                (await i.reduce(
                  (e, o) =>
                    e
                      .then(() => le(o, n))
                      .then((e) => {
                        e && t.appendChild(e);
                      }),
                  Promise.resolve()
                )),
              t
            );
          })(e, n, t)
        )
        .then((n) => ce(e, n, t))
        .then((e) =>
          (async function (e, t) {
            const n = e.querySelectorAll ? e.querySelectorAll('use') : [];
            if (0 === n.length) return e;
            const o = {};
            for (let r = 0; r < n.length; r++) {
              const i = n[r].getAttribute('xlink:href');
              if (i) {
                const n = e.querySelector(i),
                  r = document.querySelector(i);
                n || !r || o[i] || (o[i] = await le(r, t, !0));
              }
            }
            const r = Object.values(o);
            if (r.length) {
              const t = 'http://www.w3.org/1999/xhtml',
                n = document.createElementNS(t, 'svg');
              (n.setAttribute('xmlns', t),
                (n.style.position = 'absolute'),
                (n.style.width = '0'),
                (n.style.height = '0'),
                (n.style.overflow = 'hidden'),
                (n.style.display = 'none'));
              const o = document.createElementNS(t, 'defs');
              n.appendChild(o);
              for (let e = 0; e < r.length; e++) o.appendChild(r[e]);
              e.appendChild(n);
            }
            return e;
          })(e, t)
        )
    : null;
}
const de = /url\((['"]?)([^'"]+?)\1\)/g,
  ue = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,
  he = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
async function fe(e, t, n, o, r) {
  try {
    const i = n
        ? (function (e, t) {
            if (e.match(/^[a-z]+:\/\//i)) return e;
            if (e.match(/^\/\//)) return window.location.protocol + e;
            if (e.match(/^[a-z]+:/i)) return e;
            const n = document.implementation.createHTMLDocument(),
              o = n.createElement('base'),
              r = n.createElement('a');
            return (
              n.head.appendChild(o),
              n.body.appendChild(r),
              t && (o.href = t),
              (r.href = e),
              r.href
            );
          })(t, n)
        : t,
      a = ee(t);
    let s;
    return (
      r || (s = await re(i, a, o)),
      e.replace(
        (function (e) {
          const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
          return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, 'g');
        })(t),
        `$1${s}$3`
      )
    );
  } catch (e) {}
  return e;
}
function pe(e) {
  return -1 !== e.search(de);
}
async function ge(e, t, n) {
  if (!pe(e)) return e;
  const o = (function (e, { preferredFontFormat: t }) {
      return t
        ? e.replace(he, (e) => {
            for (;;) {
              const [n, , o] = ue.exec(e) || [];
              if (!o) return '';
              if (o === t) return `src: ${n};`;
            }
          })
        : e;
    })(e, n),
    r = (function (e) {
      const t = [];
      return (
        e.replace(de, (e, n, o) => (t.push(o), e)),
        t.filter((e) => !te(e))
      );
    })(o);
  return r.reduce((e, o) => e.then((e) => fe(e, o, t, n)), Promise.resolve(o));
}
async function me(e, t, n) {
  var o;
  const r =
    null === (o = t.style) || void 0 === o ? void 0 : o.getPropertyValue(e);
  if (r) {
    const o = await ge(r, null, n);
    return (t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0);
  }
  return !1;
}
async function ye(e, t) {
  W(e, Element) &&
    (await (async function (e, t) {
      ((await me('background', e, t)) || (await me('background-image', e, t)),
        (await me('mask', e, t)) ||
          (await me('-webkit-mask', e, t)) ||
          (await me('mask-image', e, t)) ||
          (await me('-webkit-mask-image', e, t)));
    })(e, t),
    await (async function (e, t) {
      const n = W(e, HTMLImageElement);
      if ((!n || te(e.src)) && (!W(e, SVGImageElement) || te(e.href.baseVal)))
        return;
      const o = n ? e.src : e.href.baseVal,
        r = await re(o, ee(o), t);
      await new Promise((o, i) => {
        ((e.onload = o),
          (e.onerror = t.onImageErrorHandler
            ? (...e) => {
                try {
                  o(t.onImageErrorHandler(...e));
                } catch (e) {
                  i(e);
                }
              }
            : i));
        const a = e;
        (a.decode && (a.decode = o),
          'lazy' === a.loading && (a.loading = 'eager'),
          n ? ((e.srcset = ''), (e.src = r)) : (e.href.baseVal = r));
      });
    })(e, t),
    await (async function (e, t) {
      const n = U(e.childNodes).map((e) => ye(e, t));
      await Promise.all(n).then(() => e);
    })(e, t));
}
const we = {};
async function be(e) {
  let t = we[e];
  if (null != t) return t;
  const n = await fetch(e);
  return ((t = { url: e, cssText: await n.text() }), (we[e] = t), t);
}
async function Ee(e, t) {
  let n = e.cssText;
  const o = /url\(["']?([^"')]+)["']?\)/g,
    r = (n.match(/url\([^)]+\)/g) || []).map(async (r) => {
      let i = r.replace(o, '$1');
      return (
        i.startsWith('https://') || (i = new URL(i, e.url).href),
        ne(
          i,
          t.fetchRequestInit,
          ({ result: e }) => ((n = n.replace(r, `url(${e})`)), [r, e])
        )
      );
    });
  return Promise.all(r).then(() => n);
}
function ve(e) {
  if (null == e) return [];
  const t = [];
  let n = e.replace(/(\/\*[\s\S]*?\*\/)/gi, '');
  const o = new RegExp(
    '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})',
    'gi'
  );
  for (;;) {
    const e = o.exec(n);
    if (null === e) break;
    t.push(e[0]);
  }
  n = n.replace(o, '');
  const r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,
    i = new RegExp(
      '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})',
      'gi'
    );
  for (;;) {
    let e = r.exec(n);
    if (null === e) {
      if (((e = i.exec(n)), null === e)) break;
      r.lastIndex = i.lastIndex;
    } else i.lastIndex = r.lastIndex;
    t.push(e[0]);
  }
  return t;
}
async function xe(e, t) {
  if (null == e.ownerDocument)
    throw new Error('Provided element is not within a Document');
  const n = U(e.ownerDocument.styleSheets),
    o = await (async function (e, t) {
      const n = [],
        o = [];
      return (
        e.forEach((n) => {
          if ('cssRules' in n)
            try {
              U(n.cssRules || []).forEach((e, r) => {
                if (e.type === CSSRule.IMPORT_RULE) {
                  let i = r + 1;
                  const a = be(e.href)
                    .then((e) => Ee(e, t))
                    .then((e) =>
                      ve(e).forEach((e) => {
                        try {
                          n.insertRule(
                            e,
                            e.startsWith('@import')
                              ? (i += 1)
                              : n.cssRules.length
                          );
                        } catch (t) {
                          console.error(
                            'Error inserting rule from remote css',
                            { rule: e, error: t }
                          );
                        }
                      })
                    )
                    .catch((e) => {
                      console.error('Error loading remote css', e.toString());
                    });
                  o.push(a);
                }
              });
            } catch (r) {
              const i =
                e.find((e) => null == e.href) || document.styleSheets[0];
              (null != n.href &&
                o.push(
                  be(n.href)
                    .then((e) => Ee(e, t))
                    .then((e) =>
                      ve(e).forEach((e) => {
                        i.insertRule(e, i.cssRules.length);
                      })
                    )
                    .catch((e) => {
                      console.error('Error loading remote stylesheet', e);
                    })
                ),
                console.error('Error inlining remote css file', r));
            }
        }),
        Promise.all(o).then(
          () => (
            e.forEach((e) => {
              if ('cssRules' in e)
                try {
                  U(e.cssRules || []).forEach((e) => {
                    n.push(e);
                  });
                } catch (t) {
                  console.error(
                    `Error while reading CSS rules from ${e.href}`,
                    t
                  );
                }
            }),
            n
          )
        )
      );
    })(n, t);
  return (function (e) {
    return e
      .filter((e) => e.type === CSSRule.FONT_FACE_RULE)
      .filter((e) => pe(e.style.getPropertyValue('src')));
  })(o);
}
function Ne(e) {
  return e.trim().replace(/["']/g, '');
}
async function Te(e, t) {
  const n = await xe(e, t),
    o = (function (e) {
      const t = new Set();
      return (
        (function e(n) {
          ((n.style.fontFamily || getComputedStyle(n).fontFamily)
            .split(',')
            .forEach((e) => {
              t.add(Ne(e));
            }),
            Array.from(n.children).forEach((t) => {
              t instanceof HTMLElement && e(t);
            }));
        })(e),
        t
      );
    })(e);
  return (
    await Promise.all(
      n
        .filter((e) => o.has(Ne(e.style.fontFamily)))
        .map((e) => {
          const n = e.parentStyleSheet ? e.parentStyleSheet.href : null;
          return ge(e.cssText, n, t);
        })
    )
  ).join('\n');
}
async function Ce(e, t = {}) {
  const { width: n, height: o } = z(e, t),
    r = await le(e, t, !0);
  (await (async function (e, t) {
    const n =
      null != t.fontEmbedCSS
        ? t.fontEmbedCSS
        : t.skipFonts
          ? null
          : await Te(e, t);
    if (n) {
      const t = document.createElement('style'),
        o = document.createTextNode(n);
      (t.appendChild(o),
        e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t));
    }
  })(r, t),
    await ye(r, t),
    (function (e, t) {
      const { style: n } = e;
      (t.backgroundColor && (n.backgroundColor = t.backgroundColor),
        t.width && (n.width = `${t.width}px`),
        t.height && (n.height = `${t.height}px`));
      const o = t.style;
      null != o &&
        Object.keys(o).forEach((e) => {
          n[e] = o[e];
        });
    })(r, t));
  return await G(r, n, o);
}
async function Le(e, t = {}) {
  const { width: n, height: o } = z(e, t),
    r = await Ce(e, t),
    i = await B(r),
    a = document.createElement('canvas'),
    s = a.getContext('2d'),
    c =
      t.pixelRatio ||
      (function () {
        let e, t;
        try {
          t = process;
        } catch (e) {}
        const n = t && t.env ? t.env.devicePixelRatio : null;
        return (
          n && ((e = parseInt(n, 10)), Number.isNaN(e) && (e = 1)),
          e || window.devicePixelRatio || 1
        );
      })(),
    l = t.canvasWidth || n,
    d = t.canvasHeight || o;
  return (
    (a.width = l * c),
    (a.height = d * c),
    t.skipAutoScale ||
      (function (e) {
        (e.width > j || e.height > j) &&
          (e.width > j && e.height > j
            ? e.width > e.height
              ? ((e.height *= j / e.width), (e.width = j))
              : ((e.width *= j / e.height), (e.height = j))
            : e.width > j
              ? ((e.height *= j / e.width), (e.width = j))
              : ((e.width *= j / e.height), (e.height = j)));
      })(a),
    (a.style.width = `${l}`),
    (a.style.height = `${d}`),
    t.backgroundColor &&
      ((s.fillStyle = t.backgroundColor), s.fillRect(0, 0, a.width, a.height)),
    s.drawImage(i, 0, 0, a.width, a.height),
    a
  );
}
async function ke(e, t = {}) {
  const n = await Le(e, t),
    o = await (function (e, t = {}) {
      return e.toBlob
        ? new Promise((n) => {
            e.toBlob(
              n,
              t.type ? t.type : 'image/png',
              t.quality ? t.quality : 1
            );
          })
        : new Promise((n) => {
            const o = window.atob(
                e
                  .toDataURL(
                    t.type ? t.type : void 0,
                    t.quality ? t.quality : void 0
                  )
                  .split(',')[1]
              ),
              r = o.length,
              i = new Uint8Array(r);
            for (let e = 0; e < r; e += 1) i[e] = o.charCodeAt(e);
            n(new Blob([i], { type: t.type ? t.type : 'image/png' }));
          });
    })(n);
  return o;
}
const Se = (e) => {
    (e.forEach((e, t) => {
      ((t.scrollTop = e.scrollTop), (t.scrollLeft = e.scrollLeft));
    }),
      console.log('[Live editor] Restored scroll positions'));
  },
  Ae = (e) => {
    e.forEach((e) => {
      e.style.setProperty('display', 'flex', 'important');
    });
  },
  Re = async () => {
    console.log('[Live editor] Request received from Contentstorage');
    let e = [],
      t = new Map();
    try {
      (console.log('[Live editor] Saving scroll positions...'),
        (t = (() => {
          const e = new Map();
          return (
            document.querySelectorAll('*').forEach((t) => {
              (t.scrollTop > 0 || t.scrollLeft > 0) &&
                e.set(t, { scrollTop: t.scrollTop, scrollLeft: t.scrollLeft });
            }),
            console.log(
              `[Live editor] Saved scroll positions for ${e.size} elements`
            ),
            e
          );
        })()),
        console.log('[Live editor] Resetting scroll positions...'),
        ((e) => {
          (e.forEach((e, t) => {
            ((t.scrollTop = 0), (t.scrollLeft = 0));
          }),
            console.log('[Live editor] Reset all scroll positions to 0'));
        })(t),
        console.log('[Live editor] Hiding edit buttons...'),
        (e = (() => {
          const e = document.querySelectorAll('#contentstorage-element-button'),
            t = Array.from(e);
          return (
            t.forEach((e) => {
              e.style.setProperty('display', 'none', 'important');
            }),
            t
          );
        })()),
        console.log('[Live editor] Capturing visible viewport area'));
      const n = {
        width: window.innerWidth,
        height: window.innerHeight,
        quality: 0.95,
        pixelRatio: window.devicePixelRatio,
        backgroundColor: '#ffffff',
        style: { overflow: 'hidden' },
      };
      console.log(`[Live editor] Viewport dimensions: ${n.width}x${n.height}`);
      const o = await ke(document.body, n);
      if (!o) throw new Error('Failed to generate screenshot blob');
      (console.log(
        '[Live editor] Captured successfully, converting to data URL...'
      ),
        console.log(
          '[Live editor] Blob size:',
          (o.size / 1024).toFixed(2),
          'KB'
        ),
        console.log('[Live editor] Restoring edit buttons...'),
        Ae(e),
        console.log('[Live editor] Restoring scroll positions...'),
        Se(t));
      const r = new FileReader();
      ((r.onloadend = () => {
        console.log('[Live editor] Sending back to Contentstorage...');
        const e = { screenshotDataUrl: r.result, success: !0 };
        (u(d, e), console.log('[Live editor] Sent successfully'));
      }),
        (r.onerror = () => {
          throw (
            console.error('[Live editor] FileReader error'),
            new Error('Failed to convert blob to data URL')
          );
        }),
        r.readAsDataURL(o));
    } catch (n) {
      (console.error('[Live editor] Error capturing:', n),
        e.length > 0 &&
          (console.log('[Live editor] Restoring edit buttons after error...'),
          Ae(e)),
        t.size > 0 &&
          (console.log(
            '[Live editor] Restoring scroll positions after error...'
          ),
          Se(t)));
      const o = {
        screenshotDataUrl: '',
        success: !1,
        error: n instanceof Error ? n.message : 'Unknown error occurred',
      };
      u(d, o);
    }
  };
!(function () {
  const c = document.currentScript;
  if (!c)
    return void console.error(
      "CDN Script: Could not determine the current script element. This is necessary to read URL parameters from the script's own URL. Ensure the script is loaded via a standard <script> tag."
    );
  const l = c.src;
  console.log(`[Live editor] CDN Script loaded from ${l}`);
  let d = null;
  try {
    d = new URL(l).searchParams.get('contentstorage-live-editor');
  } catch (e) {
    return void console.error(
      "CDN Script: Could not parse script URL. Ensure it's a valid URL.",
      e
    );
  }
  if (d)
    if (window.parent && window.parent !== window) {
      console.log(
        '[Live editor] Running inside an iframe. Setting up communication with parent and initiating handshake.'
      );
      const c = new MutationObserver(O);
      let l,
        h = !1;
      const f = (s) => {
          if (s.source === window.parent && s.data)
            if (s.data.type === e)
              h ||
                ((h = !0),
                console.log(
                  '[Live editor] Received handshake acknowledgment from parent:',
                  s.data.payload
                ),
                (d = s.data.payload.data.config),
                R(d),
                console.log('[Live editor] Set initial config:', d),
                d.highlightEditableContent && k([], !0),
                console.log('[Live editor] Applied config:', s.data.payload),
                D(),
                console.log(
                  '[Live editor] Started observing DOM for mutations'
                ),
                c.observe(document.body, _),
                console.log(
                  '[Live editor] Received handshake acknowledgment from parent:',
                  s.data.payload
                ),
                p(),
                console.log(
                  '[Live editor] Parent communication handshake successful. Ready for further messages.'
                ));
            else if (h) {
              if (
                (console.log(
                  '[Live editor] Received further message from parent:',
                  s.data
                ),
                s.data.type === t && R(s.data.payload.data),
                s.data.type === n &&
                  (R({ highlightEditableContent: !0 }), k([], !0)),
                s.data.type === o &&
                  (R({ highlightEditableContent: !1 }),
                  (() => {
                    const e = document.querySelectorAll('[data-content-key]'),
                      t = document.querySelectorAll(
                        '#contentstorage-element-image-wrapper, #contentstorage-element-input-wrapper'
                      ),
                      n = document.querySelectorAll(
                        '#contentstorage-element-label'
                      ),
                      o = document.querySelectorAll(
                        '#contentstorage-element-button'
                      );
                    (t.forEach((e) => {
                      const t = e.querySelector('img, input'),
                        n = e.parentNode;
                      n && t && (n.insertBefore(t, e), n.removeChild(e));
                    }),
                      e.forEach((e) => (e.style.cssText = '')),
                      [...n, ...o].forEach((e) => e.remove()));
                  })()),
                s.data.type === r)
              ) {
                const e = s.data.payload.data;
                ((l = e), ($ = [...l]), R({ showPendingChanges: !0 }), S(e));
              }
              (s.data.type === i &&
                (document
                  .querySelectorAll(
                    '[data-content-showing-pending-change="true"]'
                  )
                  .forEach((e) => {
                    const t = e.childNodes,
                      n = e.getAttribute('data-content-key');
                    for (const e of t)
                      if (
                        n &&
                        e.nodeType === Node.TEXT_NODE &&
                        e.textContent &&
                        e.textContent.trim().length > 0
                      ) {
                        const t = Array.from(window.memoryMap).find(([, e]) =>
                          e.ids.has(n)
                        );
                        t &&
                          t.length > 0 &&
                          'string' == typeof t[0] &&
                          (e.nodeValue = t[0] || '');
                        break;
                      }
                  }),
                ($ = []),
                R({ showPendingChanges: !1 })),
                s.data.type === a && Re());
            } else
              console.warn(
                'CDN Script: Received message from parent before handshake was complete. Ignoring:',
                s.data
              );
          var l, d;
        },
        p = () => {
          l && (clearTimeout(l), (l = void 0));
        };
      (window.addEventListener('message', f),
        u(
          s,
          `Hello from iframe script (editor param: ${d}). Initiating handshake.`
        ),
        (l = window.setTimeout(() => {
          h ||
            (console.warn(
              'CDN Script: Parent communication handshake timed out. Parent did not respond or acknowledge correctly.'
            ),
            p());
        }, 5e3)));
    } else
      console.log(
        '[Live editor] Not running inside an iframe, or parent is not accessible. Skipping parent communication setup.'
      );
  else
    console.warn(
      "CDN Script: The 'contentstorage-live-editor' URL parameter is MISSING in the script's src. This is a prerequisite. Halting further iframe-specific operations."
    );
})();
