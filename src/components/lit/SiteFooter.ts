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
      justify-content: center;
    }
    .sig {
      font-family: var(--font-mono, monospace);
      font-size: 0.6rem;
      letter-spacing: 0.14em;
      color: var(--color-line, #8B7355);
      opacity: 0.45;
      user-select: none;
    }
  `;

  render() {
    return html`
      <footer>
        <div class="inner">
          <span class="sig">⬡ VP-01 // END OF LOG</span>
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
