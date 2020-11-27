/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { ImSleepy } from "react-icons/im";
import colours from "../colours";

export default function NoPosts() {
    return <div css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
    `}>
        <div css={css`
            background-color: ${colours.lightGrey};
            padding: 20px;
            border-radius: 20px;
            color: #A1A1A1;
        `}>
            <ImSleepy css={{fontSize: "5em"}}/>
            <h2>You're in!</h2>
            <p>Your feed is empty right now because none of your groups have made any posts!</p>
        </div>
    </div>
}
