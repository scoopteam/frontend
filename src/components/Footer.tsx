/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import colours from "../colours";

function NavBar() {
    return <div css={css`
        background-color: ${colours.greenSheen};
        margin-top: 0px;
        padding-top: 10px;
        display: flex;
        padding-bottom: 10px;
    `}>
        <h2 css={css`
            color: white;
            padding: 0;
            margin: 0;
            margin-left: 20px;
        `}>&copy; Joseph Banks {(new Date()).getFullYear()}</h2>
        <p css={{flexGrow: 1}}></p>
        <h2 css={css`
            padding: 0;
            color: white;
            margin: 0;
            margin-right: 20px;
        `}><a css={{color: "white"}} href="mailto:joseph@josephbanks.me">Contact Us</a></h2>
    </div>
}

export default NavBar;
