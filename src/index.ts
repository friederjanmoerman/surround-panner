import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class SurroundPanner extends LitElement {
  @property({ type: Number }) pointX = 0.5;
  @property({ type: Number }) pointY = 0.5;
  
  static styles = css`
    .panner {
      width: 400px;
      height: 400px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .panner__outer-bounds {
      width: 300px;
      height: 300px;
      border: 1px solid black;
      border-radius: 50%;
      position: relative;
    }

    .panner__cursor {
      width: 14px;
      height: 14px;
      margin-top: -7px;
      margin-left: -7px;
      background: blue;
      border-radius: 50%;
      position: absolute;
      cursor: pointer;
    }
  `

  render() {
    return html`
      <div class="panner">
        <div class="panner__outer-bounds">
          <div
            class="panner__cursor"
            style="top: ${this.pointY * 300}px; left: ${this.pointX * 300}px"
            @mousedown="${this.handleMouseDown}"
          ></div>
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
