/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { useQuery } from "react-query";
import { getCurrentUser } from "../api/user";
import { ServerResponse } from "../api";

import colours from "../colours";
import { Link } from "react-router-dom";

/* Various styles for navbar components */
const leftNavItem = css`
color: white;
padding: 0;
margin: 0;
margin-left: 20px;
font-size: 1.5em;

@media (max-width: 500px) {
    margin-left: 0px;
}

&:hover {
    text-decoration: none;
}
`;

const dividerStyle = css`
flex-grow: 1;
@media (max-width: 500px) {
    flex-grow: 0;
};
`;

const rightNavItem = css`
margin: 0;
color: white;
padding: 0;
margin-right: 50px;

text-align: center;

@media (max-width: 500px) {
    margin-right: 50px;
    margin-left: 50px;
};
`

// Items to display only to logged in users
function LoggedInItems() {
    return <div css={{display: "flex"}}>
        <Link css={rightNavItem} to={"/home"}><h2>My feed</h2></Link>
        <Link css={rightNavItem} to={"/orgs"}><h2>Organisations</h2></Link>
    </div>
}

function NavBar() {
    // Fetch the logged in user and cache it
    const { data } = useQuery<ServerResponse, Error>(
        "userData",
        () => getCurrentUser()
    );

    let renderLoggedIn = false;

    if (data) {
        renderLoggedIn = true;
    }

    return <div css={css`
        background-color: ${colours.greenSheen};
        margin-top: 0px;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        vertical-align: middle;
        align-items: center;
        flex-wrap: wrap;

        @media (max-width: 500px) {
            justify-content: center;
            text-align: center;
        };

        * {
            vertical-align: middle;
        }
    `}>
        <Link css={leftNavItem} to={"/"}><h1 css={{padding: 0, margin: 0}}>Scoop</h1></Link>
        <span css={dividerStyle}></span>
        {/* If the user is logged in, display the logged in component */}
        <div>
            {renderLoggedIn ? <LoggedInItems /> : null}
        </div>
    </div>
}

export default NavBar;
