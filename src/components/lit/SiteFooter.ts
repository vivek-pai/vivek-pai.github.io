import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vp-footer')
export class SiteFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    footer {
      border-top: 1px solid var(--color-line-dim, rgba(139,115,85,0.25));
      padding-block: 1.5rem;
    }
    .inner {
      max-width: 80rem;
      margin-inline: auto;
      padding-inline: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .copy {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.7rem;
      letter-spacing: 0.04em;
      color: var(--color-text-muted, #6b6060);
      text-transform: lowercase;
    }
    .links {
      display: flex;
      gap: 1rem;
    }
    a {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.7rem;
      color: var(--color-text-muted, #6b6060);
      text-decoration: none;
      letter-spacing: 0.04em;
      transition: color 120ms ease;
    }
    a:hover {
      color: var(--color-accent, #da4f2e);
    }
  `;

  render() {
    const year = new Date().getFullYear();
    return html`
      <footer>
        <div class="inner">
          <span class="copy">© vivek pai ${year}</span>
          <div class="links">
            <a href="https://github.com/vivek-pai" target="_blank" rel="noopener noreferrer">github</a>
            <a href="https://www.linkedin.com/in/vivekrpai" target="_blank" rel="noopener noreferrer">linkedin</a>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vp-footer': SiteFooter;
  }
}
