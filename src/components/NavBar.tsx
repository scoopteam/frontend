/** @jsxFrag React.Fragment */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import { useQuery } from "react-query";
import { getCurrentUser } from "../api/user";
import { ServerResponse } from "../api";

import colours from "../colours";
import { Link } from "react-router-dom";

const leftNavItem = css`
color: white;
padding: 0;
margin: 0;
margin-left: 20px;
font-size: 1.5em;

&:hover {
    text-decoration: none;
}
`;

const dividerStyle = css`
flex-grow: 1;
`;

const rightNavItem = css`
margin: 0;
color: white;
padding: 0;
margin-right: 50px;
`

function LoggedInItems() {
    return <React.Fragment>
        <Link css={rightNavItem} to={"/home"}><h2>My feed</h2></Link>
        <Link css={rightNavItem} to={"/orgs"}><h2>Organisations</h2></Link>
    </React.Fragment>
}

function NavBar() {
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

        * {
            vertical-align: middle;
        }
    `}>
        <Link css={leftNavItem} to={"/"}><h1 css={{padding: 0, margin: 0}}>Scoop</h1></Link>
        <span css={dividerStyle}></span>
        {renderLoggedIn ? <LoggedInItems /> : null}
    </div>
}

export default NavBar;
