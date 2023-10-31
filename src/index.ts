// 
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';

// Styles
import { interfaceStyles, pannerStyles, layoutStyles } from './styles';

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
        background: #11131a; 
      }
    `
  ]

  render() {
    return html`
      <div class="wrapper">
          <div class="panner">
            <div class="panner__bounds">
              <!-- Cursor -->
              <div
                class="panner__cursor"
                style="top: ${this.pointY * 300}px; left: ${this.pointX * 300}px"
                @mousedown="${this.handleMouseDown}"
              ></div>
              <!-- Speakers -->
              <div class="speaker"></div>
              <div class="speaker speaker--top-right"></div>
              <div class="speaker speaker--top-left"></div>
              <div class="speaker speaker--bottom-left"></div>
              <div class="speaker speaker--bottom-right"></div>
            </div>
          </div>
          <div class="display">
            X: ${this.pointX.toFixed(2)}<br>
            Y: ${this.pointY.toFixed(2)}
          </div>
      </div>
    `;
  }

  handleMouseDown(e: MouseEvent) {
    const offsetX = e.clientX - this.pointX * 300;
    const offsetY = e.clientY - this.pointY * 300;
    const pannerPoint = this.shadowRoot?.querySelector('.panner-point') as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - offsetX) / 300;
      const y = (e.clientY - offsetY) / 300;

      const centerX = 0.5;
      const centerY = 0.5;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (distance <= 0.5) {
        this.pointX = x;
        this.pointY = y;
        pannerPoint.style.left = x * 300 + 'px';
        pannerPoint.style.top = y * 300 + 'px';
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