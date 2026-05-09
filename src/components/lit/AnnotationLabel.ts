import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Schematic-style callout label with an optional leader line.
 * Used in section pages and the schematic for annotation aesthetics.
 */
@customElement('vp-annotation-label')
export class AnnotationLabel extends LitElement {
  @property() text = '';
  @property() sublabel = '';
  @property({ type: Boolean, attribute: 'show-line' }) showLine = false;

  static styles = css`
    :host {
      display: inline-block;
    }
    .wrapper {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    .line {
      display: inline-block;
      width: 24px;
      height: 1px;
      background: var(--color-line, #8B7355);
      opacity: 0.6;
      flex-shrink: 0;
    }
    .label-block {
      display: flex;
      flex-direction: column;
      gap: 0.1em;
    }
    .text {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.625rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-line, #8B7355);
    }
    .sublabel {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.5rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--color-text-muted, #6b6060);
      opacity: 0.7;
    }
  `;

  render() {
    return html`
      <div class="wrapper">
        ${this.showLine ? html`<span class="line"></span>` : ''}
        <div class="label-block">
          <span class="text">${this.text}</span>
          ${this.sublabel ? html`<span class="sublabel">${this.sublabel}</span>` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vp-annotation-label': AnnotationLabel;
  }
}
