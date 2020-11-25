/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export default function Tag({ text, colour }: { text: string, colour: string}) {
    const tagStyle = css`
    background-color: ${colour};
    color: white;
    padding: 5px;
    font-size: 0.75em;
    border-radius: 5px;
    vertical-align: middle;
    `;
    return <span css={tagStyle}>{text.toUpperCase()}</span>
}
