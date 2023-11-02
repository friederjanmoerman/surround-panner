// Lit
import { css } from "lit";

// Theme
import { primaryColor, secondaryColor, ternaryColor } from "./theme";

export const layoutStyles = css`
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    button {
        font-family: "Silkscreen", sans-serif;
        padding: 6px 20px;
        margin: 0;
        border-radius: 30px;
        border: 1px solid ${ternaryColor};
        background: ${primaryColor};
        text-transform: uppercase;
        color: ${ternaryColor};
        cursor: pointer;
        transition: all 0.2s ease-out;
    }

    button:hover {
        background: ${ternaryColor};
        color: ${primaryColor};
    }
`

export const pannerStyles = css`
    .panner {
        width: 400px;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: ${primaryColor};
        border-radius: 5%;
        border-width: 1px;
        border-style: solid;
        border-color: ${secondaryColor};
        padding: 80px 40px 40px 40px;
    }

    .panner__bounds {
        border: 1px solid ${secondaryColor};
        border-radius: 50%;
        background: ${primaryColor};
        /* radius */
        --r: 150px;
        position: relative;
        width: calc(2 * var(--r));
        height: calc(2 * var(--r));
        margin-bottom: 40px;
    }

    .panner__xy-lines {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .panner__xy-lines::before, .panner__xy-lines::after{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${secondaryColor};
        opacity: 0.4;
    }

    .panner__xy-lines::before {
        height: 1px;
        width: 100%;
    }

    .panner__xy-lines::after {
        width: 1px;
        height: 100%;
    }

    .panner__bounds::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid rgba(255,255,255,0.4);
        border-radius: 50%;
        width: var(--r);
        height: var(--r);
    }

    .panner__cursor {
        width: 14px;
        height: 14px;
        margin-top: -7px;
        margin-left: -7px;
        background: ${secondaryColor};
        border-radius: 50%;
        position: absolute;
        cursor: pointer;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .panner__checkpoint {
        width: 8px;
        height: 8px;
        margin-top: -4px;
        margin-left: -4px;
        background: ${secondaryColor};
        border-radius: 50%;
        position: absolute;
        z-index: 1500;
        display: flex;
        justify-content: center;
    }

    .panner__checkpoint__speaker-volume {
        position: absolute;
        font-family: "Silkscreen", sans-serif;
        font-size: 12px;
        white-space: nowrap;
        color: ${secondaryColor};
        top: -50px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .panner__checkpoint__top-left .panner__checkpoint__speaker-volume {
       left: -55px;
    }

    .panner__checkpoint__top-right .panner__checkpoint__speaker-volume {
       right: -55px;
    }

    .panner__checkpoint__bottom .panner__checkpoint__speaker-volume {
       top: 35px;
    }

    .panner__checkpoint__bottom-left .panner__checkpoint__speaker-volume {
       left: -55px;
    }

    .panner__checkpoint__bottom-right .panner__checkpoint__speaker-volume {
       right: -55px;
    }

    .panner__cursor::after {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        opacity: 0.4;
        border-radius: 50%;
        transition: opacity 0.4s ease-out;
        background: ${ternaryColor};
    }

    .panner__cursor:hover::after {
        opacity: 0.6;
    }

    .speaker {
        height: calc(var(--r) * 1.2);
        width: calc(var(--r) / 8);
        position: absolute;
        bottom: var(--r);
        left: calc(var(--r) - (0.5 * var(--r) / 8));
        transform-origin: center bottom;
        margin: 0;
        padding: 0;
        color: ${secondaryColor};
    }

    .speaker__bottom-right .speaker__value {
        transform: rotate(-110deg);
    }

    .speaker__bottom-left .speaker__value {
        transform: rotate(110deg);
    }

    .speaker::after {
        content: "";
        position: absolute;
        box-sizing: border-box;
        display: inline-block;
        background: ${secondaryColor};
        background-clip: content-box;
        width: calc(var(--r) / 8);
        height: calc(var(--r) / 8);
        border-style: solid;
        border-color: transparent;
        border-width: calc(var(--r) / 28);
        border-bottom-color: ${secondaryColor};
    }

    .speaker__top-right {
        transform: rotate(30deg);
    }

    .speaker__bottom-right {
        transform: rotate(110deg);
    }

    .speaker__top-left {
        transform: rotate(-30deg);
    }

    .speaker__bottom-left {
        transform: rotate(-110deg);
    }
`