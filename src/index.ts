// Lit
import { LitElement, html, css } from 'lit';
import { property } from 'lit-element/decorators';

// Styles
import { pannerStyles, layoutStyles } from './styles';

// Theme
import { primaryColor } from './theme';

// Utils
import { convertDistanceTodB, convertDistanceToColorR, convertDistanceToColorG, convertDistanceToColorB } from './utils';


class SurroundPanner extends LitElement {
  @property({ type: Number }) pointX = 0;
  @property({ type: Number }) pointY = 0;

  @property({ type: Number }) centerDistance = 1;
  @property({ type: Number }) frontLDistance = 1;
  @property({ type: Number }) frontRDistance = 1;
  @property({ type: Number }) surroundLDistance = 1;
  @property({ type: Number }) surroundRDistance = 1;

  @property({ type: Number }) pointXFixed = 0;
  @property({ type: Number }) pointYFixed = 1;
  @property({ type: Number }) point30XFixed = 0 * Math.cos((30 * Math.PI) / 180) - 1 * Math.sin((30 * Math.PI) / 180);
  @property({ type: Number }) point30YFixed =  0 * Math.sin((30 * Math.PI) / 180) + 1 * Math.cos((30 * Math.PI) / 180);
  @property({ type: Number }) point110XFixed = 0 * Math.cos((110 * Math.PI) / 180) - 1 * Math.sin((110 * Math.PI) / 180);
  @property({ type: Number }) point110YFixed =  0 * Math.sin((110 * Math.PI) / 180) + 1 * Math.cos((110 * Math.PI) / 180);

  static styles = [
    layoutStyles,
    pannerStyles,
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
              <!-- Checkpoints -->
              <div
                class="panner__checkpoint"
                style="top: ${(-this.pointYFixed + 1) * 150}px; left: ${(this.pointXFixed + 1) * 150}px"
              >
                <div class="panner__checkpoint__speaker-volume" style="color: rgba(${convertDistanceToColorR(this.centerDistance)},${convertDistanceToColorG(this.centerDistance)},${convertDistanceToColorB(this.centerDistance)}">
                ${convertDistanceTodB(this.centerDistance).toFixed(2)} db
                </div>
              </div>
              <div
                class="panner__checkpoint panner__checkpoint__top-left"
                style="top: ${(-this.point30YFixed + 1) * 150}px; left: ${(this.point30XFixed + 1) * 150}px"
              >
                <div class="panner__checkpoint__speaker-volume" style="color: rgba(${convertDistanceToColorR(this.frontLDistance)},${convertDistanceToColorG(this.frontLDistance)},${convertDistanceToColorB(this.frontLDistance)}">
                  ${convertDistanceTodB(this.frontLDistance).toFixed(2)} db
                </div>
              </div>
              <div
                class="panner__checkpoint panner__checkpoint__top-right"
                style="top: ${(-this.point30YFixed + 1) * 150}px; left: ${(-this.point30XFixed + 1) * 150}px"
              >
                <div class="panner__checkpoint__speaker-volume" style="color: rgba(${convertDistanceToColorR(this.frontRDistance)},${convertDistanceToColorG(this.frontRDistance)},${convertDistanceToColorB(this.frontRDistance)}">
                  ${convertDistanceTodB(this.frontRDistance).toFixed(2)} db
                </div>
              </div>
              <div
                class="panner__checkpoint panner__checkpoint__bottom panner__checkpoint__bottom-left"
                style="top: ${(-this.point110YFixed + 1) * 150}px; left: ${(this.point110XFixed + 1) * 150}px"
              >
                <div class="panner__checkpoint__speaker-volume" style="color: rgba(${convertDistanceToColorR(this.surroundLDistance)},${convertDistanceToColorG(this.surroundLDistance)},${convertDistanceToColorB(this.surroundLDistance)}">
                  ${convertDistanceTodB(this.surroundLDistance).toFixed(2)} db
                </div>
              </div>
              <div
                class="panner__checkpoint panner__checkpoint__bottom panner__checkpoint__bottom-right"
                style="top: ${(-this.point110YFixed + 1) * 150}px; left: ${(-this.point110XFixed + 1) * 150}px"
              >
                <div class="panner__checkpoint__speaker-volume" style="color: rgba(${convertDistanceToColorR(this.surroundRDistance)},${convertDistanceToColorG(this.surroundRDistance)},${convertDistanceToColorB(this.surroundRDistance)}">
                  ${convertDistanceTodB(this.surroundRDistance).toFixed(2)} db
                </div>
              </div>
              <!-- Speakers -->
              <div class="speaker speaker__center"></div>
              <div class="speaker speaker__top-right"></div>
              <div class="speaker speaker__top-left"></div>
              <div class="speaker speaker__bottom-left"></div>
              <div class="speaker speaker__bottom-right"></div>
            </div>
          <button @click="${this.resetCoordinates}">Reset</button>
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

      const borderCheck = Math.sqrt(x ** 2 + y ** 2 );

      const centerDistance = Math.sqrt((x - this.pointXFixed) ** 2 + (y - this.pointYFixed) ** 2);
      const frontLDistance = Math.sqrt((x - this.point30XFixed) ** 2 + (y - this.point30YFixed) ** 2);
      const frontRDistance = Math.sqrt((-x - this.point30XFixed) ** 2 + (y - this.point30YFixed) ** 2);
      const surroundLDistance = Math.sqrt((x - this.point110XFixed) ** 2 + (y - this.point110YFixed) ** 2);
      const surroundRDistance = Math.sqrt((-x - this.point110XFixed) ** 2 + (y - this.point110YFixed) ** 2);

      if (borderCheck <= 1) {
          this.pointX = x;
          this.pointY = y;

          this.centerDistance = centerDistance;
          this.frontLDistance = frontLDistance;
          this.frontRDistance = frontRDistance;
          this.surroundLDistance = surroundLDistance;
          this.surroundRDistance = surroundRDistance;
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
    this.centerDistance = 1;
    this.frontLDistance = 1;
    this.frontRDistance = 1;
    this.surroundLDistance = 1;
    this.surroundRDistance = 1;
  }
}




customElements.define('surround-panner', SurroundPanner);
