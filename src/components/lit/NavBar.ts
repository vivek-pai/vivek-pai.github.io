import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const NAV_ITEMS = [
  { id: 'hci', label: 'Work', href: '/work' },
  { id: 'research', label: 'Research', href: '/research' },
  { id: 'fabrication', label: 'Fabrication', href: '/fabrication' },
  { id: 'music', label: 'Performance', href: '/music' },
  { id: 'about', label: 'About', href: '/about' },
];

@customElement('vp-nav-bar')
export class NavBar extends LitElement {
  @property({ attribute: 'active-section' }) activeSection = '';

  static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--color-bg, #F9F8F8);
      border-top: 3px solid var(--color-line-faint, #C4B8A8);
      border-bottom: 1px solid var(--color-line-dim, rgba(139,115,85,0.25));
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 80rem;
      margin-inline: auto;
      padding-inline: 1.5rem;
      height: var(--size-nav-h, 56px);
    }

    .wordmark {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-text, #1a1a1a);
      text-decoration: none;
      letter-spacing: -0.01em;
    }
    .wordmark:hover {
      color: var(--color-accent, #da4f2e);
    }

    ul {
      list-style: none;
      display: flex;
      gap: 0;
      margin: 0;
      padding: 0;
    }

    li a {
      display: flex;
      align-items: center;
      height: var(--size-nav-h, 56px);
      padding-inline: 0.75rem;
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.8rem;
      letter-spacing: 0.04em;
      color: var(--color-text, #1a1a1a);
      text-decoration: none;
      text-transform: lowercase;
      transition: color 120ms ease, background-color 120ms ease;
    }

    li a:hover {
      color: #fff;
      background-color: var(--color-accent, #da4f2e);
    }

    li a.active {
      color: #fff;
      background-color: var(--color-line-faint, #C4B8A8);
    }

    @media (max-width: 600px) {
      ul { display: none; }
    }
  `;

  render() {
    return html`
      <nav>
        <a class="wordmark" href="/">Vivek Pai</a>
        <ul>
          ${NAV_ITEMS.map(
            (item) => html`
              <li>
                <a
                  href=${item.href}
                  class=${this.activeSection === item.id ? 'active' : ''}
                >
                  ${item.label}
                </a>
              </li>
            `
          )}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vp-nav-bar': NavBar;
  }
}
