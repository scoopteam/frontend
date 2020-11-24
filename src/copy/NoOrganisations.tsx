/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { BiSad } from "react-icons/bi";
import colours from "../colours";

export default function NoOrganisations() {
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
            color: #A7A7A7;
        `}>
            <BiSad css={{fontSize: "5em"}}/>
            <h2>You aren't in any organisations yet!</h2>
            <p>Your feed is empty right now because you haven't joined any organisations.</p>
        </div>
    </div>
}
