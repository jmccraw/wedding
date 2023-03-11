/**
 * Nav TS
 */
const _nav: HTMLElement = document.querySelector('.nav');
const _links: NodeListOf<HTMLLinkElement> = _nav.querySelectorAll('.nav__link');

const IS_CURRENT = 'is-current';

/**
 * Highlight the current href that's in view
 * @param {String} currentHref The current HREF to highlight
 */
function highlightCurrentLink(currentHref: string) {
  _links.forEach((_link: HTMLLinkElement) => {
    _link.classList.remove(IS_CURRENT);
    if (_link.href.indexOf(currentHref) > -1) {
      _link.classList.add(IS_CURRENT);
      window.history.pushState({}, undefined, currentHref);
    }
  });
}

function initiateNav() {
  const _articles = document.querySelectorAll('.articles');

  _articles.forEach((_article: HTMLLinkElement) => {
    window.gsap.to(_article, {
      scrollTrigger: {
        trigger: _article,
        start: 'top center',
        end: 'bottom top',
        onToggle: () => highlightCurrentLink(`#${_article.id}`),
      }
    });
  });

  _links.forEach((_link: HTMLLinkElement) => {
    _link.addEventListener('click', () => highlightCurrentLink(_link.href), { passive: true });
  })
}

/**
 * Nav functions
 */
export default function init() {
  initiateNav();
}
