import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vp-section-hero')
export class SectionHero extends LitElement {
  @property() title = '';
  @property() description = '';
  @property() deck = '';

  static styles = css`
    :host {
      display: block;
    }
    .hero {
      padding-block: 2.5rem;
      border-bottom: 1px solid var(--color-line-dim, rgba(139,115,85,0.25));
      margin-bottom: 2.5rem;
    }
    .meta-row {
      display: flex;
      gap: 2rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 0.2em;
    }
    .meta-key {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.55rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-line, #8B7355);
    }
    .meta-value {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.8rem;
      color: var(--color-text, #1a1a1a);
      text-transform: lowercase;
    }
    h1 {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 1.6875rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      margin-bottom: 0.4em;
    }
    .accent-line {
      display: block;
      width: 2.5rem;
      height: 2px;
      background: var(--color-accent, #da4f2e);
      margin-bottom: 0.75rem;
    }
    p.description {
      font-family: var(--font-body, 'PT Serif', serif);
      font-size: 0.9rem;
      line-height: 1.65;
      color: var(--color-text-muted, #6b6060);
      max-width: 56ch;
      margin: 0;
    }
  `;

  render() {
    return html`
      <div class="hero container">
        <h1>${this.title}</h1>
        <span class="accent-line"></span>
        ${this.description
          ? html`<p class="description">${this.description}</p>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vp-section-hero': SectionHero;
  }
}
