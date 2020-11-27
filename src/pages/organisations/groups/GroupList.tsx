/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";

import { ServerResponse } from "../../../api";
import { getAllGroups } from "../../../api/group";
import { getOrganisation } from "../../../api/organisation";
import colours from "../../../colours";
import Button from "../../../components/Button";
import Tag from "../../../components/Tag";

const listRoot = css`
display: flex;
flex-direction: column;
text-align: center;
align-items: center;
`;

const listItem = css`
padding: 10px;
width: 50%;
margin-top: 20px;
margin-bottom: 20px;
background-color: ${colours.lightGrey};
border-radius: 10px;
vertical-align: middle;

* {
    vertical-align: middle;
}

text-decoration: none;
transition: filter, transform 100ms;
color: black;

&:hover {
    text-decoration: none;
    filter: brightness(95%);
    transform: scale(98%);
}
`;

const searchBar = css`
border: 1px solid #A7A7A7;
border-radius: 30px;
padding-left: 20px;
padding-top: 10px;
padding-bottom: 10px;
font-size: 1.5em;
width: 50%;
outline: none;
`;

export default function GroupList() {
    // Create state for the search input
    const [search, setSearch] = useState("");

    const history = useHistory();

    const { org_id } = useParams<{ org_id: string }>();

    // Create a query for the organisation and all the groups within
    const { isLoading, error, data } = useQuery<ServerResponse[], Error>(
        `organisation-groups-${org_id}`,
        () => Promise.all([getOrganisation(org_id), getAllGroups(org_id)])
    );

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <div>
            <h1>Error</h1>
            <p>An error occurred while fetching the current groups</p>
        </div>
    }

    const [orgData, groupData] = data!;

    // Check if the user can create groups
    const hasPerm = orgData!.data!.permissions.indexOf("owner") !== -1 || orgData!.data!.permissions.indexOf("admin") !== -1;

    // List the groups in the organisation
    return <div css={listRoot}>
        <h1>Groups in {orgData!.data!.org.name}</h1>
        <input value={search} onChange={(val) => setSearch(val.target.value)} css={searchBar} placeholder="Enter search term..."></input>
        {hasPerm ? <Button colour={colours.greenSheen} onClick={() => history.push(document.location.pathname + "/new")}>Create group</Button> : null }
        {groupData!.data!.map((group: Record<any, any>) => (
            // Only return groups that have the search query as a fragment.
            group.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ? (
                <Link css={listItem} key={group.id} to={document.location.pathname + "/" + group.id}>
                    <div>
                        <h2>{group.name} <Tag text={group.public ? "public" : "invite"} colour={group.public ? colours.greenSheen : colours.softRed}/></h2>
                    </div> 
                </Link>
            ) : null
        ))}
    </div>
}
