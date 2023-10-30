import { css } from "lit";

export const wrapperStyles = css`
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
    }
`

export const pannerStyles = css`
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
    opacity: 0.2;
    border-radius: 50%;
    transition: opacity 0.4s ease-in;
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

  .speaker {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translate(-50%, 0);
    vertical-align: middle;
    box-sizing: border-box;
    display: inline-block;
    background: #43a1a3;
    background-clip: content-box;
    width: 1em;
    height: 1em;
    border: 0.333em solid transparent;
    border-bottom-color: #43a1a3;
    position: relative;
  }
`