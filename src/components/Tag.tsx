/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// Generic tag component used in group list
export default function Tag({ text, colour }: { text: string, colour: string}) {
    const tagStyle = css`
    background-color: ${colour};
    color: white;
    padding: 5px;
    font-size: 0.5em;
    border-radius: 5px;
    vertical-align: middle;
    `;
    return <span css={tagStyle}>{text.toUpperCase()}</span>
}
