/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

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
`;

const searchBar = css`
border: 1px solid black;
border-radius: 30px;
padding-left: 20px;
padding-top: 10px;
padding-bottom: 10px;
font-size: 1.5em;
width: 50%;
outline: none;
`;

export default function GroupList() {
    const [search, setSearch] = useState("");

    const history = useHistory();

    const { org_id } = useParams<{ org_id: string }>();

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

    return <div css={listRoot}>
        <h1>Groups in {orgData!.data!.org.name}</h1>
        <input value={search} onChange={(val) => setSearch(val.target.value)} css={searchBar} placeholder="Enter search term..."></input>
        <Button colour={colours.greenSheen} onClick={() => history.push(document.location.pathname + "/new")}>Create group</Button>
        {groupData!.data!.map((group: Record<any, any>) => (
            group.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ? (
                <div css={listItem} key={group.id}>
                    <h2>{group.name} <Tag text={group.public ? "public" : "invite"} colour={group.public ? colours.greenSheen : colours.softRed}/></h2>
                </div> 
            ) : null
        ))}
    </div>
}
