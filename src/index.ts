// Lit
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';

// Styles
import { interfaceStyles, pannerStyles, layoutStyles } from './styles';

// Theme
import { primaryColor } from './theme';

class SurroundPanner extends LitElement {
  @property({ type: Number }) pointX = 0;
  @property({ type: Number }) pointY = 0;

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
        -webkit-font-smoothing: subpixel-antialiased;
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
                style="top: ${(-this.pointY + 1) * 150}px; left: ${(this.pointX + 1) * 150}px"
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
            <!-- Reset Button -->
            <div class="button-wrapper"></div>
              <button @click="${this.resetCoordinates}">Reset</button>
            <
          </div>

      </div>
    `;
  }

  handleMouseDown(e: MouseEvent) {
    const offsetX = e.clientX - (this.pointX + 1) * 150;
    const offsetY = e.clientY - (-this.pointY + 1) * 150;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - offsetX) / 150 - 1;
      const y = -((e.clientY - offsetY) / 150 - 1);

      const centerX = 0;
      const centerY = 0;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (distance <= 1) {
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

  resetCoordinates() {
    this.pointX = 0;
    this.pointY = 0;
  }
}

customElements.define('surround-panner', SurroundPanner);
