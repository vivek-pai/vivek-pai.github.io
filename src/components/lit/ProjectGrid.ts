import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vp-project-grid')
export class ProjectGrid extends LitElement {
  @property() variant: 'featured' | 'standard' = 'standard';

  static styles = css`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      gap: 1.5rem;
    }
    :host([variant="featured"]) .grid {
      grid-template-columns: 1fr;
    }
    :host([variant="standard"]) .grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
    @media (min-width: 768px) {
      :host([variant="featured"]) .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `;

  render() {
    return html`
      <div class="grid">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vp-project-grid': ProjectGrid;
  }
}
