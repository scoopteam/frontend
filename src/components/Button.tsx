/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// Properties passed when constructing a button
interface ButtonProps {
    children: any,
    colour: string,
    onClick: () => any
}

export default function Button(props: ButtonProps) {
    // Button styling dynamically calculated based on properties.
    const styles = css`
    background-color: ${props.colour};
    color: white;
    border: 0;
    width: 50vw;
    align-self: center;
    font-size: 1.5em;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: filter, transform 100ms;

    /* Animate on hover */
    &:hover {
        filter: brightness(95%);
        transform: scale(99%);
    }
    `;

    return <button css={styles} onClick={() => props.onClick()}>
        {/* render any components passed inside the button */}
        {props.children}
    </button>
}
