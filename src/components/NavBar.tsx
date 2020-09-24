/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import colours from "../colours";

function NavBar() {
    return <div css={css`
        background-color: ${colours.greenSheen};
        margin-top: 0px;
        padding-top: 10px;
        padding-bottom: 10px;
    `}>
        <h1 css={css`
            color: white;
            padding: 0;
            margin: 0;
            margin-left: 20px;
        `}>Scoop</h1>
    </div>
}

export default NavBar;
