/**
 * Nav TS
 */
import { getIsMobile } from "../../utilities/IsMobile";

const _nav: HTMLElement = document.querySelector('.nav');
const _button: HTMLButtonElement = document.querySelector('.nav__button');
const _links: NodeListOf<HTMLLinkElement> = _nav.querySelectorAll('.nav__link');

const IS_CURRENT = 'is-current';
const IS_OPEN = 'is-open';

/**
 * Opens/closes the Nav
 */
function toggleNav() {
  _nav.classList.toggle(IS_OPEN);
}

/**
 * Highlight the current href that's in view
 * @param {String} currentHref The current HREF to highlight
 */
function highlightCurrentLink(currentHref: string) {
  _links.forEach((_link: HTMLLinkElement) => {
    _link.classList.remove(IS_CURRENT);
    if (_link.href.indexOf(currentHref) > -1) {
      _link.classList.add(IS_CURRENT);
      window.history.pushState({}, '', currentHref);
    }
  });
}

function initiateNav() {
  const _articles = document.querySelectorAll('.articles');
  const isMobile = getIsMobile();

  if (!isMobile) {
    _articles.forEach((_article: HTMLLinkElement) => {
      window.gsap.to(_article, {
        scrollTrigger: {
          trigger: _article,
          start: 'top center',
          end: 'bottom top',
          onToggle: () => {
            highlightCurrentLink(`#${_article.id}`);
            toggleNav();
          },
        }
      });
    });
  }

  _links.forEach((_link: HTMLLinkElement) => {
    if (!isMobile) _link.addEventListener('click', () => highlightCurrentLink(_link.href), { passive: true });
    else _link.addEventListener('click', toggleNav, { passive: true });
  });

  _button.addEventListener('click', toggleNav, { passive: true });
}

/**
 * Nav functions
 */
export default function init() {
  initiateNav();
}
