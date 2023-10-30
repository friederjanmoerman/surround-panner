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
        border: 1px solid #43a1a3;
        border-radius: 50%;
        --r: 150px;
        /* radius of the circle */
        position: relative;
        width: calc(2 * var(--r));
        height: calc(2 * var(--r));
        margin: 0;
        padding: 0;
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
        z-index: 2000;
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
        background: #fff;
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
        height: calc(var(--r) * 1.3);
        width: calc(var(--r) / 5);
        position: absolute;
        bottom: var(--r);
        left: calc(var(--r) - (0.5 * var(--r) / 5));
        transform-origin: center bottom;
        margin: 0;
        padding: 0;
    }

    .speaker::before {
        content: "";
        position: absolute;
        width: 1px;
        background: #43a1a3;
        height: var(--r);
        transform: translate(50%, 0);
        bottom: 0;
        left: 50%;
    }

    .speaker::after {
        content: "";
        position: absolute;
        box-sizing: border-box;
        display: inline-block;
        background: #43a1a3;
        background-clip: content-box;
        width: calc(var(--r) / 5);
        height: calc(var(--r) /4.2);
        border-style: solid;
        border-color: transparent;
        border-width: calc(var(--r) /16);
        border-bottom-color: #43a1a3;
    }

    .speaker--top-right {
        transform: rotate(30deg);
    }

    .speaker--bottom-right {
        transform: rotate(110deg);
    }

    .speaker--top-left {
        transform: rotate(-30deg);
    }

    .speaker--bottom-left {
        transform: rotate(-110deg);
    }
`