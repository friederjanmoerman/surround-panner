import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class SurroundPanner extends LitElement {
  @property({ type: Number }) pointX = 0.5;
  @property({ type: Number }) pointY = 0.5;

  static styles = css`
    :host {
      display: block;
      height: 100vh;
      margin: -8px;
      padding: 0;
      background: #11131a;
    }

    .wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
    }

    .panner {
      width: 400px;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #203B45;
    }

    .panner__outer-bounds {
      width: 300px;
      height: 300px;
      border: 1px solid #43a1a3;
      border-radius: 50%;
      position: relative;
    }

    .panner__cursor {
      width: 14px;
      height: 14px;
      margin-top: -7px;
      margin-left: -7px;
      background: #1fdeb9;
      border-radius: 50%;
      position: absolute;
      cursor: pointer;
    }

    .panner__cursor:hover {
      box-shadow: 4px 4px 4px 4px #1fdeb9;
    }

    .values {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 16px;
    }
    
  `

  render() {
    return html`
      <div class="wrapper">
        <div class="values">
                X: ${this.pointX.toFixed(2)}<br>
                Y: ${this.pointY.toFixed(2)}
        </div>
        <div class="panner">
          <div class="panner__outer-bounds">
            <div
              class="panner__cursor"
              style="top: ${this.pointY * 150}px; left: ${this.pointX * 150}px"
              @mousedown="${this.handleMouseDown}"
            ></div>
          </div>
        </div>
      </div>
    `;
  }

  handleMouseDown(e: MouseEvent) {
    const offsetX = e.clientX - this.pointX * 150;
    const offsetY = e.clientY - this.pointY * 150;
    const pannerPoint = this.shadowRoot?.querySelector('.panner-point') as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - offsetX) / 150;
      const y = (e.clientY - offsetY) / 150;

      const centerX = 0;
      const centerY = 0;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (distance <= 0.5) {
        this.pointX = x;
        this.pointY = y;
        pannerPoint.style.left = x * 150 + 'px';
        pannerPoint.style.top = y * 150 + 'px';
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
