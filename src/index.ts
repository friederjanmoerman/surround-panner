import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';

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

    .panner__cursor::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      border-radius: 50%;
      transition: opacity 0.1s ease-in-out;
      box-shadow: 0px 0px 10px 0px #1fdeb9;
    }
    
    .panner__cursor:hover::after {
      opacity: 1;
    }

    .values {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 16px;
      color: white;
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
              style="top: ${this.pointY * 300}px; left: ${this.pointX * 300}px"
              @mousedown="${this.handleMouseDown}"
            ></div>
          </div>
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