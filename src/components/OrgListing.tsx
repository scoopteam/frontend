/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { UserOrg } from "../api/organisation";

import colours from "../colours";


/** Component that renders an organisation in the list of organisations a member is in */
export default function OrgListing({ orgMembership }: { orgMembership: UserOrg }) {
    return <div css={css`
        background-color: ${colours.metallicSeaweed};
        margin: 20px;
        color: white;
        border-radius: 10px;
        transition: filter, transform 100ms;

        &:hover {
            filter: brightness(90%);
            transform: scale(99%);
        }

        padding-top: 5px;
        padding-bottom: 5px;
        margin: 20px;
    `}>
        <h1>{orgMembership.org.name}</h1>
    </div>
}
