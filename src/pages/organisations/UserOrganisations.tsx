/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { useQuery } from "react-query";

import { ServerResponse } from "../../api";
import { getUserOrganisations, UserOrg } from "../../api/organisation";
import OrgListing from "../../components/OrgListing";

import colours from "../../colours";
import { Link } from "react-router-dom";

const listingStyle = css`
background-color: ${colours.greenSheen};
margin-left: 20px;
margin-right: 20px;
margin-top: 20px;
margin-bottom: 20px;
color: white;
border-radius: 10px;
transition: filter, transform 100ms;

&:hover {
    filter: brightness(90%);
    transform: scale(99%);
}
`;

const linkStyle = css`
padding-top: 20px;
padding-bottom: 20px;
margin: 0;
`

const headerNameStyle = css`
text-align: center;
font-size: 3em;
margin: 0;
margin-top: 20px;
`

export default function UserOrganisations() {
    const { isLoading, error, data } = useQuery<ServerResponse, Error>(
        "userOrganisations",
        () => getUserOrganisations()
    );

    if (isLoading) {
        return (
            <div>
                <h1 css={headerNameStyle}>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Could not load organisations</h1>
                <p>
                    Try reload the page or contact joseph@josephbanks.me if the problem
                    persists
                </p>
            </div>
        );
    }

    if (data) {
        return (
            <div>
                <h1 css={headerNameStyle}>Select an organisation</h1>
                <div css={css`
                    justify-content: center;
                    display: flex;
                    text-align: center;
                    flex-direction: column;
                `}>
                    {data.data!.map((orgMembership: UserOrg) => (
                        <Link to={`/orgs/${orgMembership.org.id}`} css={{color: "white"}}>
                            <OrgListing orgMembership={orgMembership} key={orgMembership.org.id} />
                        </Link>
                    ))}
                    <div css={listingStyle}>
                    <Link to="/orgs/join" css={{color: "white"}}><h1 css={linkStyle}>Join organisation</h1></Link>
                    </div>
                    <div css={listingStyle}>
                        <Link to="/orgs/new" css={{color: "white"}}><h1 css={linkStyle}>Create organisation</h1></Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 css={headerNameStyle}>Received no information</h1>
        </div>
    );
}
