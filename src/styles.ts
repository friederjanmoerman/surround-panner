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
`

export const pannerStyles = css`
    .panner {
        width: 400px;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${primaryColor};
        border-radius: 5% 0 0 5%;
        border-width: 1px 0 1px 1px;
        border-style: solid;
        border-color: ${secondaryColor};
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

export const interfaceStyles = css`
    .display {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 400px;
        width: 400px;
        background: ${primaryColor};
        border-radius: 0 5% 5% 0;
        border-width: 1px 1px 1px 0;
        border-style: solid;
        border-color: ${secondaryColor};
    }

    .display__data {
        font-family: 'Silkscreen', sans-serif;
        color: ${secondaryColor};
    }
`