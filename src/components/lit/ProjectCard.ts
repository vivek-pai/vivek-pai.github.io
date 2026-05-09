import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vp-project-card')
export class ProjectCard extends LitElement {
  @property() title = '';
  @property() subtitle = '';
  @property() caption = '';
  @property({ attribute: 'hero-image' }) heroImage = '';
  @property({ attribute: 'hero-image-alt' }) heroImageAlt = '';
  @property() tags = '';
  @property() date = '';
  @property({ type: Boolean }) featured = false;

  static styles = css`
    :host {
      display: block;
    }
    article {
      background: transparent;
      border: 1px solid var(--color-line-dim, rgba(139,115,85,0.25));
      transition: border-color 120ms ease;
    }
    article:hover {
      border-color: var(--color-line-faint, #C4B8A8);
    }
    .img-wrap {
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      background: var(--color-bg-alt, #F1EFED);
    }
    .img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 300ms ease;
    }
    article:hover .img-wrap img {
      transform: scale(1.02);
    }
    .body {
      padding: 1rem;
    }
    .meta-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 0.5em;
    }
    .date-label {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.55rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-text-muted, #6b6060);
    }
    h3 {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 0.25em;
    }
    .subtitle {
      font-family: var(--font-heading, 'Signika', sans-serif);
      font-size: 0.75rem;
      color: var(--color-text-muted, #6b6060);
      margin-bottom: 0.6em;
      display: block;
    }
    .caption {
      font-family: var(--font-body, 'PT Serif', serif);
      font-size: 0.8rem;
      line-height: 1.55;
      color: var(--color-text-muted, #6b6060);
      margin-bottom: 0.75em;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3em;
    }
  `;

  private get tagList(): string[] {
    return this.tags ? this.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
  }

  private get formattedDate(): string {
    if (!this.date) return '';
    try {
      return new Date(this.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return this.date;
    }
  }

  render() {
    return html`
      <article>
        ${this.heroImage
          ? html`
              <div class="img-wrap">
                <img src=${this.heroImage} alt=${this.heroImageAlt || this.title} loading="lazy" />
              </div>
            `
          : ''}
        <div class="body">
          <div class="meta-row">
            ${this.date ? html`<span class="date-label">${this.formattedDate}</span>` : ''}
          </div>
          <h3>${this.title}</h3>
          ${this.subtitle ? html`<span class="subtitle">${this.subtitle}</span>` : ''}
          ${this.caption ? html`<p class="caption">${this.caption}</p>` : ''}
          <div class="tags">
            ${this.tagList.map((tag) => html`<vp-tag-chip label=${tag}></vp-tag-chip>`)}
          </div>
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vp-project-card': ProjectCard;
  }
}
