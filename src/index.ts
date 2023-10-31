// Lit
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';

// Styles
import { interfaceStyles, pannerStyles, layoutStyles } from './styles';

// Theme
import { primaryColor } from './theme';

class SurroundPanner extends LitElement {
  @property({ type: Number }) pointX = 0.5;
  @property({ type: Number }) pointY = 0.5;

  static styles = [
    layoutStyles,
    pannerStyles,
    interfaceStyles,
    css`
      :host {
        display: block;
        height: 100vh;
        margin: -8px;
        padding: 0;
        background: ${primaryColor};
        font-family: Helvetica, sans-serif;
      }
    `
  ]

  render() {
    return html`
      <div class="wrapper">
          <div class="panner">
            <div class="panner__bounds">
              <!-- XY lines -->
              <div class="panner__xy-lines"></div>
              <!-- Cursor -->
              <div
                class="panner__cursor"
                style="top: ${this.pointY * 300}px; left: ${this.pointX * 300}px"
                @mousedown="${this.handleMouseDown}"
              ></div>
              <!-- Speakers -->
              <div class="speaker"></div>
              <div class="speaker speaker__top-right"></div>
              <div class="speaker speaker__top-left"></div>
              <div class="speaker speaker__bottom-left"></div>
              <div class="speaker speaker__bottom-right"></div>
            </div>
          </div>
           <!-- Display -->
          <div class="display">
            <div class="display__data">X ${this.pointX.toFixed(2)}</div>
            <div class="display__data">Y ${this.pointY.toFixed(2)}</div>
          </div>
      </div>
    `;
  }

  handleMouseDown(e: MouseEvent) {
    const offsetX = e.clientX - this.pointX * 300;
    const offsetY = e.clientY - this.pointY * 300;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - offsetX) / 300;
      const y = (e.clientY - offsetY) / 300;

      const centerX = 0.5;
      const centerY = 0.5;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (distance <= 0.5) {
        this.pointX = x;
        this.pointY = y;
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
}

customElements.define('surround-panner', SurroundPanner);