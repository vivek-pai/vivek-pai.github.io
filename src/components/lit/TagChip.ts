import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vp-tag-chip')
export class TagChip extends LitElement {
  @property() label = '';

  static styles = css`
    :host {
      display: inline-block;
    }
    span {
      display: inline-block;
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.625rem;
      font-weight: 400;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: var(--color-line, #8B7355);
      border: 1px solid var(--color-line-faint, #C4B8A8);
      padding: 0.15em 0.5em;
      border-radius: 1px;
      white-space: nowrap;
    }
  `;

  render() {
    return html`<span>${this.label}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vp-tag-chip': TagChip;
  }
}
