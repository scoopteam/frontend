/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { UserOrg } from "../api/organisation";

import colours from "../colours";

export default function OrgListing({ orgMembership }: { orgMembership: UserOrg }) {
    return <div css={css`
        background-color: ${colours.metallicSeaweed};
        margin: 20px;
        color: white;
        border-radius: 10px;
        transition: filter 100ms;

        &:hover {
            filter: brightness(90%);
        }
    `}>
        <h1>{orgMembership.org.name}</h1>
    </div>
}
